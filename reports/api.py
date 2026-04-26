from rest_framework import viewsets, permissions
from .serializers import ReportSerializer
from patients.models import Patient


class ReportViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Patient.objects.all().select_related('study')
    serializer_class = ReportSerializer
    permission_classes = [permissions.IsAuthenticated]
