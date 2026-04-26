import os
from django.core.wsgi import get_wsgi_application

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'ethyra_portal.settings.prod')
application = get_wsgi_application()
