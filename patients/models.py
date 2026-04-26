from django.db import models
from studies.models import Study


class Patient(models.Model):
    GENDER_CHOICES = [
        ('Female', 'Female'),
        ('Male', 'Male'),
        ('Other', 'Other'),
    ]
    STATUS_CHOICES = [
        ('Enrolled', 'Enrolled'),
        ('Completed', 'Completed'),
        ('Withdrawn', 'Withdrawn'),
    ]

    name = models.CharField(max_length=180)
    age = models.PositiveIntegerField()
    gender = models.CharField(max_length=20, choices=GENDER_CHOICES)
    condition = models.CharField(max_length=220)
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default='Enrolled')
    study = models.ForeignKey(Study, on_delete=models.CASCADE, related_name='patients')
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ['-created_at']

    def __str__(self):
        return self.name
