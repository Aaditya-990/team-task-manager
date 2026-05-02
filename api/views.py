from rest_framework import viewsets, permissions, status
from rest_framework.response import Response
from rest_framework.views import APIView
from django.contrib.auth import get_user_model
from .models import Project, Task
from .serializers import UserSerializer, ProjectSerializer, TaskSerializer
from rest_framework_simplejwt.tokens import RefreshToken

User = get_user_model()

class IsAdmin(permissions.BasePermission):
    """
    Custom permission to only allow admins to edit objects.
    """
    def has_permission(self, request, view):
        return request.user and request.user.is_authenticated and request.user.role == 'ADMIN'

class UserMeView(APIView):
    permission_classes = [permissions.IsAuthenticated]
    def get(self, request):
        serializer = UserSerializer(request.user)
        return Response(serializer.data)

class RegisterView(APIView):
    permission_classes = [permissions.AllowAny]

    def post(self, request):
        serializer = UserSerializer(data=request.data)
        if serializer.is_valid():
            user = serializer.save()
            refresh = RefreshToken.for_user(user)
            return Response({
                'user': UserSerializer(user).data,
                'refresh': str(refresh),
                'access': str(refresh.access_token),
            }, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class ProjectViewSet(viewsets.ModelViewSet):
    queryset = Project.objects.all()
    serializer_class = ProjectSerializer

    def get_permissions(self):
        if self.action in ['create', 'update', 'partial_update', 'destroy']:
            permission_classes = [IsAdmin]
        else:
            permission_classes = [permissions.IsAuthenticated]
        return [permission() for permission in permission_classes]

    def perform_create(self, serializer):
        serializer.save(owner=self.request.user)

class TaskViewSet(viewsets.ModelViewSet):
    queryset = Task.objects.all()
    serializer_class = TaskSerializer

    def get_permissions(self):
        if self.action in ['create', 'destroy']:
            permission_classes = [IsAdmin]
        else:
            permission_classes = [permissions.IsAuthenticated]
        return [permission() for permission in permission_classes]
    
    def update(self, request, *args, **kwargs):
        # Members can only update status if they are the assignee
        partial = kwargs.pop('partial', False)
        instance = self.get_object()
        
        if request.user.role != 'ADMIN':
            if instance.assignee != request.user:
                return Response({"detail": "You do not have permission to edit this task."}, status=status.HTTP_403_FORBIDDEN)
            
            # If member, only allow updating status
            data = {'status': request.data.get('status')}
            if 'status' not in request.data:
                 return Response({"detail": "Members can only update task status."}, status=status.HTTP_400_BAD_REQUEST)
            
            serializer = self.get_serializer(instance, data=data, partial=True)
            serializer.is_valid(raise_exception=True)
            self.perform_update(serializer)
            return Response(serializer.data)
            
        # Admin can update everything
        serializer = self.get_serializer(instance, data=request.data, partial=partial)
        serializer.is_valid(raise_exception=True)
        self.perform_update(serializer)
        return Response(serializer.data)
