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
function getSize(magnitude) {
    return (magnitude * 5);
}

function getColor(depth) {
    if (depth < 10) {
        return "#eb495c";
    } else if (depth < 30) {
        return "#f7199e"
    } else if (depth < 50) {
        return "#db02db";
    } else if (depth < 70) {
        return "#8a02c4";
    } else if (depth < 90) {
        return "#5202ad";
    } else if (depth < 110) {
        return "#270394";
    } else {
        return "#0c1563";
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
    // Source: https://codepen.io/haakseth/pen/KQbjdO
    var legend = L.control({position: 'bottomright'});

    legend.onAdd = function(myMap) {
        var div = L.DomUtil.create("div", "legend");
        div.innerHTML += "<h2>Legend"
    }

});