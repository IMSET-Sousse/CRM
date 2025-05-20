from django.contrib import admin
from django.contrib.auth.admin import UserAdmin as BaseUserAdmin
from django.utils.translation import gettext_lazy as _
from .models import User

@admin.register(User)
class UserAdmin(BaseUserAdmin):
    list_display = ('username', 'email', 'first_name', 'last_name', 'job_title', 
                   'is_admin', 'is_staff', 'is_active')
    list_filter = ('is_admin', 'is_staff', 'is_active', 'groups')
    search_fields = ('username', 'first_name', 'last_name', 'email', 'job_title')
    ordering = ('username',)
    
    fieldsets = (
        (None, {'fields': ('username', 'password')}),
        (_('Informations personnelles'), {
            'fields': ('first_name', 'last_name', 'email', 'profile_picture', 
                      'job_title', 'phone', 'bio')
        }),
        (_('Permissions'), {
            'fields': ('is_admin', 'is_staff', 'is_active', 'groups', 'user_permissions'),
        }),
        (_('Dates importantes'), {
            'fields': ('last_login', 'date_joined'),
            'classes': ('collapse',)
        }),
    )
    
    add_fieldsets = (
        (None, {
            'classes': ('wide',),
            'fields': ('username', 'email', 'password1', 'password2', 
                      'is_admin', 'is_staff', 'is_active'),
        }),
    )
