from django.db import models
from django.contrib.auth import get_user_model
from django.utils.translation import gettext_lazy as _

from apps.clients.models import Client
from apps.projets.models import Projet

User = get_user_model()


class Tache(models.Model):
    """
    Modèle Tâche pour stocker les informations sur les tâches.
    """
    PRIORITE_CHOICES = (
        ('basse', _('Basse')),
        ('moyenne', _('Moyenne')),
        ('haute', _('Haute')),
        ('urgente', _('Urgente')),
    )
    
    STATUT_CHOICES = (
        ('a_faire', _('À faire')),
        ('en_cours', _('En cours')),
        ('terminee', _('Terminée')),
    )
    
    titre = models.CharField(_('titre'), max_length=100)
    description = models.TextField(_('description'), blank=True)
    assigne_a = models.ForeignKey(
        User, 
        on_delete=models.CASCADE, 
        related_name='tasks_assigned',
        verbose_name=_('assigné à')
    )
    client_associe = models.ForeignKey(
        Client, 
        on_delete=models.SET_NULL, 
        related_name='taches',
        verbose_name=_('client associé'),
        null=True,
        blank=True
    )
    projet_associe = models.ForeignKey(
        Projet, 
        on_delete=models.SET_NULL, 
        related_name='taches',
        verbose_name=_('projet associé'),
        null=True,
        blank=True
    )
    priorite = models.CharField(
        _('priorité'),
        max_length=20,
        choices=PRIORITE_CHOICES,
        default='moyenne'
    )
    date_echeance = models.DateTimeField(_('date d\'échéance'))
    statut = models.CharField(
        _('statut'),
        max_length=20,
        choices=STATUT_CHOICES,
        default='a_faire'
    )
    date_creation = models.DateTimeField(_('date de création'), auto_now_add=True)
    derniere_modification = models.DateTimeField(_('dernière modification'), auto_now=True)

    class Meta:
        verbose_name = _('tâche')
        verbose_name_plural = _('tâches')
        ordering = ['date_echeance', '-priorite']
        indexes = [
            models.Index(fields=['assigne_a']),
            models.Index(fields=['client_associe']),
            models.Index(fields=['projet_associe']),
            models.Index(fields=['statut']),
            models.Index(fields=['priorite']),
            models.Index(fields=['date_echeance']),
        ]

    def __str__(self):
        return self.titre

    def est_en_retard(self):
        """Vérifie si la tâche est en retard."""
        from django.utils import timezone
        if self.statut != 'terminee':
            return self.date_echeance < timezone.now()
        return False