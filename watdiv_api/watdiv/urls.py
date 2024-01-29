from django.urls import path

from .views import WatDivGenerator, FileDownloader

urlpatterns = [
    path('generate/', WatDivGenerator.as_view(), name='watdiv-generate'),

    # get the file name from the endpoint
    path('download/<str:filename>', FileDownloader.as_view(), name='watdiv-download'),
]
