from django.contrib import messages
from django.contrib.auth.mixins import LoginRequiredMixin
from django.http import HttpResponse
from django.urls import reverse_lazy
from django.views.generic import CreateView, DeleteView, DetailView, ListView, UpdateView
from accounts.mixins import StaffRequiredMixin
from .forms import PatientForm
from .models import Patient
from django.shortcuts import redirect
from core.models import ActivityLog, Notification


class PatientListView(StaffRequiredMixin, ListView):
    model = Patient
    template_name = 'patients/patient_list.html'
    paginate_by = 12

    def get_queryset(self):
        queryset = super().get_queryset().select_related('study')
        search = self.request.GET.get('search')
        study = self.request.GET.get('study')
        status = self.request.GET.get('status')
        gender = self.request.GET.get('gender')
        if search:
            queryset = queryset.filter(name__icontains=search)
        if study:
            queryset = queryset.filter(study_id=study)
        if status:
            queryset = queryset.filter(status=status)
        if gender:
            queryset = queryset.filter(gender=gender)
        return queryset

    def render_to_response(self, context, **response_kwargs):
        if self.request.headers.get('x-requested-with') == 'XMLHttpRequest':
            from django.template.loader import render_to_string
            html = render_to_string('patients/_table.html', context=context, request=self.request)
            return HttpResponse(html)
        return super().render_to_response(context, **response_kwargs)


class PatientCreateView(StaffRequiredMixin, CreateView):
    model = Patient
    form_class = PatientForm
    template_name = 'patients/patient_form.html'
    success_url = reverse_lazy('patients:list')

    def handle_no_permission(self):
        messages.error(self.request, "🚫 You are not allowed to create patients.")
        return redirect('patients:list')

    def form_valid(self, form):
        response = super().form_valid(form)
        ActivityLog.objects.create(
            actor=self.request.user,
            action='Created patient',
            target=self.object.name
        )
        Notification.objects.create(
            user=self.request.user,
            title='Patient record created',
            message=f'{self.object.name} was added to {self.object.study}'
        )
        messages.success(self.request, 'Patient added successfully.')
        return response


class PatientUpdateView(StaffRequiredMixin, UpdateView):
    model = Patient
    form_class = PatientForm
    template_name = 'patients/patient_form.html'
    success_url = reverse_lazy('patients:list')

    def handle_no_permission(self):
        messages.error(self.request, "🚫 You are not allowed to update patients.")
        return redirect('patients:list')

    def form_valid(self, form):
        response = super().form_valid(form)
        ActivityLog.objects.create(actor=self.request.user, action='Updated patient', target=self.object.name)
        messages.success(self.request, 'Patient updated successfully.')
        return response


class PatientDeleteView(StaffRequiredMixin, DeleteView):
    model = Patient
    template_name = 'patients/patient_confirm_delete.html'
    success_url = reverse_lazy('patients:list')

    def handle_no_permission(self):
        messages.error(self.request, "🚫 You are not allowed to delete patients.")
        return redirect('patients:list')

    def form_valid(self, form):
        patient = self.get_object()
        ActivityLog.objects.create(actor=self.request.user, action='Deleted patient', target=patient.name)
        messages.success(self.request, 'Patient removed successfully.')
        return super().form_valid(form)


class PatientDetailView(StaffRequiredMixin, DetailView):
    model = Patient
    template_name = 'patients/patient_detail.html'
