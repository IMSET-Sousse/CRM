from rest_framework import viewsets, filters, status
from rest_framework.decorators import action
from rest_framework.response import Response
from django_filters.rest_framework import DjangoFilterBackend

from .models import Projet
from .serializers import ProjetSerializer, ProjetListSerializer, ProjetDetailSerializer
from apps.taches.serializers import TacheSerializer, TacheListSerializer
from apps.users.permissions import IsStaffOrAdmin


class ProjetViewSet(viewsets.ModelViewSet):
    """
    API endpoint pour les projets.
    """
    queryset = Projet.objects.all()
    serializer_class = ProjetSerializer
    filter_backends = [DjangoFilterBackend, filters.SearchFilter, filters.OrderingFilter]
    filterset_fields = ['statut', 'client']
    search_fields = ['titre', 'description']
    ordering_fields = ['titre', 'date_debut', 'date_fin', 'date_creation']
    
    def get_serializer_class(self):
        if self.action == 'list':
            return ProjetListSerializer
        elif self.action == 'retrieve':
            return ProjetDetailSerializer
        return ProjetSerializer
    
    def get_permissions(self):
        """
        Seuls les administrateurs et le staff peuvent supprimer des projets.
        """
        if self.action == 'destroy':
            permission_classes = [IsStaffOrAdmin]
        else:
            permission_classes = super().get_permissions()
        return permission_classes
    
    @action(detail=True, methods=['get'])
    def taches(self, request, pk=None):
        """
        Liste toutes les tâches associées à un projet.
        """
        projet = self.get_object()
        taches = projet.taches.all()
        serializer = TacheListSerializer(taches, many=True)
        return Response(serializer.data)
    
    @action(detail=True, methods=['post'])
    def add_tache(self, request, pk=None):
        """
        Ajoute une tâche au projet.
        """
        projet = self.get_object()
        serializer = TacheSerializer(data=request.data)
        
        if serializer.is_valid():
            serializer.save(projet_associe=projet)
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)