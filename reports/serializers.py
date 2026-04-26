from rest_framework import serializers
from patients.models import Patient


class ReportSerializer(serializers.ModelSerializer):
    class Meta:
        model = Patient
        fields = ['id', 'name', 'age', 'gender', 'condition', 'status', 'study', 'created_at']
