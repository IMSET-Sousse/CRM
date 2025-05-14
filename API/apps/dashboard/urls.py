from django.urls import path

from .views import (
    DashboardStatsView, ClientsRecentsView, ProjetsRecentsView,
    OpportunitesPipelineView, RevenusView, TachesAVenirView
)

urlpatterns = [
    path('dashboard/stats/', DashboardStatsView.as_view(), name='dashboard-stats'),
    path('dashboard/clients-recents/', ClientsRecentsView.as_view(), name='clients-recents'),
    path('dashboard/projets-recents/', ProjetsRecentsView.as_view(), name='projets-recents'),
    path('dashboard/opportunites-pipeline/', OpportunitesPipelineView.as_view(), name='opportunites-pipeline'),
    path('dashboard/revenus/', RevenusView.as_view(), name='revenus'),
    path('dashboard/taches-a-venir/', TachesAVenirView.as_view(), name='taches-a-venir'),
]