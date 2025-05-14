from rest_framework import viewsets, filters, status
from rest_framework.decorators import action
from rest_framework.response import Response
from django_filters.rest_framework import DjangoFilterBackend

from .models import Opportunite, Devis
from .serializers import (
    OpportuniteSerializer, OpportuniteListSerializer, OpportuniteDetailSerializer,
    DevisSerializer, DevisListSerializer, DevisDetailSerializer
)
from apps.users.permissions import IsStaffOrAdmin


class OpportuniteViewSet(viewsets.ModelViewSet):
    """
    API endpoint pour les opportunités.
    """
    queryset = Opportunite.objects.all()
    serializer_class = OpportuniteSerializer
    filter_backends = [DjangoFilterBackend, filters.SearchFilter, filters.OrderingFilter]
    filterset_fields = ['etape', 'client']
    search_fields = ['nom', 'notes']
    ordering_fields = ['nom', 'montant', 'probabilite', 'date_creation', 'date_conclusion_estimee']
    
    def get_serializer_class(self):
        if self.action == 'list':
            return OpportuniteListSerializer
        elif self.action == 'retrieve':
            return OpportuniteDetailSerializer
        return OpportuniteSerializer
    
    def get_permissions(self):
        """
        Seuls les administrateurs et le staff peuvent supprimer des opportunités.
        """
        if self.action == 'destroy':
            permission_classes = [IsStaffOrAdmin]
        else:
            permission_classes = super().get_permissions()
        return permission_classes
    
    @action(detail=True, methods=['get'])
    def devis(self, request, pk=None):
        """
        Liste tous les devis associés à une opportunité.
        """
        opportunite = self.get_object()
        devis = opportunite.devis.all()
        serializer = DevisListSerializer(devis, many=True)
        return Response(serializer.data)
    
    @action(detail=True, methods=['post'])
    def add_devis(self, request, pk=None):
        """
        Ajoute un devis à l'opportunité.
        """
        opportunite = self.get_object()
        serializer = DevisSerializer(data=request.data)
        
        if serializer.is_valid():
            serializer.save(opportunite=opportunite)
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
    @action(detail=True, methods=['patch'])
    def update_etape(self, request, pk=None):
        """
        Met à jour l'étape d'une opportunité (pour le drag & drop du pipeline).
        """
        opportunite = self.get_object()
        etape = request.data.get('etape')
        
        if etape not in dict(Opportunite.ETAPE_CHOICES).keys():
            return Response(
                {'etape': ['Valeur invalide pour l\'étape.']},
                status=status.HTTP_400_BAD_REQUEST
            )
        
        opportunite.etape = etape
        opportunite.save(update_fields=['etape', 'derniere_modification'])
        
        return Response(OpportuniteListSerializer(opportunite).data)


class DevisViewSet(viewsets.ModelViewSet):
    """
    API endpoint pour les devis.
    """
    queryset = Devis.objects.all()
    serializer_class = DevisSerializer
    filter_backends = [DjangoFilterBackend, filters.SearchFilter, filters.OrderingFilter]
    filterset_fields = ['statut', 'opportunite']
    search_fields = ['contenu']
    ordering_fields = ['montant', 'date_creation', 'version', 'date_derniere_modification']
    
    def get_serializer_class(self):
        if self.action == 'list':
            return DevisListSerializer
        elif self.action == 'retrieve':
            return DevisDetailSerializer
        return DevisSerializer
    
    def get_permissions(self):
        """
        Seuls les administrateurs et le staff peuvent supprimer des devis.
        """
        if self.action == 'destroy':
            permission_classes = [IsStaffOrAdmin]
        else:
            permission_classes = super().get_permissions()
        return permission_classes
    
    @action(detail=True, methods=['patch'])
    def update_statut(self, request, pk=None):
        """
        Met à jour le statut d'un devis.
        """
        devis = self.get_object()
        statut = request.data.get('statut')
        
        if statut not in dict(Devis.STATUT_CHOICES).keys():
            return Response(
                {'statut': ['Valeur invalide pour le statut.']},
                status=status.HTTP_400_BAD_REQUEST
            )
        
        devis.statut = statut
        devis.save(update_fields=['statut', 'date_derniere_modification'])
        
        return Response(DevisListSerializer(devis).data)
    
    @action(detail=True, methods=['post'])
    def duplicate(self, request, pk=None):
        """
        Duplique un devis pour créer une nouvelle version.
        """
        devis = self.get_object()
        
        # Création d'une nouvelle version du devis
        nouveau_devis = Devis.objects.create(
            opportunite=devis.opportunite,
            montant=devis.montant,
            contenu=devis.contenu,
            version=devis.version + 1,
            statut='brouillon'
        )
        
        return Response(
            DevisDetailSerializer(nouveau_devis).data,
            status=status.HTTP_201_CREATED
        )