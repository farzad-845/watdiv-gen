import os

from rest_framework.views import APIView
from wsgiref.util import FileWrapper

from django.conf import settings
from django.http import HttpResponse


class FileDownloader(APIView):
    http_method_names = ['get']

    # permission_classes = [IsAuthenticated]
    # authentication_classes = [TokenAuthentication]

    @staticmethod
    def get(request):
        filename = f"{settings.BASE_DIR}/static/20240116_183702_28060590-da47-4fe0-9617-e2edd2988488/dataset.nt"
        wrapper = FileWrapper(open(filename, 'rb'))
        response = HttpResponse(wrapper, content_type='text/plain')
        response['Content-Disposition'] = 'attachment; filename=%s' % os.path.basename(filename)
        response['Content-Length'] = os.path.getsize(filename)
        return response
