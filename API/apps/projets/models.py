from django.db import models
from django.utils.translation import gettext_lazy as _

from apps.clients.models import Client


class Projet(models.Model):
    """
    Modèle Projet pour stocker les informations sur les projets.
    """
    STATUT_CHOICES = (
        ('a_faire', _('À faire')),
        ('en_cours', _('En cours')),
        ('termine', _('Terminé')),
    )
    
    client = models.ForeignKey(
        Client, 
        on_delete=models.CASCADE, 
        related_name='projets',
        verbose_name=_('client')
    )
    titre = models.CharField(_('titre'), max_length=100)
    description = models.TextField(_('description'), blank=True)
    statut = models.CharField(
        _('statut'),
        max_length=20,
        choices=STATUT_CHOICES,
        default='a_faire'
    )
    date_debut = models.DateField(_('date de début'))
    date_fin = models.DateField(_('date de fin'), null=True, blank=True)
    budget = models.DecimalField(
        _('budget'),
        max_digits=10,
        decimal_places=2,
        null=True,
        blank=True
    )
    # devis_associe sera ajouté ultérieurement comme ForeignKey vers Devis
    date_creation = models.DateTimeField(_('date de création'), auto_now_add=True)
    derniere_modification = models.DateTimeField(_('dernière modification'), auto_now=True)

    class Meta:
        verbose_name = _('projet')
        verbose_name_plural = _('projets')
        ordering = ['-date_creation']
        indexes = [
            models.Index(fields=['client']),
            models.Index(fields=['statut']),
            models.Index(fields=['date_debut']),
        ]

    def __str__(self):
        return f"{self.titre} - {self.client.nom}"

    def get_taches(self):
        """Retourne toutes les tâches associées au projet."""
        return self.taches.all()

    def est_en_retard(self):
        """Vérifie si le projet est en retard."""
        from django.utils import timezone
        if self.statut != 'termine' and self.date_fin:
            return self.date_fin < timezone.now().date()
        return False