from django.urls import path
from .views import StudyCreateView, StudyDeleteView, StudyDetailView, StudyListView, StudyUpdateView

app_name = 'studies'

urlpatterns = [
    path('', StudyListView.as_view(), name='list'),
    path('create/', StudyCreateView.as_view(), name='create'),
    path('<int:pk>/', StudyDetailView.as_view(), name='detail'),
    path('<int:pk>/edit/', StudyUpdateView.as_view(), name='edit'),
    path('<int:pk>/delete/', StudyDeleteView.as_view(), name='delete'),
]
