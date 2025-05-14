from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from django.db.models import Count, Sum, Q
from django.utils import timezone

from apps.clients.models import Client
from apps.projets.models import Projet
from apps.opportunites.models import Opportunite, Devis
from apps.taches.models import Tache
from apps.clients.serializers import ClientListSerializer
from apps.projets.serializers import ProjetListSerializer
from apps.opportunites.serializers import OpportuniteListSerializer
from apps.taches.serializers import TacheListSerializer


class DashboardStatsView(APIView):
    """
    Vue pour les statistiques générales du tableau de bord.
    """
    permission_classes = [IsAuthenticated]
    
    def get(self, request, format=None):
        # Récupération des statistiques
        today = timezone.now().date()
        
        # Compteurs
        clients_count = Client.objects.count()
        projets_count = Projet.objects.count()
        projets_en_cours = Projet.objects.filter(statut='en_cours').count()
        opportunites_count = Opportunite.objects.count()
        opportunites_actives = Opportunite.objects.exclude(etape='conclusion').count()
        taches_count = Tache.objects.count()
        taches_a_faire = Tache.objects.filter(statut='a_faire').count()
        
        # Montants
        revenus_projets = Projet.objects.filter(statut='termine').aggregate(total=Sum('budget'))['total'] or 0
        pipeline_opportunites = Opportunite.objects.exclude(etape='conclusion').aggregate(total=Sum('montant'))['total'] or 0
        
        # Projets par statut
        projets_par_statut = list(Projet.objects.values('statut').annotate(count=Count('statut')))
        
        # Opportunités par étape
        opportunites_par_etape = list(Opportunite.objects.values('etape').annotate(count=Count('etape')))
        
        # Tâches par priorité
        taches_par_priorite = list(Tache.objects.values('priorite').annotate(count=Count('priorite')))
        
        return Response({
            'compteurs': {
                'clients': clients_count,
                'projets': {
                    'total': projets_count,
                    'en_cours': projets_en_cours,
                },
                'opportunites': {
                    'total': opportunites_count,
                    'actives': opportunites_actives,
                },
                'taches': {
                    'total': taches_count,
                    'a_faire': taches_a_faire,
                }
            },
            'montants': {
                'revenus_projets': revenus_projets,
                'pipeline_opportunites': pipeline_opportunites,
            },
            'repartition': {
                'projets_par_statut': projets_par_statut,
                'opportunites_par_etape': opportunites_par_etape,
                'taches_par_priorite': taches_par_priorite,
            }
        })


class ClientsRecentsView(APIView):
    """
    Vue pour les clients récemment ajoutés.
    """
    permission_classes = [IsAuthenticated]
    
    def get(self, request, format=None):
        clients = Client.objects.all().order_by('-date_creation')[:5]
        serializer = ClientListSerializer(clients, many=True)
        return Response(serializer.data)


class ProjetsRecentsView(APIView):
    """
    Vue pour les projets récents ou en cours.
    """
    permission_classes = [IsAuthenticated]
    
    def get(self, request, format=None):
        projets = Projet.objects.filter(
            Q(statut='en_cours') | Q(date_creation__gte=timezone.now() - timezone.timedelta(days=30))
        ).order_by('-date_creation')[:5]
        serializer = ProjetListSerializer(projets, many=True)
        return Response(serializer.data)


class OpportunitesPipelineView(APIView):
    """
    Vue pour la distribution des opportunités par étape.
    """
    permission_classes = [IsAuthenticated]
    
    def get(self, request, format=None):
        # Opportunités par étape avec montant total et nombre
        resultat = []
        
        for etape, label in Opportunite.ETAPE_CHOICES:
            opportunites = Opportunite.objects.filter(etape=etape)
            montant_total = opportunites.aggregate(total=Sum('montant'))['total'] or 0
            count = opportunites.count()
            
            # 5 opportunités récentes de cette étape
            recentes = opportunites.order_by('-date_creation')[:5]
            serializer = OpportuniteListSerializer(recentes, many=True)
            
            resultat.append({
                'etape': etape,
                'label': label,
                'montant_total': montant_total,
                'count': count,
                'opportunites_recentes': serializer.data
            })
        
        return Response(resultat)


class RevenusView(APIView):
    """
    Vue pour les données de revenus (réalisés, prévus).
    """
    permission_classes = [IsAuthenticated]
    
    def get(self, request, format=None):
        # Revenus des projets terminés (par mois)
        from django.db.models.functions import TruncMonth
        
        # Projets terminés par mois
        projets_termines = list(Projet.objects
            .filter(statut='termine')
            .annotate(mois=TruncMonth('date_fin'))
            .values('mois')
            .annotate(total=Sum('budget'))
            .order_by('mois')
        )
        
        # Revenus prévus (devis acceptés)
        devis_acceptes = list(Devis.objects
            .filter(statut='accepte')
            .annotate(mois=TruncMonth('date_derniere_modification'))
            .values('mois')
            .annotate(total=Sum('montant'))
            .order_by('mois')
        )
        
        # Pipeline d'opportunités
        pipeline = list(Opportunite.objects
            .exclude(etape='conclusion')
            .values('etape')
            .annotate(total=Sum('montant'))
            .order_by('etape')
        )
        
        return Response({
            'projets_termines': projets_termines,
            'devis_acceptes': devis_acceptes,
            'pipeline': pipeline
        })


class TachesAVenirView(APIView):
    """
    Vue pour les tâches à venir (7 prochains jours).
    """
    permission_classes = [IsAuthenticated]
    
    def get(self, request, format=None):
        today = timezone.now().date()
        next_week = today + timezone.timedelta(days=7)
        
        taches = Tache.objects.filter(
            date_echeance__date__gte=today,
            date_echeance__date__lte=next_week,
            statut__in=['a_faire', 'en_cours']
        ).order_by('date_echeance')
        
        serializer = TacheListSerializer(taches, many=True)
        return Response(serializer.data)