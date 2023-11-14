# This is an auto-generated Django model module.
# You'll have to do the following manually to clean this up:
#   * Rearrange models' order
#   * Make sure each model has one field with primary_key=True
#   * Make sure each ForeignKey and OneToOneField has `on_delete` set to the desired behavior
#   * Remove `managed = False` lines if you wish to allow Django to create, modify, and delete the table
# Feel free to rename the models, but don't rename db_table values or field names.
from django.contrib.gis.db import models


class Adm1(models.Model):
    geom = models.MultiPolygonField(blank=True, null=True)
    id_0 = models.BigIntegerField(blank=True, null=True)
    iso = models.CharField(max_length=3, blank=True, null=True)
    name_0 = models.CharField(max_length=75, blank=True, null=True)
    id_1 = models.BigIntegerField(blank=True, null=True)
    name_1 = models.CharField(max_length=75, blank=True, null=True)
    type_1 = models.CharField(max_length=50, blank=True, null=True)
    engtype_1 = models.CharField(max_length=50, blank=True, null=True)
    nl_name_1 = models.CharField(max_length=50, blank=True, null=True)
    varname_1 = models.CharField(max_length=150, blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'adm1'


class Adm2(models.Model):
    geom = models.MultiPolygonField(blank=True, null=True)
    id_0 = models.BigIntegerField(blank=True, null=True)
    iso = models.CharField(max_length=3, blank=True, null=True)
    name_0 = models.CharField(max_length=75, blank=True, null=True)
    id_1 = models.BigIntegerField(blank=True, null=True)
    name_1 = models.CharField(max_length=75, blank=True, null=True)
    id_2 = models.BigIntegerField(blank=True, null=True)
    name_2 = models.CharField(max_length=75, blank=True, null=True)
    type_2 = models.CharField(max_length=50, blank=True, null=True)
    engtype_2 = models.CharField(max_length=50, blank=True, null=True)
    nl_name_2 = models.CharField(max_length=75, blank=True, null=True)
    varname_2 = models.CharField(max_length=150, blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'adm2'


class Location(models.Model):
    id = models.BigIntegerField(primary_key=True)
    geom = models.PointField(blank=True, null=True)
    name = models.CharField(max_length=80, blank=True, null=True)
    type = models.CharField(max_length=80, blank=True, null=True)
    adm1 = models.CharField(max_length=80, blank=True, null=True)
    time = models.DateField(blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'location'


class Pipeline(models.Model):
    id = models.BigIntegerField(primary_key=True)
    geom = models.MultiLineStringField(blank=True, null=True)
    adm1 = models.CharField(max_length=100, blank=True, null=True)
    pdf = models.CharField(max_length=254, blank=True, null=True)
    time = models.DateField(blank=True, null=True)
    name = models.CharField(max_length=50, blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'pipeline'


class RouteP(models.Model):
    geom = models.MultiLineStringField(blank=True, null=True)
    osm_id = models.CharField(max_length=12, blank=True, null=True)
    code = models.IntegerField(blank=True, null=True)
    fclass = models.CharField(max_length=28, blank=True, null=True)
    name = models.CharField(max_length=100, blank=True, null=True)
    ref = models.CharField(max_length=20, blank=True, null=True)
    oneway = models.CharField(max_length=1, blank=True, null=True)
    maxspeed = models.IntegerField(blank=True, null=True)
    layer = models.BigIntegerField(blank=True, null=True)
    bridge = models.CharField(max_length=1, blank=True, null=True)
    tunnel = models.CharField(max_length=1, blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'route_p'


class RouteS(models.Model):
    geom = models.MultiLineStringField(blank=True, null=True)
    osm_id = models.CharField(max_length=12, blank=True, null=True)
    code = models.IntegerField(blank=True, null=True)
    fclass = models.CharField(max_length=28, blank=True, null=True)
    name = models.CharField(max_length=100, blank=True, null=True)
    ref = models.CharField(max_length=20, blank=True, null=True)
    oneway = models.CharField(max_length=1, blank=True, null=True)
    maxspeed = models.IntegerField(blank=True, null=True)
    layer = models.BigIntegerField(blank=True, null=True)
    bridge = models.CharField(max_length=1, blank=True, null=True)
    tunnel = models.CharField(max_length=1, blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'route_s'


class Site(models.Model):
    id = models.BigIntegerField(primary_key=True)
    geom = models.MultiPolygonField(blank=True, null=True)
    name = models.CharField(max_length=80, blank=True, null=True)
    adm1 = models.CharField(max_length=80, blank=True, null=True)
    time = models.DateField(blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'site'


class Water(models.Model):
    geom = models.MultiLineStringField(blank=True, null=True)
    osm_id = models.CharField(max_length=12, blank=True, null=True)
    code = models.IntegerField(blank=True, null=True)
    fclass = models.CharField(max_length=28, blank=True, null=True)
    width = models.IntegerField(blank=True, null=True)
    name = models.CharField(max_length=100, blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'water'
