from django.urls import path


from .views import index

urlpatterns = [
    path('', index, name=''),
    path("sign-in", index),
    path('sign-up', index),
    path('user', index)
]
