from rest_framework import serializers
from .models import UserModel
from rest_framework.serializers import ValidationError


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserModel
        fields = ('first_name', 'last_name', 'email')


class UserSignInSerializer(serializers.ModelSerializer):
    email = serializers.CharField(validators=[])

    class Meta:
        model = UserModel
        fields = ('email', 'password')


class CreateUserSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserModel
        fields = ('first_name', 'last_name', 'email', 'password')

    def validate_first_name(self, value):
        if any(char.isdigit() for char in value):
            raise ValidationError({
                'error': 'Name cannot contain digits'})
