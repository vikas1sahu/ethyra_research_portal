from django.db import models
from django.conf import settings


class Study(models.Model):
    STATUS_CHOICES = [
        ('Active', 'Active'),
        ('Completed', 'Completed'),
        ('Paused', 'Paused'),
    ]

    title = models.CharField(max_length=220)
    description = models.TextField(blank=True)
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default='Active')
    start_date = models.DateField()
    end_date = models.DateField(null=True, blank=True)
    owners = models.ManyToManyField(settings.AUTH_USER_MODEL, related_name='studies', blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ['-start_date']

    def __str__(self):
        return self.title
