# Generated by Django 5.2 on 2025-06-08 22:43

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('accounts', '0002_remove_user_username_alter_user_email'),
    ]

    operations = [
        migrations.AddField(
            model_name='annoncecolocproposeur',
            name='additional_photos',
            field=models.JSONField(blank=True, default=list),
        ),
        migrations.AddField(
            model_name='annonceproprietaire',
            name='additional_photos',
            field=models.JSONField(blank=True, default=list),
        ),
    ]
