from django.contrib.auth.mixins import UserPassesTestMixin


class StaffRequiredMixin(UserPassesTestMixin):
    """
    Mixin to restrict access to staff users (Admin, Manager roles).
    """
    def test_func(self):
        return self.request.user.role in ('Admin', 'Manager')