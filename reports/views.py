import io
from django.http import HttpResponse
from django.views.generic import TemplateView
from reportlab.lib.pagesizes import letter
from reportlab.pdfgen import canvas
from openpyxl import Workbook
from accounts.mixins import StaffRequiredMixin
from studies.models import Study
from patients.models import Patient


class ReportDashboardView(StaffRequiredMixin, TemplateView):
    template_name = 'reports/reports.html'

    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)
        context['studies'] = Study.objects.all()
        context['patients'] = Patient.objects.select_related('study')[:25]
        return context


class ExportPdfView(StaffRequiredMixin, TemplateView):
    def get(self, request, *args, **kwargs):
        buffer = io.BytesIO()
        p = canvas.Canvas(buffer, pagesize=letter)
        p.setFont('Helvetica-Bold', 14)
        p.drawString(40, 740, 'EthyraTrials: Study & Patient Report')

        studies = Study.objects.all()[:10]
        y = 700
        p.setFont('Helvetica', 10)
        for study in studies:
            end_date = study.end_date or 'N/A'
            p.drawString(40, y, f'{study.title} [{study.status}] start: {study.start_date} end: {end_date}')
            y -= 18
            if y < 80:
                p.showPage()
                y = 740
        p.save()
        buffer.seek(0)
        return HttpResponse(buffer, content_type='application/pdf')


class ExportExcelView(StaffRequiredMixin, TemplateView):
    def get(self, request, *args, **kwargs):
        workbook = Workbook()
        sheet = workbook.active
        sheet.title = 'Studies'
        sheet.append(['Title', 'Status', 'Start Date', 'End Date'])
        for study in Study.objects.all():
            sheet.append([study.title, study.status, str(study.start_date), str(study.end_date or '')])
        response = HttpResponse(content_type='application/vnd.openxmlformats-officedocument.spreadsheetml.sheet')
        response['Content-Disposition'] = 'attachment; filename=ethyra_trials_studies.xlsx'
        workbook.save(response)
        return response
