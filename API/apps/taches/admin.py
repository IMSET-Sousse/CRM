from django.contrib import admin
from django.utils.translation import gettext_lazy as _
from .models import Tache

@admin.register(Tache)
class TacheAdmin(admin.ModelAdmin):
    list_display = ('titre', 'assigne_a', 'client_associe', 'projet_associe', 
                   'priorite', 'statut', 'date_echeance', 'est_en_retard')
    list_filter = ('statut', 'priorite', 'assigne_a', 'client_associe', 'projet_associe')
    search_fields = ('titre', 'description', 'assigne_a__username', 
                    'client_associe__nom', 'projet_associe__titre')
    readonly_fields = ('date_creation', 'derniere_modification')
    raw_id_fields = ('assigne_a', 'client_associe', 'projet_associe')
    date_hierarchy = 'date_echeance'
    
    fieldsets = (
        (_('Informations principales'), {
            'fields': ('titre', 'description', 'assigne_a')
        }),
        (_('Associations'), {
            'fields': ('client_associe', 'projet_associe')
        }),
        (_('Statut et priorité'), {
            'fields': ('priorite', 'statut', 'date_echeance')
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
