function initMap(){
    // initialize zoomed on Stockholm center
    let map = L.map('map').setView([59.33,17.93], 12);

    // add two additional "corners": verticalcenterleft and verticalcenterright
    addControlPlaceholders(map);

    /*let x = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 14,
    attribution: '&copy; <a href="https://openstreetmap.org/copyright">OpenStreetMap contributors</a>'
    }).addTo(map);
    x.options.opacity = 0.4;*/

    // zoom buttons
    map.zoomControl.setPosition('topright');

    // scale info
    L.control.scale({"position": "bottomright"}).addTo(map);

    initTitle("topleft").addTo(map);

    return map;
}
const language = "sv";

// prepare the base map
let map = initMap();

// initial apartment filter selection
let state = getInitialState();

// todo get rid of "counts" global variable
//createDataIndex();

// boundaries for the stadsdelar
let polygons = new GeoJsonWrapper(stadsdelar).addTo(map);

L.geoJson(vatten, {className: "vatten"}).addTo(map);
L.geoJson(kommuner, {className: "kommun"}).addTo(map);
L.geoJson(stockholm, {className: "stockholm"}).addTo(map);

// add control panel to change filter selection
// also gets reference to the polygons, so can update them whenever they change
L.control.customControlPanel({ position: 'verticalcenterleft', updateMap: polygons.update, state: state}).addTo(map);

// add legend
initLegend("verticalcenterright").addTo(map);

let title = document.getElementById("title");
title.innerHTML = texts["title"][language];

/*let subtitle = document.getElementById("subtitle");
subtitle.innerHTML = texts["subtitle"][language];*/


