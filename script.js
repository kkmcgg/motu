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

// Function to add a new layer to the map
function addWmsLayer(wmsUrl, layerName) {
    var newLayer = new ol.layer.Tile({
        source: new ol.source.TileWMS({
            url: wmsUrl,
            params: {'LAYERS': layerName, 'TILED': true},
            serverType: 'geoserver', // Change as needed (e.g., 'mapserver')
            // crossOrigin: 'anonymous' // Setting crossOrigin
            crossOrigin: 'none' // Setting crossOrigin
        })
    });
    map.addLayer(newLayer);
    return newLayer;
}

// Function to create a new slider for the layer
function createLayerSlider(layer) {
    var sliderContainer = document.querySelector('.slider-container');
    var slider = document.createElement('input');
    slider.type = 'range';
    slider.min = 0;
    slider.max = 1;
    slider.step = 0.01;
    slider.value = layer.getOpacity();

    slider.className = 'vertical-slider'; // Assign a class, the css method is powerful but trash by default

    slider.oninput = function() {
        layer.setOpacity(parseFloat(this.value));
    };

    sliderContainer.appendChild(slider);

    // Move the plus button to be after the new slider
    var plusButton = document.getElementById('plus-button');
    sliderContainer.appendChild(plusButton);
}

document.getElementById('wms-form').addEventListener('submit', function(e) {
    e.preventDefault();
    var wmsUrl = document.getElementById('wms-url').value;
    var layerName = document.getElementById('layer-name').value;
    
    // Add the WMS layer
    var newLayer = addWmsLayer(wmsUrl, layerName);

    // Create a new slider for the layer
    createLayerSlider(newLayer);

    // Close the popup after submission
    document.getElementById('popup-form').style.display = 'none';
});

