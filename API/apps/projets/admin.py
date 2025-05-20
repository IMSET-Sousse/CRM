from django.contrib import admin
from django.utils.translation import gettext_lazy as _
from .models import Projet

@admin.register(Projet)
class ProjetAdmin(admin.ModelAdmin):
    list_display = ('titre', 'client', 'statut', 'date_debut', 'date_fin', 'budget', 'est_en_retard')
    list_filter = ('statut', 'date_debut', 'client')
    search_fields = ('titre', 'description', 'client__nom', 'client__societe')
    readonly_fields = ('date_creation', 'derniere_modification')
    raw_id_fields = ('client',)
    date_hierarchy = 'date_debut'
    
    fieldsets = (
        (_('Informations principales'), {
            'fields': ('client', 'titre', 'description', 'statut')
        }),
        (_('Dates et budget'), {
            'fields': ('date_debut', 'date_fin', 'budget')
        }),
        (_('Informations système'), {
            'fields': ('date_creation', 'derniere_modification'),
            'classes': ('collapse',)
        }),
    )

    def est_en_retard(self, obj):
        return obj.est_en_retard()
    est_en_retard.boolean = True
    est_en_retard.short_description = _('En retard')
