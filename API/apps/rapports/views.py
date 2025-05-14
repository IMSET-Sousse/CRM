import csv
import json
from datetime import datetime

from django.http import HttpResponse
from django.db.models import Count, Sum, Q, F, Value, CharField
from django.db.models.functions import Concat
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated

from apps.clients.models import Client
from apps.projets.models import Projet
from apps.opportunites.models import Opportunite, Devis
from apps.taches.models import Tache
from apps.users.permissions import IsStaffOrAdmin


class RapportClientsView(APIView):
    """
    Vue pour le rapport détaillé sur les clients.
    """
    permission_classes = [IsAuthenticated]
    
    def get(self, request, format=None):
        # Filtres
        categorie = request.query_params.get('categorie')
        date_debut = request.query_params.get('date_debut')
        date_fin = request.query_params.get('date_fin')
        
        # Préparation de la requête
        clients = Client.objects.all()
        
        # Application des filtres
        if categorie:
            clients = clients.filter(categorie=categorie)
        if date_debut:
            clients = clients.filter(date_creation__gte=date_debut)
        if date_fin:
            clients = clients.filter(date_creation__lte=date_fin)
        
        # Statistiques
        clients = clients.annotate(
            projets_count=Count('projets', distinct=True),
            opportunites_count=Count('opportunites', distinct=True),
            taches_count=Count('taches', distinct=True),
            # Calcul des montants des opportunités
            opportunites_montant=Sum('opportunites__montant'),
            # Calcul des montants des projets
            projets_montant=Sum('projets__budget')
        )
        
        # Résumé
        total_clients = clients.count()
        clients_par_categorie = list(clients.values('categorie').annotate(count=Count('id')))
        montant_total_projets = clients.aggregate(total=Sum('projets_montant'))['total'] or 0
        montant_total_opportunites = clients.aggregate(total=Sum('opportunites_montant'))['total'] or 0
        
        # Détails des clients
        clients_detail = []
        for client in clients:
            clients_detail.append({
                'id': client.id,
                'nom': client.nom,
                'societe': client.societe,
                'email': client.email,
                'telephone': client.telephone,
                'categorie': client.categorie,
                'date_creation': client.date_creation,
                'projets_count': client.projets_count,
                'opportunites_count': client.opportunites_count,
                'taches_count': client.taches_count,
                'opportunites_montant': client.opportunites_montant or 0,
                'projets_montant': client.projets_montant or 0,
            })
        
        return Response({
            'resume': {
                'total_clients': total_clients,
                'clients_par_categorie': clients_par_categorie,
                'montant_total_projets': montant_total_projets,
                'montant_total_opportunites': montant_total_opportunites,
            },
            'clients': clients_detail,
        })


class RapportProjetsView(APIView):
    """
    Vue pour le rapport détaillé sur les projets.
    """
    permission_classes = [IsAuthenticated]
    
    def get(self, request, format=None):
        # Filtres
        statut = request.query_params.get('statut')
        client_id = request.query_params.get('client_id')
        date_debut = request.query_params.get('date_debut')
        date_fin = request.query_params.get('date_fin')
        
        # Préparation de la requête
        projets = Projet.objects.all()
        
        # Application des filtres
        if statut:
            projets = projets.filter(statut=statut)
        if client_id:
            projets = projets.filter(client_id=client_id)
        if date_debut:
            projets = projets.filter(date_debut__gte=date_debut)
        if date_fin:
            projets = projets.filter(date_fin__lte=date_fin)
        
        # Annotation pour les statistiques
        projets = projets.annotate(
            taches_count=Count('taches', distinct=True),
            client_nom=F('client__nom'),
        )
        
        # Résumé
        total_projets = projets.count()
        projets_par_statut = list(projets.values('statut').annotate(count=Count('id')))
        budget_total = projets.aggregate(total=Sum('budget'))['total'] or 0
        
        # Détails des projets
        projets_detail = []
        for projet in projets:
            projets_detail.append({
                'id': projet.id,
                'titre': projet.titre,
                'client_id': projet.client_id,
                'client_nom': projet.client_nom,
                'statut': projet.statut,
                'date_debut': projet.date_debut,
                'date_fin': projet.date_fin,
                'budget': projet.budget,
                'taches_count': projet.taches_count,
                'date_creation': projet.date_creation,
            })
        
        return Response({
            'resume': {
                'total_projets': total_projets,
                'projets_par_statut': projets_par_statut,
                'budget_total': budget_total,
            },
            'projets': projets_detail,
        })


