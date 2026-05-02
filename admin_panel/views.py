from django.shortcuts import render, redirect
from django.contrib import messages
from django.utils.decorators import method_decorator
from django.views import View
from django.db.models import Count
from django.views.generic import ListView, CreateView, UpdateView, DeleteView
from django.urls import reverse_lazy
from accounts.decorators import admin_required
from accounts.mixins import StaffRequiredMixin
from studies.models import Study
from patients.models import Patient
from .models import Application, Career, BlogPost, ContactMessage
from .forms import StudyForm, CareerForm, BlogPostForm, ContactMessageForm

@method_decorator(admin_required, name='dispatch')
class AdminDashboardView(View):
    template_name = 'admin_panel/dashboard.html'

    def get(self, request):
        # Stats
        total_trials = Study.objects.count()
        active_trials = Study.objects.filter(status='active').count()
        applications = Application.objects.count()
        careers = Career.objects.count()
        blog_posts = BlogPost.objects.count()
        messages_count = ContactMessage.objects.count()

        # Recent items
        recent_applications = Application.objects.order_by('-created_at')[:5]
        recent_messages = ContactMessage.objects.order_by('-created_at')[:5]

        context = {
            'total_trials': total_trials,
            'active_trials': active_trials,
            'applications': applications,
            'careers': careers,
            'blog_posts': blog_posts,
            'messages_count': messages_count,
            'recent_applications': recent_applications,
            'recent_messages': recent_messages,
        }

        return render(request, self.template_name, context)

# Trials Views
from django.views.generic import ListView, CreateView, UpdateView, DeleteView
from django.urls import reverse_lazy
from django.contrib.auth.mixins import LoginRequiredMixin

class TrialsListView(StaffRequiredMixin, ListView):
    model = Study
    template_name = 'admin_panel/trials_list.html'
    context_object_name = 'trials'

class TrialCreateView(StaffRequiredMixin, CreateView):
    model = Study
    form_class = StudyForm
    template_name = 'admin_panel/trial_form.html'
    success_url = reverse_lazy('admin_panel:trials_list')

class TrialUpdateView(StaffRequiredMixin, UpdateView):
    model = Study
    form_class = StudyForm
    template_name = 'admin_panel/trial_form.html'
    success_url = reverse_lazy('admin_panel:trials_list')

class TrialDeleteView(StaffRequiredMixin, DeleteView):
    model = Study
    template_name = 'admin_panel/trial_confirm_delete.html'
    success_url = reverse_lazy('admin_panel:trials_list')

# Careers Views
class CareersListView(StaffRequiredMixin, ListView):
    model = Career
    template_name = 'admin_panel/careers_list.html'
    context_object_name = 'careers'

class CareerCreateView(StaffRequiredMixin, CreateView):
    model = Career
    form_class = CareerForm
    template_name = 'admin_panel/career_form.html'
    success_url = reverse_lazy('admin_panel:careers_list')

class CareerUpdateView(StaffRequiredMixin, UpdateView):
    model = Career
    form_class = CareerForm
    template_name = 'admin_panel/career_form.html'
    success_url = reverse_lazy('admin_panel:careers_list')

class CareerDeleteView(StaffRequiredMixin, DeleteView):
    model = Career
    template_name = 'admin_panel/career_confirm_delete.html'
    success_url = reverse_lazy('admin_panel:careers_list')

# Blog Views
class BlogListView(StaffRequiredMixin, ListView):
    model = BlogPost
    template_name = 'admin_panel/blog_list.html'
    context_object_name = 'posts'

class BlogCreateView(StaffRequiredMixin, CreateView):
    model = BlogPost
    form_class = BlogPostForm
    template_name = 'admin_panel/blog_form.html'
    success_url = reverse_lazy('admin_panel:blog_list')

    def form_valid(self, form):
        form.instance.author = self.request.user
        return super().form_valid(form)

class BlogUpdateView(StaffRequiredMixin, UpdateView):
    model = BlogPost
    form_class = BlogPostForm
    template_name = 'admin_panel/blog_form.html'
    success_url = reverse_lazy('admin_panel:blog_list')

class BlogDeleteView(StaffRequiredMixin, DeleteView):
    model = BlogPost
    template_name = 'admin_panel/blog_confirm_delete.html'
    success_url = reverse_lazy('admin_panel:blog_list')

# Messages Views
class MessagesListView(StaffRequiredMixin, ListView):
    model = ContactMessage
    template_name = 'admin_panel/messages_list.html'
    context_object_name = 'messages'

class MessageDeleteView(StaffRequiredMixin, DeleteView):
    model = ContactMessage
    template_name = 'admin_panel/message_confirm_delete.html'
    success_url = reverse_lazy('admin_panel:messages_list')

# Applications Views
class ApplicationsListView(StaffRequiredMixin, ListView):
    model = Application
    template_name = 'admin_panel/applications_list.html'
    context_object_name = 'applications'

class ApplicationDeleteView(StaffRequiredMixin, DeleteView):
    model = Application
    template_name = 'admin_panel/application_confirm_delete.html'
    success_url = reverse_lazy('admin_panel:applications_list')
