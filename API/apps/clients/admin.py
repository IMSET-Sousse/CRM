from django.contrib import admin
from django.utils.translation import gettext_lazy as _
from .models import Client

@admin.register(Client)
class ClientAdmin(admin.ModelAdmin):
    list_display = ('nom', 'societe', 'email', 'telephone', 'categorie', 'date_creation')
    list_filter = ('categorie', 'date_creation')
    search_fields = ('nom', 'societe', 'email', 'telephone')
    readonly_fields = ('date_creation', 'derniere_modification')
    fieldsets = (
        (_('Informations principales'), {
            'fields': ('nom', 'societe', 'email', 'telephone', 'categorie')
        }),
        (_('Notes'), {
            'fields': ('notes',),
            'classes': ('collapse',)
        }),
        (_('Informations système'), {
            'fields': ('date_creation', 'derniere_modification'),
            'classes': ('collapse',)
        }),
    )
