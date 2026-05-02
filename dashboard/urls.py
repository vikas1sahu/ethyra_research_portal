from django.urls import path
from .views import AdminDashboardView, DashboardRedirectView, ResearcherDashboardView, UserDashboardView

app_name = 'dashboard'

urlpatterns = [
    path('', DashboardRedirectView.as_view(), name='home'),
    path('admin/', AdminDashboardView.as_view(), name='admin_home'),
    path('user/', UserDashboardView.as_view(), name='user_home'),
    path('researcher/', ResearcherDashboardView.as_view(), name='research_home'),
]
