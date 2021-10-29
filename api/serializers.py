from rest_framework import serializers
from .models import UserModel


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserModel
        fields = ('first_name', 'last_name', 'email')
        extra_kwargs = {
            'email': {'write_only': True}
        }


class UserSignInSerializer(serializers.ModelSerializer):
    email = serializers.CharField(validators=[])

    class Meta:
        model = UserModel
        fields = ('email', 'password')


class CreateUserSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserModel
        fields = ('first_name', 'last_name', 'email', 'password')
