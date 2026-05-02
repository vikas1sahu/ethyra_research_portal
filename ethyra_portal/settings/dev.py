from .base import *

DEBUG = True

ALLOWED_HOSTS = ['127.0.0.1', 'localhost', '10.140.112.234']

EMAIL_BACKEND = 'django.core.mail.backends.console.EmailBackend'