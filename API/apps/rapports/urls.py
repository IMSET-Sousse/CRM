from django.urls import path

from .views import (
    RapportClientsView, RapportProjetsView, RapportOpportunitesView,
    RapportRevenusView, ExportDataView
)

urlpatterns = [
    path('rapports/clients/', RapportClientsView.as_view(), name='rapport-clients'),
    path('rapports/projets/', RapportProjetsView.as_view(), name='rapport-projets'),
    path('rapports/opportunites/', RapportOpportunitesView.as_view(), name='rapport-opportunites'),
    path('rapports/revenus/', RapportRevenusView.as_view(), name='rapport-revenus'),
    path('rapports/export/', ExportDataView.as_view(), name='export-data'),
]