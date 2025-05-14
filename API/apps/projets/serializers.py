from rest_framework import serializers
from .models import Projet
from apps.clients.serializers import ClientListSerializer


class ProjetSerializer(serializers.ModelSerializer):
    """
    Serializer pour le modèle Projet avec tous les champs.
    """
    class Meta:
        model = Projet
        fields = '__all__'
        read_only_fields = ['date_creation', 'derniere_modification']


class ProjetListSerializer(serializers.ModelSerializer):
    """
    Serializer simplifié pour les listes de projets.
    """
    client_nom = serializers.CharField(source='client.nom', read_only=True)
    
    class Meta:
        model = Projet
        fields = ['id', 'titre', 'client', 'client_nom', 'statut', 'date_debut', 'date_fin']


class ProjetDetailSerializer(serializers.ModelSerializer):
    """
    Serializer détaillé pour un projet spécifique.
    """
    client = ClientListSerializer(read_only=True)
    taches_count = serializers.SerializerMethodField()
    en_retard = serializers.SerializerMethodField()
    
    class Meta:
        model = Projet
        fields = '__all__'
        read_only_fields = ['date_creation', 'derniere_modification', 
                           'taches_count', 'en_retard']
    
    def get_taches_count(self, obj):
        return obj.taches.count()
    
    def get_en_retard(self, obj):
        return obj.est_en_retard()