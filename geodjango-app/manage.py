#!/usr/bin/env python
"""Django's command-line utility for administrative tasks."""
import os
import sys

# import atexit
# from apscheduler.schedulers.background import BackgroundScheduler
# import os.path
# import ntplib
# import schedule










def main():

    
    """Run administrative tasks."""
    os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'geoProject.settings')
    try:
        from django.core.management import execute_from_command_line
    except ImportError as exc:
        raise ImportError(
            "Couldn't import Django. Are you sure it's installed and "
            "available on your PYTHONPATH environment variable? Did you "
            "forget to activate a virtual environment?"
        ) from exc
    # scheduler = BackgroundScheduler()
    # scheduler.add_job(func=limit_time, trigger="interval", seconds=15)
    # scheduler.add_job(func=licof, trigger="interval", seconds=15)
    # scheduler.start()
    # atexit.register(lambda: scheduler.shutdown())
    execute_from_command_line(sys.argv)


if __name__ == '__main__':
    # os.system("cls")
    main()
