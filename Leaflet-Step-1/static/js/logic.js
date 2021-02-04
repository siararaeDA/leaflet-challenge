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

// Create map
var myMap = L.map("mapid", {
    center: [
    37.09, -95.71
    ],
    zoom: 5,
    layers: [darkmap]
});

// Create a layer control
L.control.layers(baseMaps).addTo(myMap);
  
// URL for all earthquakes in the last day
var url = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_day.geojson";

// Function to return color
function getSize(depth) {
    return (depth * 10);
}

// Function to return size
function getColor(magnitude) {
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
    
    L.geoJSON(data, {
        pointToLayer: function(feature, latlng) {
            return L.circleMarker(latlng);
        },
        style: function(feature) {
            return {
                fillColor: getColor(feature.geometry.coordinates[2]),
                radius: getSize(feature.properties.mag),
                weight: 0.5,
                opacity: 1,
                color: "#000",
                fillOpacity: 0.8
            }
        },
        onEachFeature: function(feature, marker) {
            marker.bindPopup("<h2>" + feature.properties.place +
            "</h2><hr><h4>Magnitude: " + feature.properties.mag + "</h4><h4>Significance: " + 
            feature.properties.sig + "</h4><h4>Date: " + new Date(feature.properties.time) + "</h4>")
        } 
    }).addTo(myMap);

    // Add legend


});