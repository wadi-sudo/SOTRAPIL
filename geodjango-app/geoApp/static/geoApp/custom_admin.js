(function($) {
    $(document).ready(function() {
        var map = $(".django-leaflet-map").leaflet('map');
        var geolocateControl = L.Control.extend({
            options: {
                position: 'topleft'
            },

            onAdd: function(map) {
                var container = L.DomUtil.create('div', 'leaflet-bar leaflet-control');
                var button = L.DomUtil.create('a', 'leaflet-bar-part leaflet-bar-part-single', container);
                button.href = '#';
                button.title = 'Geolocate';
                button.innerHTML = '<span class="fas fa-map-marker-alt"></span>';

                L.DomEvent.on(button, 'click', function() {
                    $.ajax({
                        url: '{{ geolocate_url }}',
                        type: 'POST',
                        data: {
                            csrfmiddlewaretoken: '{{ csrf_token }}'
                        },
                        success: function(response) {
                            var latlng = L.latLng(response.latitude, response.longitude);
                            map.setView(latlng, 16);
                            L.marker(latlng).addTo(map);
                        }
                    });
                });

                return container;
            }
        });

        map.addControl(new geolocateControl());
    });
})(django.jQuery);
