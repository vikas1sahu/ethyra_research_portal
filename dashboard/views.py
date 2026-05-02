from django.contrib.auth.mixins import LoginRequiredMixin
from django.core.exceptions import PermissionDenied
from django.shortcuts import redirect
from django.views import View
from django.views.generic import TemplateView
from studies.models import Study
from patients.models import Patient
from core.models import Notification, ActivityLog


class DashboardRedirectView(LoginRequiredMixin, View):
    def get(self, request):
        user = request.user
        if user.is_superuser or user.is_staff:
            return redirect('dashboard:admin_home')
        if user.role == 'researcher':
            return redirect('dashboard:research_home')
        return redirect('dashboard:user_home')


class AdminDashboardView(LoginRequiredMixin, TemplateView):
    template_name = 'dashboard/admin_dashboard.html'

    def dispatch(self, request, *args, **kwargs):
        if not (request.user.is_staff or request.user.is_superuser):
            raise PermissionDenied()
        return super().dispatch(request, *args, **kwargs)

    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)
        context['total_studies'] = Study.objects.count()
        context['total_patients'] = Patient.objects.count()
        context['recent_notifications'] = Notification.objects.filter(user=self.request.user)[:5]
        context['recent_activity'] = ActivityLog.objects.select_related('actor')[:6]
        return context


class UserDashboardView(LoginRequiredMixin, TemplateView):
    template_name = 'dashboard/user_dashboard.html'

    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)
        context['recent_notifications'] = Notification.objects.filter(user=self.request.user)[:5]
        return context


class ResearcherDashboardView(LoginRequiredMixin, TemplateView):
    template_name = 'dashboard/researcher_dashboard.html'

    def dispatch(self, request, *args, **kwargs):
        if request.user.role != 'researcher':
            raise PermissionDenied()
        return super().dispatch(request, *args, **kwargs)

    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)
        context['research_projects'] = Study.objects.filter(owners=request.user) if hasattr(Study, 'owners') else Study.objects.none()
        return context
