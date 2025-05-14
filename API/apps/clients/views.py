from rest_framework import viewsets, filters, status
from rest_framework.decorators import action
from rest_framework.response import Response
from django_filters.rest_framework import DjangoFilterBackend

from .models import Client
from .serializers import ClientSerializer, ClientListSerializer, ClientDetailSerializer
from apps.projets.serializers import ProjetListSerializer
from apps.opportunites.serializers import OpportuniteListSerializer
from apps.taches.serializers import TacheListSerializer
from apps.users.permissions import IsStaffOrAdmin


class ClientViewSet(viewsets.ModelViewSet):
    """
    API endpoint pour les clients.
    """
    queryset = Client.objects.all()
    serializer_class = ClientSerializer
    filter_backends = [DjangoFilterBackend, filters.SearchFilter, filters.OrderingFilter]
    filterset_fields = ['categorie']
    search_fields = ['nom', 'societe', 'email']
    ordering_fields = ['nom', 'date_creation', 'derniere_modification']
    
    def get_serializer_class(self):
        if self.action == 'list':
            return ClientListSerializer
        elif self.action == 'retrieve':
            return ClientDetailSerializer
        return ClientSerializer
    
    def get_permissions(self):
        """
        Seuls les administrateurs et le staff peuvent supprimer des clients.
        """
        if self.action == 'destroy':
            permission_classes = [IsStaffOrAdmin]
        else:
            permission_classes = super().get_permissions()
        return permission_classes
    
    @action(detail=True, methods=['get'])
    def projets(self, request, pk=None):
        """
        Liste tous les projets associés à un client.
        """
        client = self.get_object()
        projets = client.projets.all()
        serializer = ProjetListSerializer(projets, many=True)
        return Response(serializer.data)
    
    @action(detail=True, methods=['get'])
    def opportunites(self, request, pk=None):
        """
        Liste toutes les opportunités associées à un client.
        """
        client = self.get_object()
        opportunites = client.opportunites.all()
        serializer = OpportuniteListSerializer(opportunites, many=True)
        return Response(serializer.data)
    
    @action(detail=True, methods=['get'])
    def taches(self, request, pk=None):
        """
        Liste toutes les tâches associées à un client.
        """
        client = self.get_object()
        taches = client.taches.all()
        serializer = TacheListSerializer(taches, many=True)
        return Response(serializer.data)