# Generated by Django 4.0.6 on 2022-07-18 12:34

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('wallets', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='wallet',
            name='approved_to',
            field=models.CharField(blank=True, max_length=255, null=True),
        ),
    ]
