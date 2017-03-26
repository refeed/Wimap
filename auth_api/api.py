from rest_framework import permissions, viewsets, status, views
from rest_framework.response import Response

from django.contrib.auth import login, logout, authenticate

from auth_api.models import UserProfile
from auth_api.permissions import IsAccountOwner
from auth_api.serializers import UserProfileSerializer


class UserProfileViewSet(viewsets.ModelViewSet):
    lookup_field = 'username'
    queryset = UserProfile.objects.all()
    serializer_class = UserProfileSerializer

    def get_permissions(self):
        if self.request.method in permissions.SAFE_METHODS:
            return (permissions.AllowAny(),)

        if self.request.method == 'POST':
            return (permissions.AllowAny(),)

        return (permissions.IsAuthenticated(), IsAccountOwner(),)

    def create(self, request):
        serializer = self.serializer_class(data=request.data)
        if serializer.is_valid():
            UserProfile.objects.create_user(**serializer.validated_data)

            return Response(serializer.validated_data, status=status.HTTP_201_CREATED)

        return Response({
            'status': 'Bad request',
            'message': 'Account could not be created with received data.'
        }, status=status.HTTP_400_BAD_REQUEST)


class UserView(views.APIView):
    def get(self, request):
        user = request.user

        if user is None or not user.is_active:
            return Response({}, status=status.HTTP_401_UNAUTHORIZED)

        return Response(UserProfileSerializer(user).data)


class LoginView(views.APIView):
    def post(self, request):
        user = authenticate(
            email=request.data.get('email'),
            password=request.data.get('password')
        )

        if user is None or not user.is_active:
            return Response(dict(
                status='Unauthorized',
                message='Username or password incorrect'
            ), status=status.HTTP_401_UNAUTHORIZED)

        login(request, user)
        return Response(UserProfileSerializer(user).data)


class LogoutView(views.APIView):
    def get(self, request):
        logout(request)
        return Response({}, status=status.HTTP_204_NO_CONTENT)
