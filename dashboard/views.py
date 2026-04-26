from django.contrib.auth.mixins import LoginRequiredMixin
from django.views.generic import TemplateView
from studies.models import Study
from patients.models import Patient
from core.models import Notification, ActivityLog


class DashboardView(LoginRequiredMixin, TemplateView):
    template_name = 'dashboard/home.html'

    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)
        context['total_studies'] = Study.objects.count()
        context['total_patients'] = Patient.objects.count()
        context['recent_notifications'] = Notification.objects.filter(user=self.request.user)[:5]
        context['recent_activity'] = ActivityLog.objects.select_related('actor')[:6]
        context['chart_labels'] = ['Active', 'Completed', 'Paused']
        context['chart_data'] = [Study.objects.filter(status='Active').count(), Study.objects.filter(status='Completed').count(), Study.objects.filter(status='Paused').count()]
        return context
