import jwt
from django.conf import settings


def get_jwt_token(user):
    encoded_jwt = jwt.encode({"user_id": user.id},
                             settings.SECRET_KEY, algorithm="HS256")
    return encoded_jwt


def decode_jwt_token(token):
    return jwt.decode(token, settings.SECRET_KEY, algorithm="HS256")
