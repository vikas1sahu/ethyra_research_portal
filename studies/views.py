from django.contrib import messages
from django.contrib.auth.mixins import LoginRequiredMixin
from django.http import HttpResponse
from django.urls import reverse_lazy
from django.views.generic import CreateView, DeleteView, ListView, UpdateView, DetailView
from accounts.mixins import StaffRequiredMixin
from .forms import StudyForm
from .models import Study
from core.models import ActivityLog, Notification


class StudyListView(LoginRequiredMixin, ListView):
    model = Study
    template_name = 'studies/study_list.html'
    paginate_by = 10

    def get_queryset(self):
        queryset = super().get_queryset()
        search = self.request.GET.get('search')
        status = self.request.GET.get('status')
        if search:
            queryset = queryset.filter(title__icontains=search)
        if status:
            queryset = queryset.filter(status=status)
        return queryset

    def render_to_response(self, context, **response_kwargs):
        if self.request.headers.get('x-requested-with') == 'XMLHttpRequest':
            from django.template.loader import render_to_string
            html = render_to_string('studies/_table.html', context=context, request=self.request)
            return HttpResponse(html)
        return super().render_to_response(context, **response_kwargs)


class StudyCreateView(LoginRequiredMixin, StaffRequiredMixin, CreateView):
    model = Study
    form_class = StudyForm
    template_name = 'studies/study_form.html'
    success_url = reverse_lazy('studies:list')

    def form_valid(self, form):
        response = super().form_valid(form)
        ActivityLog.objects.create(actor=self.request.user, action='Created study', target=self.object.title)
        for user in self.object.owners.all():
            Notification.objects.create(user=user, title='Study assigned', message=f'You were added to study {self.object.title}')
        messages.success(self.request, 'Study created successfully.')
        return response


class StudyUpdateView(LoginRequiredMixin, StaffRequiredMixin, UpdateView):
    model = Study
    form_class = StudyForm
    template_name = 'studies/study_form.html'
    success_url = reverse_lazy('studies:list')

    def form_valid(self, form):
        response = super().form_valid(form)
        ActivityLog.objects.create(actor=self.request.user, action='Updated study', target=self.object.title)
        messages.success(self.request, 'Study updated successfully.')
        return response


class StudyDeleteView(LoginRequiredMixin, StaffRequiredMixin, DeleteView):
    model = Study
    template_name = 'studies/study_confirm_delete.html'
    success_url = reverse_lazy('studies:list')

    def delete(self, request, *args, **kwargs):
        study = self.get_object()
        ActivityLog.objects.create(actor=request.user, action='Deleted study', target=study.title)
        messages.success(request, 'Study deleted successfully.')
        return super().delete(request, *args, **kwargs)


class StudyDetailView(LoginRequiredMixin, DetailView):
    model = Study
    template_name = 'studies/study_detail.html'
