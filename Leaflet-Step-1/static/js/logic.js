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
    return depth * 5;
  }

  // Function to return size
  function getSize(magnitude) {
    if (magnitude < 1) {
        return "#270394";
    } else if (magnitude < 2) {
        return "#5202ad";
    } else if (magnitude < 3) {
        return "#8a02c4";
    } else if (magnitude < 4) {
        return "#db02db";
    } else if (magnitude < 5) {
        return "#f7199e"
    } else {
        return "#eb495c";
    }
  }

  // Get GeoJSON data and add styles to the map based on data
  d3.json(url).then(function(data) {
    console.log(data.features);
    // Save data to variable for overlay layer
    var earthquakes = L.geoJson(data.features);

    // Add different map types
    var streetmap = L.tileLayer("https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
        attribution: "© <a href='https://www.mapbox.com/about/maps/'>Mapbox</a> © <a href='http://www.openstreetmap.org/copyright'>OpenStreetMap</a> <strong><a href='https://www.mapbox.com/map-feedback/' target='_blank'>Improve this map</a></strong>",
        tileSize: 512,
        maxZoom: 18,
        zoomOffset: -1,
        id: "mapbox/streets-v11",
        accessToken: API_KEY
    });

    var darkmap = L.tileLayer("https://api.mapbox.com/styles/v1/mapbox/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
        attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
        maxZoom: 18,
        id: "dark-v10",
        accessToken: API_KEY
    });

    // Define a baseMaps object to hold our base layers
    var baseMaps = {
        "Street Map": streetmap,
        "Dark Map": darkmap
    };

    // Create overlay object to hold our overlay layer
    var overlayMaps = {
        Earthquakes: earthquakes
    };
});