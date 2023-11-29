// Initialize the map
var map = new ol.Map({
    target: 'map',
    layers: [
        new ol.layer.Tile({
            source: new ol.source.OSM()
        })
    ],
    view: new ol.View({
        center: [0, 0], // Coordinates for the initial view
        zoom: 2
    })
});

// Slider functionality
document.getElementById('layer-opacity').addEventListener('input', function() {
    map.getLayers().item(0).setOpacity(parseFloat(this.value));
});

document.getElementById('plus-button').addEventListener('click', function() {
    document.getElementById('popup-form').style.display = 'block';
});

document.getElementsByClassName('close-btn')[0].addEventListener('click', function() {
    document.getElementById('popup-form').style.display = 'none';
});

document.getElementById('wms-form').addEventListener('submit', function(e) {
    e.preventDefault();
    var wmsUrl = document.getElementById('wms-url').value;
    var layerName = document.getElementById('layer-name').value;
    // Add your logic here to use the WMS URL and layer name
    console.log("WMS URL: " + wmsUrl + ", Layer Name: " + layerName);

    // Close the popup after submission
    document.getElementById('popup-form').style.display = 'none';
});