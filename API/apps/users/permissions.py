from rest_framework import permissions


class IsAdminUser(permissions.BasePermission):
    """
    Permission pour restreindre l'accès aux administrateurs.
    """
    def has_permission(self, request, view):
        return bool(request.user and request.user.is_authenticated and request.user.is_admin)


class IsStaffOrAdmin(permissions.BasePermission):
    """
    Permission pour restreindre l'accès au staff ou aux administrateurs.
    """
    def has_permission(self, request, view):
        return bool(
            request.user and
            request.user.is_authenticated and
            (request.user.is_staff or request.user.is_admin)
        )


class IsOwnerOrReadOnly(permissions.BasePermission):
    """
    Permission pour autoriser la lecture à tous,
    mais restreindre les modifications au propriétaire.
    """
    def has_object_permission(self, request, view, obj):
        # Les requêtes en lecture sont autorisées pour tout utilisateur authentifié
        if request.method in permissions.SAFE_METHODS:
            return True

        # Les requêtes d'écriture sont restreintes au propriétaire de l'objet
        # (supposant que l'objet a un attribut 'user')
        return obj.user == request.user or request.user.is_admin


class CanViewClient(permissions.BasePermission):
    """
    Permission pour vérifier si un utilisateur peut voir un client spécifique.
    """
    def has_object_permission(self, request, view, obj):
        # Les administrateurs et le staff peuvent tout voir
        if request.user.is_admin or request.user.is_staff:
            return True
            
        # L'utilisateur peut-il voir ce client particulier?
        # Cette logique peut être ajustée selon les besoins spécifiques
        return False  # Implémenter selon les règles métier spécifiques