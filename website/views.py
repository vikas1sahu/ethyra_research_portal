from django.views.generic import TemplateView
from django.views.generic.edit import FormView
from django.urls import reverse_lazy
from django.shortcuts import render
from django.contrib import messages
from .forms import ContactForm, JobApplicationForm
from admin_panel.models import Career

class HomePageView(TemplateView):
    template_name = 'website/home.html'

class AboutPageView(TemplateView):
    template_name = 'website/about.html'

class ServicesPageView(TemplateView):
    template_name = 'website/services.html'

class TrialsPageView(TemplateView):
    template_name = 'website/trials.html'

def service_detail(request, slug):
    services = {
        "site-management": {
            "title": "Site Management",
            "description": "End-to-end site activation, monitoring, and performance optimization."
        },
        "patient-recruitment": {
            "title": "Patient Recruitment",
            "description": "Targeted outreach and retention strategies to accelerate enrollment."
        },
        "regulatory-compliance": {
            "title": "Regulatory Compliance",
            "description": "GCP-compliant documentation, audits, and risk mitigation."
        },
        "data-management": {
            "title": "Data Management",
            "description": "Secure, accurate, and analytics-ready data pipelines."
        }
    }

    service = services.get(slug)

    if not service:
        return render(request, "404.html")

    return render(request, "services/service_detail.html", {"service": service})

class CareersPageView(TemplateView):
    template_name = 'website/careers.html'

    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)
        context['careers'] = Career.objects.filter(is_active=True).order_by('-created_at')
        return context

class InsightsPageView(TemplateView):
    template_name = 'website/insights.html'

class ContactPageView(FormView):
    template_name = 'website/contact.html'
    form_class = ContactForm
    success_url = reverse_lazy('website:contact')

    def form_valid(self, form):
        form.save()
        messages.success(self.request, 'Thank you for your message! We will get back to you soon.')
        return super().form_valid(form)

class JobApplicationView(FormView):
    template_name = 'website/job_application.html'
    form_class = JobApplicationForm

    def get_success_url(self):
        return reverse_lazy('website:careers')

    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)
        career_id = self.kwargs.get('career_id')
        if career_id:
            try:
                career = Career.objects.get(id=career_id, is_active=True)
                context['career'] = career
                # Pre-populate the position field
                if 'form' not in context:
                    context['form'] = self.form_class(initial={'position': career.title})
                else:
                    context['form'].initial['position'] = career.title
            except Career.DoesNotExist:
                pass
        return context

    def form_valid(self, form):
        career_id = self.kwargs.get('career_id')
        if career_id:
            try:
                career = Career.objects.get(id=career_id, is_active=True)
                form.instance.position = career.title
            except Career.DoesNotExist:
                pass
        form.save()
        messages.success(self.request, 'Thank you for your application! We will review it and get back to you soon.')
        return super().form_valid(form)
