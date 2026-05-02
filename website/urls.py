from django.urls import path
from . import views

app_name = "website"   # ✅ IMPORTANT (fixes your error)

urlpatterns = [
    path('', views.HomePageView.as_view(), name='home'),
    path('about/', views.AboutPageView.as_view(), name='about'),
    path('services/', views.ServicesPageView.as_view(), name='services'),
    path('trials/', views.TrialsPageView.as_view(), name='trials'),
    path('careers/', views.CareersPageView.as_view(), name='careers'),
    path('careers/apply/<int:career_id>/', views.JobApplicationView.as_view(), name='job_application'),
    path('insights/', views.InsightsPageView.as_view(), name='insights'),
    path('contact/', views.ContactPageView.as_view(), name='contact'),
    path('services/<slug:slug>/', views.service_detail, name='service_detail'),
]