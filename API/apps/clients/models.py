from django.db import models
from django.utils.translation import gettext_lazy as _


class Client(models.Model):
    """
    Modèle Client pour stocker les informations sur les clients.
    """
    CATEGORIE_CHOICES = (
        ('prospect', _('Prospect')),
        ('client', _('Client')),
        ('vip', _('VIP')),
        ('inactif', _('Inactif')),
    )
    
    nom = models.CharField(_('nom'), max_length=100)
    societe = models.CharField(_('société'), max_length=100, blank=True)
    email = models.EmailField(_('email'), unique=True)
    telephone = models.CharField(_('téléphone'), max_length=20, blank=True)
    notes = models.TextField(_('notes'), blank=True)
    categorie = models.CharField(
        _('catégorie'),
        max_length=20,
        choices=CATEGORIE_CHOICES,
        default='prospect'
    )
    date_creation = models.DateTimeField(_('date de création'), auto_now_add=True)
    derniere_modification = models.DateTimeField(_('dernière modification'), auto_now=True)

    class Meta:
        verbose_name = _('client')
        verbose_name_plural = _('clients')
        ordering = ['-date_creation']
        indexes = [
            models.Index(fields=['nom']),
            models.Index(fields=['email']),
            models.Index(fields=['categorie']),
        ]

    def __str__(self):
        if self.societe:
            return f"{self.nom} ({self.societe})"
        return self.nom

    def get_projets(self):
        """Retourne tous les projets associés au client."""
        return self.projets.all()

    def get_opportunites(self):
        """Retourne toutes les opportunités associées au client."""
        return self.opportunites.all()

    def get_taches(self):
        """Retourne toutes les tâches associées au client."""
        return self.taches.all()