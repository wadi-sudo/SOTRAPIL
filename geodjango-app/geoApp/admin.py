from django.contrib import admin

#from leaflet.admin import LeafletGeoAdmin

from .models import Location

from .models import Pipeline

from .models import Site


# admin.site.register(Location, LeafletGeoAdmin)
# admin.site.register(Pipeline, LeafletGeoAdmin)
# admin.site.register(Site, LeafletGeoAdmin)

admin.site.register(Location)
admin.site.register(Pipeline)
admin.site.register(Site)
