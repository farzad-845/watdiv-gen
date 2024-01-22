from __future__ import absolute_import, unicode_literals

import os

from celery import Celery
from celery.schedules import crontab

os.environ.setdefault('DJANGO_SETTINGS_MODULE', '_base.settings')

app = Celery('WatDivAPI')

# Using a string here means the worker don't have to serialize
# the configuration object to child processes.
# - namespace='CELERY' means all celery-related configuration keys
#   should have a `CELERY_` prefix.
app.config_from_object('django.conf:settings', namespace='CELERY')

# Load task modules from all registered Django app configs.
app.autodiscover_tasks()

# timezone
app.conf.timezone = 'Europe/Rome'

app.conf.task_default_queue = 'default'
app.conf.accept_content = ['json']

app.conf.task_routes = {
    'watdiv.tasks.*': {'queue': 'watdiv'},
}
app.conf.update(
    CELERY_ACCEPT_CONTENT=['json'],
    CELERY_TASK_SERIALIZER='json',
    CELERY_RESULT_SERIALIZER='json',
)
app.conf.beat_schedule = {

    # 'reportage.tasks.generate_scrapyd_task_for_publishers_to_extract_links': {
    #     'task': 'reportage.tasks.scrapyd_task_generator.generate_scrapyd_task_for_publishers_to_extract_links',
    #     'schedule': crontab(hour=2, minute=0)
    # },

}


@app.task(bind=True)
def debug_task(self):
    print('Request: {0!r}'.format(self.request))
