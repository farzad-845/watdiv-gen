import os
import uuid
import subprocess

from datetime import datetime
from celery import shared_task
from django.core.mail import send_mail


def generate_datetime_uuid_folder_name():
    # Generate a random UUID
    unique_id = str(uuid.uuid4())

    # Get the current date and time
    current_datetime = datetime.now().strftime("%Y%m%d_%H%M%S")

    # Combine the UUID and datetime for the folder name
    folder_name = f"{current_datetime}_{unique_id}"
    return folder_name


@shared_task()
def generate_dataset_queries(file_path):
    folder_name = f"/app/static/{generate_datetime_uuid_folder_name()}"
    os.makedirs(folder_name, exist_ok=True)
    try:
        # Run the Docker command and capture output
        result = subprocess.call(
            f"/opt/watdiv/bin/Release/generate-bulk.sh -s 1 -q 10 -r 1 -o {folder_name} -m {file_path}",
            cwd="/opt/watdiv/bin/Release/",
            shell=True,
            stdout=subprocess.PIPE,
        )
        # print the results of the command
        return folder_name

    except subprocess.CalledProcessError as e:
        # Handle errors if the command fails and print the traceback
        print(f"Error: {e}")
        print(e.stderr.decode('utf-8'))
        return "Error"


@shared_task()
def send_results(folder_name, email):
    if folder_name == "Error":
        subject = 'WatDiv Query Generator | Error'
        message = f"""
            An error occurred while generating your dataset, 
            Please try again later.
        """
    else:
        subject = 'WatDiv Query Generator | Dataset Ready'
        message = f"""
            Your dataset is ready for download, 
            Please visit the following link to download your dataset:
            http://localhost:8087/api/v1/download/
            {folder_name}
        """
    from_email = 'watdiv.gen@gmail.com'
    recipient_list = [email]
    send_mail(subject, message, from_email, recipient_list)


