from rest_framework import serializers
from django.contrib.auth import get_user_model

from .models import Tache
from apps.clients.serializers import ClientListSerializer
from apps.projets.serializers import ProjetListSerializer

User = get_user_model()


class TacheSerializer(serializers.ModelSerializer):
    """
    Serializer pour le modèle Tâche avec tous les champs.
    """
    class Meta:
        model = Tache
        fields = '__all__'
        read_only_fields = ['date_creation', 'derniere_modification']


class TacheListSerializer(serializers.ModelSerializer):
    """
    Serializer simplifié pour les listes de tâches.
    """
    assigne_a_nom = serializers.SerializerMethodField()
    client_nom = serializers.CharField(source='client_associe.nom', read_only=True, allow_null=True)
    projet_titre = serializers.CharField(source='projet_associe.titre', read_only=True, allow_null=True)
    en_retard = serializers.SerializerMethodField()
    
    class Meta:
        model = Tache
        fields = ['id', 'titre', 'assigne_a', 'assigne_a_nom', 'client_associe', 'client_nom',
                 'projet_associe', 'projet_titre', 'priorite', 'statut', 'date_echeance', 'en_retard']
    
    def get_assigne_a_nom(self, obj):
        return obj.assigne_a.get_full_name() or obj.assigne_a.username
    
    def get_en_retard(self, obj):
        return obj.est_en_retard()


class TacheDetailSerializer(serializers.ModelSerializer):
    """
    Serializer détaillé pour une tâche spécifique.
    """
    assigne_a = serializers.SerializerMethodField()
    client_associe = ClientListSerializer(read_only=True, allow_null=True)
    projet_associe = ProjetListSerializer(read_only=True, allow_null=True)
    en_retard = serializers.SerializerMethodField()
    
    class Meta:
        model = Tache
        fields = '__all__'
        read_only_fields = ['date_creation', 'derniere_modification', 'en_retard']
    
    def get_assigne_a(self, obj):
        return {
            'id': obj.assigne_a.id,
            'username': obj.assigne_a.username,
            'full_name': obj.assigne_a.get_full_name() or obj.assigne_a.username,
            'email': obj.assigne_a.email,
        }
    
    def get_en_retard(self, obj):
        return obj.est_en_retard()


class TacheCalendarSerializer(serializers.ModelSerializer):
    """
    Serializer pour les tâches au format calendrier.
    """
    title = serializers.CharField(source='titre')
    start = serializers.DateTimeField(source='date_echeance')
    end = serializers.SerializerMethodField()
    allDay = serializers.SerializerMethodField()
    backgroundColor = serializers.SerializerMethodField()
    url = serializers.SerializerMethodField()
    
    class Meta:
        model = Tache
        fields = ['id', 'title', 'start', 'end', 'allDay', 'backgroundColor', 'url']
    
    def get_end(self, obj):
        # Pour simplicité, on utilise la même date que date_echeance
        return obj.date_echeance
    
    def get_allDay(self, obj):
        # On considère que les tâches sont des événements d'une journée entière
        return True
    
    def get_backgroundColor(self, obj):
        # Couleur en fonction de la priorité
        colors = {
            'basse': '#28a745',      # vert
            'moyenne': '#ffc107',    # jaune
            'haute': '#fd7e14',      # orange
            'urgente': '#dc3545',    # rouge
        }
        return colors.get(obj.priorite, '#6c757d')  # gris par défaut
    
    def get_url(self, obj):
        # URL pour accéder à la tâche (à adapter selon le frontend)
        return f"/taches/{obj.id}"