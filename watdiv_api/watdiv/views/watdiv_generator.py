import re

from celery import chain
from django.conf import settings
from django.core.mail import send_mail
from rest_framework import status
from rest_framework.parsers import MultiPartParser, FormParser
from rest_framework.response import Response
from rest_framework.views import APIView

from watdiv.tasks import generate_dataset_queries, send_results


class WatDivGenerator(APIView):
    http_method_names = ['post']
    parser_classes = (MultiPartParser, FormParser)

    # permission_classes = [IsAuthenticated]
    # authentication_classes = [TokenAuthentication]

    @staticmethod
    def post(request):
        # get the email from the request
        file = request.data.get('file')
        email_address = request.data.get('email')

        email_regex = re.compile(r'\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}\b')
        if not email_regex.match(email_address):
            return Response({"error": "Invalid email address"}, status=status.HTTP_400_BAD_REQUEST)

        file_path = f"{settings.BASE_DIR}/schemas/{file.name}"
        with open(file_path, 'wb') as destination:
            for chunk in file.chunks():
                destination.write(chunk)
        chain(generate_dataset_queries.s(file_path), send_results.s(email_address)).apply_async()

        return Response({
            'message': "Dataset generation started, you will receive an email when it is ready, check your spam folder if you do not receive it in your inbox"
        }, status=status.HTTP_200_OK)
