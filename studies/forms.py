from django import forms
from .models import Study


class StudyForm(forms.ModelForm):
    class Meta:
        model = Study
        fields = ['title', 'description', 'status', 'start_date', 'end_date', 'owners']
        widgets = {
            'start_date': forms.DateInput(attrs={'type': 'date'}),
            'end_date': forms.DateInput(attrs={'type': 'date'}),
        }
