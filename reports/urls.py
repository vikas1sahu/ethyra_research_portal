from django.urls import path
from .views import ExportExcelView, ExportPdfView, ReportDashboardView

app_name = 'reports'

urlpatterns = [
    path('', ReportDashboardView.as_view(), name='dashboard'),
    path('export/pdf/', ExportPdfView.as_view(), name='export_pdf'),
    path('export/excel/', ExportExcelView.as_view(), name='export_excel'),
]
