from django.urls import path, include
from rest_framework.routers import DefaultRouter

from .views import OpportuniteViewSet, DevisViewSet

router = DefaultRouter()
router.register(r'opportunites', OpportuniteViewSet)
router.register(r'devis', DevisViewSet)

urlpatterns = [
    path('', include(router.urls)),
]