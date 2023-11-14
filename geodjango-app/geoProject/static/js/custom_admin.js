// Define the Geolocalisation button
const geolocButton = document.createElement('button');
geolocButton.textContent = 'Geolocalisation';

// Add a click event listener to the button
geolocButton.addEventListener('click', () => {
  // Use the browser's Geolocation API to get the user's location
  navigator.geolocation.getCurrentPosition(position => {
    // Create a Leaflet map centered on the user's location
    const map = L.map('id_location_0').setView([position.coords.latitude, position.coords.longitude], 13);

    // Add a tile layer to the map
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors',
      maxZoom: 18,
    }).addTo(map);

    // Add a marker for the user's location
    L.marker([position.coords.latitude, position.coords.longitude]).addTo(map)
      .bindPopup('You are here!')
      .openPopup();
  });
});

// Add the Geolocalisation button to the Leaflet map container
const locationContainer = document.querySelector('#id_location-group');
if (locationContainer) {
  locationContainer.insertBefore(geolocButton, locationContainer.firstChild);
}
