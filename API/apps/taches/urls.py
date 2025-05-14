from django.urls import path, include
from rest_framework.routers import DefaultRouter

from .views import TacheViewSet

router = DefaultRouter()
router.register(r'taches', TacheViewSet)

urlpatterns = [
    path('', include(router.urls)),
    path('taches/calendar/', TacheViewSet.as_view({'get': 'calendar'}), name='tache-calendar'),
    path('taches/me/', TacheViewSet.as_view({'get': 'me'}), name='tache-me'),
    path('taches/upcoming/', TacheViewSet.as_view({'get': 'upcoming'}), name='tache-upcoming'),
]