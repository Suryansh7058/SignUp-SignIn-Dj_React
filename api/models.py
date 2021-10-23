from django.db import models


# Create your models here.

class UserModel(models.Model):
    first_name = models.CharField(null=False, max_length=100)
    last_name = models.CharField(max_length=100)
    user_session = models.CharField(max_length=100, unique=True)
    email = models.EmailField(null=False, unique=True)
    password = models.CharField(null=False, max_length=256)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now_add=True)
    is_active = models.BooleanField(default=True)
