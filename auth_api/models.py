from __future__ import unicode_literals

from django.db import models
from django.utils import timezone
from django.utils.encoding import python_2_unicode_compatible
from django.contrib.auth.models import AbstractBaseUser, PermissionsMixin, UserManager


@python_2_unicode_compatible
class UserProfile(AbstractBaseUser, PermissionsMixin):
    email = models.EmailField(blank=False, db_index=True, unique=True)
    username = models.CharField(max_length=30, unique=True, db_index=True)
    full_name = models.CharField(max_length=60)

    is_staff = models.BooleanField(default=False)
    is_active = models.BooleanField(default=True, db_index=True)
    is_partner = models.BooleanField(default=False)

    date_joined = models.DateTimeField(default=timezone.now)
    updated_at = models.DateTimeField(auto_now=True)

    profile_img = models.ImageField(upload_to='static/profile_photo/')  # TODO: Pass default parameter to this, when there's no image (Gravatar would be a good idea)
    contact_handphone = models.CharField(max_length=14, blank=True)
    handphone_verified = models.BooleanField(default=False)
    bio = models.CharField(max_length=140, blank=True)
    address = models.TextField(blank=True)

    objects = UserManager()

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['username', 'full_name']

    def __str__(self):
        return self.full_name

    def get_full_name(self):
        return self.full_name

    def get_short_name(self):
        return self.full_name.split(' ')[0]
