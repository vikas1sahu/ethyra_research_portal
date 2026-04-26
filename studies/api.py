from rest_framework import viewsets, permissions
from .models import Study
from .serializers import StudySerializer


class StudyViewSet(viewsets.ModelViewSet):
    queryset = Study.objects.all().order_by('-start_date')
    serializer_class = StudySerializer
    permission_classes = [permissions.IsAuthenticated]
