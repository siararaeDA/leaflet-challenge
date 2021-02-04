// Creating map object
var myMap = L.map("mapid", {
    center: [45.5128, -122.6796],
    zoom: 3
  });

// Adding tile layer
L.tileLayer("https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
    attribution: "© <a href='https://www.mapbox.com/about/maps/'>Mapbox</a> © <a href='http://www.openstreetmap.org/copyright'>OpenStreetMap</a> <strong><a href='https://www.mapbox.com/map-feedback/' target='_blank'>Improve this map</a></strong>",
    tileSize: 512,
    maxZoom: 18,
    zoomOffset: -1,
    id: "mapbox/streets-v11",
    accessToken: API_KEY
  }).addTo(myMap);

  // URL for all earthquakes in the last 30 days
  var url = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_month.geojson";

  // Function to return color
  function getColor(depth) {

  }

  // Function to return size
  function getSize(magnitude) {
      
  }

  // Get GeoJSON data and add styles to the map based on data
  d3.json(url).then(function(data) {
    L.geoJson(data, {
        style: function(feature) {
            return {
                color: "black",
                fillOpacity: 0,
                weight: 1.5
            };
        },

        onEachFeature: function(feature, layer) {
            layer.on({
                mouseover: function(event) {
                    layer = event.target;
                    layer.setStyle({
                        fillOpacity: 0.5
                    });
                },

                mouseout: function(event) {
                    layer = event.target;
                    layer.setStyle({
                        fillOpacity: 0
                    });
                }
            });

            layer.bindPopup("<h4>Provider: " + feature.properties.Hauler + "</h4> <p>Collection Day: " + feature.properties.Coll_Day + "</p><p>Phone Number: " + feature.properties.Phone_Num + "</p>");
        }
    }).addTo(myMap);
});