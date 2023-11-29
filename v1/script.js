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
