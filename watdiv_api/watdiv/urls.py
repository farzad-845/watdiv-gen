from django.urls import path

from .views import WatDivGenerator, FileDownloader

urlpatterns = [
    path('generate/', WatDivGenerator.as_view(), name='watdiv-generate'),
    path('download/', FileDownloader.as_view(), name='watdiv-download'),
]
