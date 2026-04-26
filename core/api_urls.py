from django.urls import include, path
from rest_framework.routers import DefaultRouter
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView

from accounts.api import UserViewSet
from studies.api import StudyViewSet
from patients.api import PatientViewSet
from reports.api import ReportViewSet

router = DefaultRouter()
router.register('users', UserViewSet, basename='user')
router.register('studies', StudyViewSet, basename='study')
router.register('patients', PatientViewSet, basename='patient')
router.register('reports', ReportViewSet, basename='reports')

urlpatterns = [
    path('', include(router.urls)),

    # ✅ JWT AUTH ENDPOINTS
    path('auth/login/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('auth/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
]