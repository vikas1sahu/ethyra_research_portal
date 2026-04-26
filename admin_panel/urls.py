from django.urls import path
from .views import (
    AdminDashboardView,
    TrialsListView, TrialCreateView, TrialUpdateView, TrialDeleteView,
    CareersListView, CareerCreateView, CareerUpdateView, CareerDeleteView,
    BlogListView, BlogCreateView, BlogUpdateView, BlogDeleteView,
    MessagesListView, MessageDeleteView,
    ApplicationsListView, ApplicationDeleteView,
)

app_name = 'admin_panel'

urlpatterns = [
    path('', AdminDashboardView.as_view(), name='dashboard'),

    # Trials
    path('trials/', TrialsListView.as_view(), name='trials_list'),
    path('trials/create/', TrialCreateView.as_view(), name='trial_create'),
    path('trials/<int:pk>/edit/', TrialUpdateView.as_view(), name='trial_edit'),
    path('trials/<int:pk>/delete/', TrialDeleteView.as_view(), name='trial_delete'),

    # Careers
    path('careers/', CareersListView.as_view(), name='careers_list'),
    path('careers/create/', CareerCreateView.as_view(), name='career_create'),
    path('careers/<int:pk>/edit/', CareerUpdateView.as_view(), name='career_edit'),
    path('careers/<int:pk>/delete/', CareerDeleteView.as_view(), name='career_delete'),

    # Blog
    path('blog/', BlogListView.as_view(), name='blog_list'),
    path('blog/create/', BlogCreateView.as_view(), name='blog_create'),
    path('blog/<int:pk>/edit/', BlogUpdateView.as_view(), name='blog_edit'),
    path('blog/<int:pk>/delete/', BlogDeleteView.as_view(), name='blog_delete'),

    # Messages
    path('messages/', MessagesListView.as_view(), name='messages_list'),
    path('messages/<int:pk>/delete/', MessageDeleteView.as_view(), name='message_delete'),

    # Applications
    path('applications/', ApplicationsListView.as_view(), name='applications_list'),
    path('applications/<int:pk>/delete/', ApplicationDeleteView.as_view(), name='application_delete'),
]