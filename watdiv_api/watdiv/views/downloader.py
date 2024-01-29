import os

from rest_framework.response import Response
from rest_framework.views import APIView
from wsgiref.util import FileWrapper

from django.conf import settings
from django.http import HttpResponse


class FileDownloader(APIView):
    http_method_names = ['get']

    # permission_classes = [IsAuthenticated]
    # authentication_classes = [TokenAuthentication]

    @staticmethod
    def get(request, filename):
        # get the file name from the request
        filename = f"{settings.BASE_DIR}/static/{filename}/dataset.tar.gz"
        # check if the file exists or not
        if not os.path.exists(filename):
            return Response({
                'error': 'File not found'
            }, status=404)
        wrapper = FileWrapper(open(filename, 'rb'))
        response = HttpResponse(wrapper, content_type='application/gzip')
        response[
            'Content-Disposition'
        ] = f'attachment; filename={os.path.basename(filename)}'
        response['Content-Length'] = os.path.getsize(filename)
        return response
