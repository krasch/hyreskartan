function initMap(){
    // initialize zoomed on Stockholm center
    let map = L.map('map').setView([59.325695,18.071869], 12);

    // add two additional "corners": verticalcenterleft and verticalcenterright
    addControlPlaceholders(map);

    /*L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 14,
    attribution: '&copy; <a href="https://openstreetmap.org/copyright">OpenStreetMap contributors</a>'
    }).addTo(map);*/

    // zoom buttons
    L.control.scale({"position": "bottomright"}).addTo(map);

    return map;
}

// prepare the base map
let map = initMap();

// initial apartment filter selection
let selection = getInitialSelection();

// boundaries for the stadsdelar
let polygons = new GeoJsonWrapper(stadsdelar).addTo(map);

// add control panel to change filter selection
// also gets reference to the polygons, so can update them whenever they change
L.control.customControlPanel({ position: 'verticalcenterleft', polygons: polygons, selection: selection}).addTo(map);

// add legend
initLegend("verticalcenterright").addTo(map);


