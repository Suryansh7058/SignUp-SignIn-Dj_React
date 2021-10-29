from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework import status
from .models import UserModel
from .serializers import CreateUserSerializer, UserSerializer, UserSignInSerializer
from rest_framework.generics import ListAPIView


class RoomView(ListAPIView):
    queryset = UserModel.objects.all()
    serializer_class = UserSerializer


class UserApi(APIView):
    serialier_class = UserSerializer
    lookup_url_kwarg = 'email'

    def get(self, request, format=None):
        email = request.GET.get(self.lookup_url_kwarg)

        if email != None:
            user = UserModel.objects.filter(email=email)
            if len(user) > 0:
                data = UserSerializer(user[0]).data
                return Response(
                    data=data,
                    status=status.HTTP_200_OK
                )
            return Response({'User Not Found': 'Invalid User Email...'}, status=status.HTTP_404_NOT_FOUND)

        return Response({'Bad Request': 'Code Paramter Not Found in Request...'}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


class AddUser(APIView):
    serializer_class = CreateUserSerializer

    def post(self, request, format=None):
        if not self.request.session.exists(self.request.session.session_key):
            self.request.session.create()

        serializer = self.serializer_class(data=request.data)

        if serializer.is_valid():
            first_name = serializer.data.get('first_name')
            last_name = serializer.data.get('last_name')
            email = serializer.data.get('email')
            password = serializer.data.get('password')
            host = self.request.session.session_key
            queryset = UserModel.objects.filter(user_session=host)

            if queryset.exists():
                user = queryset[0]
                user.first_name = first_name
                user.last_name = last_name
                user.email = email
                user.password = password
                user.save(update_fields=['first_name',
                                         'last_name', 'email', 'password'])

                self.request.session['host_id'] = host
                return Response(UserSerializer(user).data, status=status.HTTP_200_OK)
            else:
                user = UserModel(
                    user_session=host, first_name=first_name, last_name=last_name, email=email, password=password)
                user.save()
                self.request.session['host_id'] = host
                return Response(UserSerializer(user).data, status=status.HTTP_201_CREATED)

        return Response({'Bad Request': 'Invalid data...'}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


class UserSignInApi(APIView):
    serializer_class = UserSignInSerializer

    def post(self, request, format=None):
        data = request.data
        serializer = self.serializer_class(data=request.data)

        if serializer.is_valid():
            email = serializer.data.get('email')
            password = serializer.data.get('password')
            # preferably use get instead of filter as it can throw 500 server error and we can avoid using queryset[0] to get the id
            queryset = UserModel.objects.filter(email=email)
            if queryset.exists():
                user = queryset[0]
                if user.password == password:
                    return Response(UserSerializer(user).data, status=status.HTTP_200_OK)
                else:
                    return Response({"message": "Invalid Password"}, status=status.HTTP_400_BAD_REQUEST)

            return Response({"message": "Invalid Email"}, status=status.HTTP_400_BAD_REQUEST)

        return Response({'message': 'Invalid data...'}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
