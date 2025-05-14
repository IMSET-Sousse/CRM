from rest_framework import viewsets, filters, status
from rest_framework.decorators import action
from rest_framework.response import Response
from django_filters.rest_framework import DjangoFilterBackend
from django.utils import timezone

from .models import Tache
from .serializers import (
    TacheSerializer, TacheListSerializer, TacheDetailSerializer, TacheCalendarSerializer
)
from apps.users.permissions import IsStaffOrAdmin


class TacheViewSet(viewsets.ModelViewSet):
    """
    API endpoint pour les tâches.
    """
    queryset = Tache.objects.all()
    serializer_class = TacheSerializer
    filter_backends = [DjangoFilterBackend, filters.SearchFilter, filters.OrderingFilter]
    filterset_fields = ['statut', 'priorite', 'assigne_a', 'client_associe', 'projet_associe']
    search_fields = ['titre', 'description']
    ordering_fields = ['titre', 'date_echeance', 'priorite', 'date_creation', 'derniere_modification']
    
    def get_serializer_class(self):
        if self.action == 'list':
            return TacheListSerializer
        elif self.action == 'retrieve':
            return TacheDetailSerializer
        elif self.action == 'calendar':
            return TacheCalendarSerializer
        return TacheSerializer
    
    def get_permissions(self):
        """
        Seuls les administrateurs et le staff peuvent supprimer des tâches.
        """
        if self.action == 'destroy':
            permission_classes = [IsStaffOrAdmin]
        else:
            permission_classes = super().get_permissions()
        return permission_classes
    
    @action(detail=True, methods=['patch'])
    def update_statut(self, request, pk=None):
        """
        Met à jour le statut d'une tâche.
        """
        tache = self.get_object()
        statut = request.data.get('statut')
        
        if statut not in dict(Tache.STATUT_CHOICES).keys():
            return Response(
                {'statut': ['Valeur invalide pour le statut.']},
                status=status.HTTP_400_BAD_REQUEST
            )
        
        tache.statut = statut
        tache.save(update_fields=['statut', 'derniere_modification'])
        
        return Response(TacheListSerializer(tache).data)
    
    @action(detail=False, methods=['get'])
    def calendar(self, request):
        """
        Retourne les tâches au format calendrier.
        """
        # On peut filtrer les tâches par date
        start = request.query_params.get('start')
        end = request.query_params.get('end')
        
        queryset = self.get_queryset()
        
        if start:
            queryset = queryset.filter(date_echeance__gte=start)
        if end:
            queryset = queryset.filter(date_echeance__lte=end)
        
        # Application des filtres standard
        queryset = self.filter_queryset(queryset)
        
        serializer = self.get_serializer(queryset, many=True)
        return Response(serializer.data)
    
    @action(detail=False, methods=['get'])
    def me(self, request):
        """
        Retourne les tâches assignées à l'utilisateur actuel.
        """
        queryset = self.get_queryset().filter(assigne_a=request.user)
        queryset = self.filter_queryset(queryset)
        
        page = self.paginate_queryset(queryset)
        if page is not None:
            serializer = TacheListSerializer(page, many=True)
            return self.get_paginated_response(serializer.data)
        
        serializer = TacheListSerializer(queryset, many=True)
        return Response(serializer.data)
    
    @action(detail=False, methods=['get'])
    def upcoming(self, request):
        """
        Retourne les tâches à venir pour les 7 prochains jours.
        """
        today = timezone.now().date()
        next_week = today + timezone.timedelta(days=7)
        
        queryset = self.get_queryset().filter(
            date_echeance__date__gte=today,
            date_echeance__date__lte=next_week,
            statut__in=['a_faire', 'en_cours']
        )
        
        # Application des filtres standard
        queryset = self.filter_queryset(queryset)
        
        page = self.paginate_queryset(queryset)
        if page is not None:
            serializer = TacheListSerializer(page, many=True)
            return self.get_paginated_response(serializer.data)
        
        serializer = TacheListSerializer(queryset, many=True)
        return Response(serializer.data)