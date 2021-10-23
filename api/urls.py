from django.urls import path
from .views import UserApi, AddUser, UserSignInApi

urlpatterns = [
    path('room', UserApi.as_view()),
    path("create-user", AddUser.as_view()),
    path('verify-user', UserSignInApi.as_view())
]
