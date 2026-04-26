from rest_framework import serializers
from .models import Study


class StudySerializer(serializers.ModelSerializer):
    class Meta:
        model = Study
        fields = ['id', 'title', 'description', 'status', 'start_date', 'end_date', 'owners', 'created_at']
