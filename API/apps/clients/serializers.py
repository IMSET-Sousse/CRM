from rest_framework import serializers
from .models import Client


class ClientSerializer(serializers.ModelSerializer):
    """
    Serializer pour le modèle Client avec tous les champs.
    """
    class Meta:
        model = Client
        fields = '__all__'
        read_only_fields = ['date_creation', 'derniere_modification']


class ClientListSerializer(serializers.ModelSerializer):
    """
    Serializer simplifié pour les listes de clients.
    """
    class Meta:
        model = Client
        fields = ['id', 'nom', 'societe', 'email', 'categorie', 'date_creation']


class ClientDetailSerializer(serializers.ModelSerializer):
    """
    Serializer détaillé pour un client spécifique.
    """
    projets_count = serializers.SerializerMethodField()
    opportunites_count = serializers.SerializerMethodField()
    taches_count = serializers.SerializerMethodField()
    
    class Meta:
        model = Client
        fields = '__all__'
        read_only_fields = ['date_creation', 'derniere_modification', 
                            'projets_count', 'opportunites_count', 'taches_count']
    
    def get_projets_count(self, obj):
        return obj.projets.count()
    
    def get_opportunites_count(self, obj):
        return obj.opportunites.count()
    
    def get_taches_count(self, obj):
        return obj.taches.count()