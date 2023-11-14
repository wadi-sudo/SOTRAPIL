# This is an auto-generated Django model module.
# You'll have to do the following manually to clean this up:
#   * Rearrange models' order
#   * Make sure each model has one field with primary_key=True
#   * Make sure each ForeignKey and OneToOneField has `on_delete` set to the desired behavior
#   * Remove `managed = False` lines if you wish to allow Django to create, modify, and delete the table
# Feel free to rename the models, but don't rename db_table values or field names.
from django.db import models
#from django.contrib.gis.db import models


class Location(models.Model):
    mychoices = (('Bizerte', 'Bizerte'), ('Ben Arous', 'Ben Arous'),
                 ('Tunis', 'Tunis'), ('Manubah', 'Manubah'), ('Ariana', 'Ariana'))
    id = models.BigIntegerField(primary_key=True)
    #geom = models.PointField(blank=True, null=True)
    name1 = models.CharField(max_length=80, blank=True, null=True)
    type = models.CharField(max_length=80, blank=True, null=True)
    adm1 = models.CharField(max_length=80, blank=True,
                            null=True, choices=mychoices)
    time = models.DateField(blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'location'


class Pipeline(models.Model):
    mychoices = (('Bizerte', 'Bizerte'), ('Ben Arous', 'Ben Arous'),
                 ('Tunis', 'Tunis'), ('Manubah', 'Manubah'), ('Ariana', 'Ariana'))
    id = models.BigIntegerField(primary_key=True)
    #geom = models.MultiLineStringField(blank=True, null=True)
    name1 = models.CharField(max_length=50, blank=True, null=True)
    pdf = models.CharField(max_length=254, blank=True, null=True)
    adm1 = models.CharField(max_length=100, blank=True,
                            null=True, choices=mychoices)
    time = models.DateField(blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'pipeline'


class Site(models.Model):
    mychoices = (('Bizerte', 'Bizerte'), ('Ben Arous', 'Ben Arous'),
                 ('Tunis', 'Tunis'), ('Manubah', 'Manubah'), ('Ariana', 'Ariana'))
    id = models.BigIntegerField(primary_key=True)
    #geom = models.MultiPolygonField(blank=True, null=True)
    name1 = models.CharField(max_length=80, blank=True, null=True)
    time = models.DateField(blank=True, null=True)
    adm1 = models.CharField(max_length=80, blank=True,
                            null=True, choices=mychoices)

    class Meta:
        managed = False
        db_table = 'site'