class RapportOpportunitesView(APIView):
    """
    Vue pour le rapport sur les opportunités et le pipeline de vente.
    """
    permission_classes = [IsAuthenticated]
    
    def get(self, request, format=None):
        # Filtres
        etape = request.query_params.get('etape')
        client_id = request.query_params.get('client_id')
        date_debut = request.query_params.get('date_debut')
        date_fin = request.query_params.get('date_fin')
        
        # Préparation de la requête
        opportunites = Opportunite.objects.all()
        
        # Application des filtres
        if etape:
            opportunites = opportunites.filter(etape=etape)
        if client_id:
            opportunites = opportunites.filter(client_id=client_id)
        if date_debut:
            opportunites = opportunites.filter(date_creation__gte=date_debut)
        if date_fin:
            opportunites = opportunites.filter(date_creation__lte=date_fin)
        
        # Annotation pour les statistiques
        opportunites = opportunites.annotate(
            devis_count=Count('devis', distinct=True),
            client_nom=F('client__nom'),
            montant_pondere=F('montant') * F('probabilite') / 100
        )
        
        # Résumé
        total_opportunites = opportunites.count()
        opportunites_par_etape = list(opportunites.values('etape').annotate(count=Count('id')))
        montant_total = opportunites.aggregate(total=Sum('montant'))['total'] or 0
        montant_pondere_total = opportunites.aggregate(total=Sum('montant_pondere'))['total'] or 0
        
        # Devis
        devis = Devis.objects.filter(opportunite__in=opportunites)
        devis_par_statut = list(devis.values('statut').annotate(count=Count('id')))
        montant_devis_acceptes = devis.filter(statut='accepte').aggregate(total=Sum('montant'))['total'] or 0
        
        # Détails des opportunités
        opportunites_detail = []
        for opportunite in opportunites:
            opportunites_detail.append({
                'id': opportunite.id,
                'nom': opportunite.nom,
                'client_id': opportunite.client_id,
                'client_nom': opportunite.client_nom,
                'montant': opportunite.montant,
                'probabilite': opportunite.probabilite,
                'montant_pondere': opportunite.montant_pondere,
                'etape': opportunite.etape,
                'date_conclusion_estimee': opportunite.date_conclusion_estimee,
                'devis_count': opportunite.devis_count,
                'date_creation': opportunite.date_creation,
            })
        
        return Response({
            'resume': {
                'total_opportunites': total_opportunites,
                'opportunites_par_etape': opportunites_par_etape,
                'montant_total': montant_total,
                'montant_pondere_total': montant_pondere_total,
                'devis_par_statut': devis_par_statut,
                'montant_devis_acceptes': montant_devis_acceptes,
            },
            'opportunites': opportunites_detail,
        })


