from rest_framework import serializers
from .models import Opportunite, Devis
from apps.clients.serializers import ClientListSerializer


class DevisSerializer(serializers.ModelSerializer):
    """
    Serializer pour le modèle Devis avec tous les champs.
    """
    class Meta:
        model = Devis
        fields = '__all__'
        read_only_fields = ['date_creation', 'date_derniere_modification']


class DevisListSerializer(serializers.ModelSerializer):
    """
    Serializer simplifié pour les listes de devis.
    """
    opportunite_nom = serializers.CharField(source='opportunite.nom', read_only=True)
    client_nom = serializers.CharField(source='opportunite.client.nom', read_only=True)
    
    class Meta:
        model = Devis
        fields = ['id', 'opportunite', 'opportunite_nom', 'client_nom', 'montant', 'statut', 'version', 'date_creation']


class OpportuniteSerializer(serializers.ModelSerializer):
    """
    Serializer pour le modèle Opportunité avec tous les champs.
    """
    class Meta:
        model = Opportunite
        fields = '__all__'
        read_only_fields = ['date_creation', 'derniere_modification']


class OpportuniteListSerializer(serializers.ModelSerializer):
    """
    Serializer simplifié pour les listes d'opportunités.
    """
    client_nom = serializers.CharField(source='client.nom', read_only=True)
    
    class Meta:
        model = Opportunite
        fields = ['id', 'nom', 'client', 'client_nom', 'montant', 'probabilite', 'etape', 'date_conclusion_estimee']


class OpportuniteDetailSerializer(serializers.ModelSerializer):
    """
    Serializer détaillé pour une opportunité spécifique.
    """
    client = ClientListSerializer(read_only=True)
    devis = DevisListSerializer(many=True, read_only=True)
    
    class Meta:
        model = Opportunite
        fields = '__all__'
        read_only_fields = ['date_creation', 'derniere_modification', 'devis']


class DevisDetailSerializer(serializers.ModelSerializer):
    """
    Serializer détaillé pour un devis spécifique.
    """
    opportunite = OpportuniteListSerializer(read_only=True)
    
    class Meta:
        model = Devis
        fields = '__all__'
        read_only_fields = ['date_creation', 'date_derniere_modification']