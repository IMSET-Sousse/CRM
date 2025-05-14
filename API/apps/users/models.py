from django.db import models
from django.contrib.auth.models import AbstractUser
from django.utils.translation import gettext_lazy as _


class User(AbstractUser):
    """
    Extension du modèle User de Django avec des champs personnalisés.
    """
    is_admin = models.BooleanField(
        _("administrateur"),
        default=False,
        help_text=_("Indique si l'utilisateur a des autorisations complètes"),
    )
    is_staff = models.BooleanField(
        _("membre de l'équipe"),
        default=False,
        help_text=_("Indique si l'utilisateur a des autorisations limitées"),
    )
    profile_picture = models.ImageField(
        _("photo de profil"),
        upload_to="profile_pictures/",
        blank=True,
        null=True
    )
    job_title = models.CharField(
        _("titre du poste"),
        max_length=100,
        blank=True
    )
    phone = models.CharField(
        _("téléphone"),
        max_length=20,
        blank=True
    )
    bio = models.TextField(
        _("biographie"),
        blank=True
    )
    
    class Meta:
        verbose_name = _("utilisateur")
        verbose_name_plural = _("utilisateurs")
        ordering = ['username']

    def __str__(self):
        return self.get_full_name() or self.username

    def get_assigned_tasks(self):
        """Retourne toutes les tâches assignées à l'utilisateur."""
        return self.tasks_assigned.all()