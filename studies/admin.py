from django.contrib import admin
from .models import Study


@admin.register(Study)
class StudyAdmin(admin.ModelAdmin):
    list_display = ('title', 'status', 'start_date', 'end_date')
    search_fields = ('title', 'description')
    list_filter = ('status',)
