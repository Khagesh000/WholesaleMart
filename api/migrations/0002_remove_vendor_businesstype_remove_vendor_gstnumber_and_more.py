# Generated by Django 5.1.4 on 2025-02-10 18:56

from django.db import migrations


class Migration(migrations.Migration):
    dependencies = [
        ("api", "0001_initial"),
    ]

    operations = [
        migrations.RemoveField(
            model_name="vendor",
            name="businessType",
        ),
        migrations.RemoveField(
            model_name="vendor",
            name="gstNumber",
        ),
        migrations.RemoveField(
            model_name="vendor",
            name="shopDescription",
        ),
    ]
