from django.contrib import admin
from django.utils.html import format_html
from .models import Application, Career, BlogPost, ContactMessage


@admin.register(Career)
class CareerAdmin(admin.ModelAdmin):
    list_display = ('title', 'location', 'is_active_badge', 'created_at')
    list_filter = ('is_active', 'created_at')
    search_fields = ('title', 'location', 'description')
    readonly_fields = ('created_at',)
    fieldsets = (
        ('Position Info', {'fields': ('title', 'location')}),
        ('Details', {'fields': ('description', 'requirements')}),
        ('Status', {'fields': ('is_active',)}),
        ('Metadata', {'fields': ('created_at',), 'classes': ('collapse',)}),
    )
    ordering = ('-created_at',)

    def is_active_badge(self, obj):
        if obj.is_active:
            return format_html(
                '<span style="background-color: #28a745; color: white; padding: 3px 8px; border-radius: 3px;">Active</span>'
            )
        return format_html(
            '<span style="background-color: #dc3545; color: white; padding: 3px 8px; border-radius: 3px;">Inactive</span>'
        )
    is_active_badge.short_description = 'Status'


@admin.register(BlogPost)
class BlogPostAdmin(admin.ModelAdmin):
    list_display = ('title', 'author', 'is_published_badge', 'published_at')
    list_filter = ('is_published', 'published_at')
    search_fields = ('title', 'content', 'author__email')
    readonly_fields = ('published_at',)
    fieldsets = (
        ('Content', {'fields': ('title', 'content')}),
        ('Publishing', {'fields': ('author', 'is_published', 'published_at')}),
    )
    ordering = ('-published_at',)

    def save_model(self, request, obj, form, change):
        if not change:  # Only set author on creation
            obj.author = request.user
        super().save_model(request, obj, form, change)

    def is_published_badge(self, obj):
        if obj.is_published:
            return format_html(
                '<span style="background-color: #28a745; color: white; padding: 3px 8px; border-radius: 3px;">Published</span>'
            )
        return format_html(
            '<span style="background-color: #ffc107; color: black; padding: 3px 8px; border-radius: 3px;">Draft</span>'
        )
    is_published_badge.short_description = 'Status'


@admin.register(Application)
class ApplicationAdmin(admin.ModelAdmin):
    list_display = ('name', 'email', 'position', 'created_at')
    list_filter = ('position', 'created_at')
    search_fields = ('name', 'email', 'position')
    readonly_fields = ('created_at', 'resume_link')
    fieldsets = (
        ('Applicant Info', {'fields': ('name', 'email', 'phone')}),
        ('Application', {'fields': ('position', 'cover_letter')}),
        ('Documents', {'fields': ('resume', 'resume_link')}),
        ('Metadata', {'fields': ('created_at',)}),
    )
    ordering = ('-created_at',)

    def resume_link(self, obj):
        if obj.resume:
            return format_html(
                '<a href="{}" target="_blank">Download Resume</a>',
                obj.resume.url
            )
        return '-'
    resume_link.short_description = 'Resume'


@admin.register(ContactMessage)
class ContactMessageAdmin(admin.ModelAdmin):
    list_display = ('name', 'email', 'subject', 'is_read_badge', 'created_at')
    list_filter = ('is_read', 'created_at')
    search_fields = ('name', 'email', 'subject', 'message')
    readonly_fields = ('created_at', 'message_preview')
    fieldsets = (
        ('Sender', {'fields': ('name', 'email')}),
        ('Message', {'fields': ('subject', 'message', 'message_preview')}),
        ('Status', {'fields': ('is_read',)}),
        ('Metadata', {'fields': ('created_at',)}),
    )
    ordering = ('-created_at',)
    actions = ['mark_as_read', 'mark_as_unread']

    def message_preview(self, obj):
        return format_html(
            '<div style="background-color: #f8f9fa; padding: 10px; border-radius: 5px; max-height: 300px; overflow-y: auto;">{}</div>',
            obj.message.replace('\n', '<br>')
        )
    message_preview.short_description = 'Full Message'

    def is_read_badge(self, obj):
        if obj.is_read:
            return format_html(
                '<span style="background-color: #28a745; color: white; padding: 3px 8px; border-radius: 3px;">Read</span>'
            )
        return format_html(
            '<span style="background-color: #ffc107; color: black; padding: 3px 8px; border-radius: 3px;">Unread</span>'
        )
    is_read_badge.short_description = 'Status'