class RapportRevenusView(APIView):
    """
    Vue pour le rapport d'analyse des revenus.
    """
    permission_classes = [IsAuthenticated]
    
    def get(self, request, format=None):
        # Filtres de période
        annee = request.query_params.get('annee')
        if annee:
            annee = int(annee)
        else:
            annee = datetime.now().year
            
        from django.db.models.functions import TruncMonth, ExtractYear, ExtractMonth
        
        # Revenus des projets terminés par mois
        projets_par_mois = list(Projet.objects
            .filter(statut='termine', date_fin__year=annee)
            .annotate(
                annee=ExtractYear('date_fin'),
                mois=ExtractMonth('date_fin'),
                mois_nom=TruncMonth('date_fin')
            )
            .values('annee', 'mois', 'mois_nom')
            .annotate(total=Sum('budget'))
            .order_by('mois')
        )
        
        # Revenus des devis acceptés par mois
        devis_par_mois = list(Devis.objects
            .filter(statut='accepte', date_derniere_modification__year=annee)
            .annotate(
                annee=ExtractYear('date_derniere_modification'),
                mois=ExtractMonth('date_derniere_modification'),
                mois_nom=TruncMonth('date_derniere_modification')
            )
            .values('annee', 'mois', 'mois_nom')
            .annotate(total=Sum('montant'))
            .order_by('mois')
        )
        
        # Tendances: différence avec l'année précédente
        projets_annee_precedente = Projet.objects.filter(
            statut='termine', 
            date_fin__year=annee-1
        ).aggregate(total=Sum('budget'))['total'] or 0
        
        projets_annee_courante = Projet.objects.filter(
            statut='termine', 
            date_fin__year=annee
        ).aggregate(total=Sum('budget'))['total'] or 0
        
        evolution_projets = {
            'annee_precedente': projets_annee_precedente,
            'annee_courante': projets_annee_courante,
            'difference': projets_annee_courante - projets_annee_precedente,
            'pourcentage': (
                ((projets_annee_courante - projets_annee_precedente) / projets_annee_precedente * 100)
                if projets_annee_precedente > 0 else 0
            )
        }
        
        return Response({
            'projets_par_mois': projets_par_mois,
            'devis_par_mois': devis_par_mois,
            'evolution_projets': evolution_projets,
            'annee': annee,
        })


class ExportDataView(APIView):
    """
    Vue pour l'export de données filtrées en CSV, PDF ou Excel.
    """
    permission_classes = [IsStaffOrAdmin]
    
    def post(self, request, format=None):
        # Récupération des paramètres
        type_donnees = request.data.get('type_donnees')  # clients, projets, opportunites, taches
        format_export = request.data.get('format', 'csv')  # csv, pdf, excel
        filtres = request.data.get('filtres', {})
        
        # Validation
        if type_donnees not in ['clients', 'projets', 'opportunites', 'taches']:
            return Response({'error': 'Type de données invalide'}, status=400)
        
        if format_export not in ['csv']:  # Uniquement CSV pour l'instant
            return Response({'error': 'Format d\'export non pris en charge'}, status=400)
        
        # Préparation des données
        if type_donnees == 'clients':
            queryset = Client.objects.all()
            champs = ['id', 'nom', 'societe', 'email', 'telephone', 'categorie', 'date_creation']
        elif type_donnees == 'projets':
            queryset = Projet.objects.all()
            champs = ['id', 'titre', 'client__nom', 'statut', 'date_debut', 'date_fin', 'budget']
        elif type_donnees == 'opportunites':
            queryset = Opportunite.objects.all()
            champs = ['id', 'nom', 'client__nom', 'montant', 'probabilite', 'etape']
        elif type_donnees == 'taches':
            queryset = Tache.objects.all()
            champs = ['id', 'titre', 'assigne_a__username', 'priorite', 'statut', 'date_echeance']
        
        # Application des filtres
        for key, value in filtres.items():
            if value:
                queryset = queryset.filter(**{key: value})
        
        # Export au format CSV
        if format_export == 'csv':
            response = HttpResponse(content_type='text/csv')
            response['Content-Disposition'] = f'attachment; filename="{type_donnees}_{datetime.now().strftime("%Y%m%d")}.csv"'
            
            writer = csv.writer(response)
            writer.writerow(champs)  # En-têtes
            
            for obj in queryset:
                row = []
                for champ in champs:
                    if '__' in champ:
                        # Accès aux champs des relations
                        parent, enfant = champ.split('__')
                        valeur = getattr(getattr(obj, parent, None), enfant, '') if getattr(obj, parent, None) else ''
                    else:
                        valeur = getattr(obj, champ, '')
                    row.append(valeur)
                writer.writerow(row)
            
            return response