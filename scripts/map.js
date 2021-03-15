function initMap(){
    // initialize zoomed on Stockholm center
    let map = L.map('map').setView([59.325695,18.071869], 12);

    // add two additional "corners": verticalcenterleft and verticalcenterright
    addControlPlaceholders(map);

    /*let x = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 14,
    attribution: '&copy; <a href="https://openstreetmap.org/copyright">OpenStreetMap contributors</a>'
    }).addTo(map);
    x.options.opacity = 0.4;*/

    // zoom buttons
    L.control.scale({"position": "bottomright"}).addTo(map);

    return map;
}

// prepare the base map
let map = initMap();

// initial apartment filter selection
let selection = getInitialSelection();

// todo get rid of "counts" global variable
createDataIndex();

// boundaries for the stadsdelar
let polygons = new GeoJsonWrapper(stadsdelar).addTo(map);

L.geoJson(vatten, {className: "vatten"}).addTo(map);
L.geoJson(kommuner, {className: "kommun"}).addTo(map);
L.geoJson(stockholm, {className: "stockholm"}).addTo(map);

// add control panel to change filter selection
// also gets reference to the polygons, so can update them whenever they change
L.control.customControlPanel({ position: 'verticalcenterleft', updateMap: polygons.update, selection: selection}).addTo(map);

// add legend
//initLegend("verticalcenterright").addTo(map);


