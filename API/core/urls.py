from django.contrib import admin
from django.urls import path, include
from drf_spectacular.views import SpectacularAPIView, SpectacularSwaggerView

urlpatterns = [
    path('admin/', admin.site.urls),
    
    # API schema and documentation
    path('api/schema/', SpectacularAPIView.as_view(), name='schema'),
    path('api/docs/', SpectacularSwaggerView.as_view(url_name='schema'), name='docs'),
    
    # API endpoints for each app
    path('api/auth/', include('apps.users.urls')),
    path('api/', include('apps.clients.urls')),
    path('api/', include('apps.projets.urls')),
    path('api/', include('apps.taches.urls')),
    path('api/', include('apps.opportunites.urls')),
    path('api/', include('apps.dashboard.urls')),
    path('api/', include('apps.rapports.urls')),
]