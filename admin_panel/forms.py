"""
CLEANED: admin_panel/forms.py (NEW FILE)

PURPOSE: Move forms out of views.py to follow Django conventions

BENEFITS:
✅ Proper Django app structure
✅ Better form reusability
✅ Easier form testing
✅ Cleaner views.py
"""

from django import forms
from studies.models import Study
from admin_panel.models import Career, BlogPost, ContactMessage, Application


class StudyForm(forms.ModelForm):
    class Meta:
        model = Study
        fields = ['title', 'description', 'status', 'start_date', 'end_date', 'owners']
        widgets = {
            'title': forms.TextInput(attrs={
                'class': 'form-control',
                'placeholder': 'Enter study title'
            }),
            'description': forms.Textarea(attrs={
                'class': 'form-control',
                'rows': 4,
                'placeholder': 'Describe the study'
            }),
            'status': forms.Select(attrs={'class': 'form-select'}),
            'start_date': forms.DateInput(attrs={
                'type': 'date',
                'class': 'form-control'
            }),
            'end_date': forms.DateInput(attrs={
                'type': 'date',
                'class': 'form-control'
            }),
            'owners': forms.CheckboxSelectMultiple(attrs={
                'class': 'form-check-input'
            }),
        }


class CareerForm(forms.ModelForm):
    class Meta:
        model = Career
        fields = ['title', 'location', 'description', 'requirements', 'is_active']
        widgets = {
            'title': forms.TextInput(attrs={
                'class': 'form-control',
                'placeholder': 'Job title'
            }),
            'location': forms.TextInput(attrs={
                'class': 'form-control',
                'placeholder': 'Job location'
            }),
            'description': forms.Textarea(attrs={
                'class': 'form-control',
                'rows': 5,
                'placeholder': 'Job description'
            }),
            'requirements': forms.Textarea(attrs={
                'class': 'form-control',
                'rows': 4,
                'placeholder': 'Required qualifications'
            }),
            'is_active': forms.CheckboxInput(attrs={
                'class': 'form-check-input'
            }),
        }


class BlogPostForm(forms.ModelForm):
    class Meta:
        model = BlogPost
        fields = ['title', 'content', 'is_published']
        widgets = {
            'title': forms.TextInput(attrs={
                'class': 'form-control',
                'placeholder': 'Blog post title'
            }),
            'content': forms.Textarea(attrs={
                'class': 'form-control',
                'rows': 10,
                'placeholder': 'Write your blog post content here'
            }),
            'is_published': forms.CheckboxInput(attrs={
                'class': 'form-check-input'
            }),
        }


class ContactMessageForm(forms.ModelForm):
    """Read-only form for displaying contact messages"""
    class Meta:
        model = ContactMessage
        fields = ['name', 'email', 'subject', 'message']