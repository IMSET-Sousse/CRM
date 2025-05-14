from django.db import models
from django.utils.translation import gettext_lazy as _

from apps.clients.models import Client


class Opportunite(models.Model):
    """
    Modèle Opportunité pour stocker les informations sur les opportunités commerciales.
    """
    ETAPE_CHOICES = (
        ('prospect', _('Prospect')),
        ('qualification', _('Qualification')),
        ('proposition', _('Proposition')),
        ('negociation', _('Négociation')),
        ('conclusion', _('Conclusion')),
    )
    
    client = models.ForeignKey(
        Client, 
        on_delete=models.CASCADE, 
        related_name='opportunites',
        verbose_name=_('client')
    )
    nom = models.CharField(_('nom'), max_length=100)
    montant = models.DecimalField(_('montant'), max_digits=10, decimal_places=2)
    probabilite = models.IntegerField(
        _('probabilité (%)'),
        help_text=_('Probabilité de conclusion (0-100%)'),
        default=50
    )
    etape = models.CharField(
        _('étape'),
        max_length=20,
        choices=ETAPE_CHOICES,
        default='prospect'
    )
    date_creation = models.DateTimeField(_('date de création'), auto_now_add=True)
    date_conclusion_estimee = models.DateField(_('date de conclusion estimée'), null=True, blank=True)
    notes = models.TextField(_('notes'), blank=True)
    derniere_modification = models.DateTimeField(_('dernière modification'), auto_now=True)

    class Meta:
        verbose_name = _('opportunité')
        verbose_name_plural = _('opportunités')
        ordering = ['-date_creation']
        indexes = [
            models.Index(fields=['client']),
            models.Index(fields=['etape']),
            models.Index(fields=['montant']),
        ]

    def __str__(self):
        return f"{self.nom} - {self.client.nom} ({self.get_etape_display()})"

    def get_devis(self):
        """Retourne tous les devis associés à l'opportunité."""
        return self.devis.all()


class Devis(models.Model):
    """
    Modèle Devis pour stocker les informations sur les devis.
    """
    STATUT_CHOICES = (
        ('brouillon', _('Brouillon')),
        ('envoye', _('Envoyé')),
        ('consulte', _('Consulté')),
        ('accepte', _('Accepté')),
        ('refuse', _('Refusé')),
    )
    
    opportunite = models.ForeignKey(
        Opportunite, 
        on_delete=models.CASCADE, 
        related_name='devis',
        verbose_name=_('opportunité')
    )
    montant = models.DecimalField(_('montant'), max_digits=10, decimal_places=2)
    date_creation = models.DateTimeField(_('date de création'), auto_now_add=True)
    statut = models.CharField(
        _('statut'),
        max_length=20,
        choices=STATUT_CHOICES,
        default='brouillon'
    )
    version = models.IntegerField(_('version'), default=1)
    contenu = models.JSONField(_('contenu'), default=dict)
    date_derniere_modification = models.DateTimeField(_('dernière modification'), auto_now=True)

    class Meta:
        verbose_name = _('devis')
        verbose_name_plural = _('devis')
        ordering = ['-date_creation']
        indexes = [
            models.Index(fields=['opportunite']),
            models.Index(fields=['statut']),
            models.Index(fields=['version']),
        ]

    def __str__(self):
        return f"Devis #{self.id} - {self.opportunite.nom} (v{self.version})"