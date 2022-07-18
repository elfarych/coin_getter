from django.conf import settings
from django.conf.urls.static import static
from django.contrib import admin
from django.urls import path, include
from .yasg import urlpatterns as doc_urls

urlpatterns = [
    path('admin/', admin.site.urls),
    path('wallet/', include('wallets.urls')),
    # url(r'^media/(?P<path>.*)$', serve,{'document_root': settings.MEDIA_ROOT}),
    # url(r'^static/(?P<path>.*)$', serve,{'document_root': settings.STATIC_ROOT}),
]

urlpatterns += doc_urls
urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)