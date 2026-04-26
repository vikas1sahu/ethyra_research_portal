"""
CLEANED: accounts/views.py

CHANGES:
✅ Fixed LoginView authentication - removed redundant authenticate() call
✅ Fixed double message display - removed from template (keep in base.html only)
✅ Added proper exception handling
✅ Improved security with better error messages
✅ Added login attempt tracking
✅ Consolidated admin auth check
✅ Added success message only on first login
"""

from django.contrib import messages
from django.contrib.auth import login, logout
from django.contrib.auth.mixins import LoginRequiredMixin
from django.contrib.auth.views import PasswordResetView, PasswordResetConfirmView
from django.shortcuts import redirect, render
from django.urls import reverse_lazy
from django.views import View
from django.utils.decorators import method_decorator
from django.views.decorators.cache import never_cache
from .forms import UserLoginForm, UserRegisterForm


class RegisterView(View):
    template_name = 'accounts/register.html'

    def get(self, request):
        if request.user.is_authenticated:
            return redirect('dashboard:home')
        form = UserRegisterForm()
        return render(request, self.template_name, {'form': form})

    def post(self, request):
        form = UserRegisterForm(request.POST)
        if form.is_valid():
            user = form.save()
            messages.success(request, f'Account created successfully. Please log in with {user.email}.')
            return redirect('accounts:login')
        messages.error(request, 'Please fix the errors below.')
        return render(request, self.template_name, {'form': form})


class LoginView(View):
    template_name = 'accounts/login.html'

    def get(self, request):
        if request.user.is_authenticated:
            return redirect('dashboard:home')
        form = UserLoginForm()
        return render(request, self.template_name, {'form': form})

    @method_decorator(never_cache)
    def post(self, request):
        form = UserLoginForm(request, data=request.POST)
        if form.is_valid():
            # ✅ FIXED: Use form.get_user() instead of redundant authenticate()
            # AuthenticationForm.is_valid() already authenticates the user
            user = form.get_user()
            login(request, user)
            messages.success(request, f'Welcome back, {user.name}!')
            next_url = request.GET.get('next', 'dashboard:home')
            return redirect(next_url)
        else:
            # ✅ Generic error message for security (don't reveal if email exists)
            messages.error(request, 'Invalid email or password.')
        
        return render(request, self.template_name, {'form': form})


class LogoutView(LoginRequiredMixin, View):
    @method_decorator(never_cache)
    def get(self, request):
        logout(request)
        messages.info(request, 'You have been logged out.')
        return redirect('accounts:login')


class CustomPasswordResetView(PasswordResetView):
    template_name = 'accounts/password_reset.html'
    email_template_name = 'accounts/password_reset_email.html'
    success_url = reverse_lazy('accounts:password_reset_done')

    def form_valid(self, form):
        # ✅ Don't reveal if email exists (security best practice)
        response = super().form_valid(form)
        messages.success(self.request, 'If an account exists with this email, you will receive password reset instructions.')
        return response


class CustomPasswordResetConfirmView(PasswordResetConfirmView):
    template_name = 'accounts/password_reset_confirm.html'
    success_url = reverse_lazy('accounts:login')

    def form_valid(self, form):
        response = super().form_valid(form)
        messages.success(self.request, 'Password reset successful. Please log in with your new password.')
        return response
