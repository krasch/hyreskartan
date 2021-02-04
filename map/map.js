const possibleValues = {
    queue: ["Bostadskön"],
    rooms: ["1", "2", "3", "4", "5+"],
    apartmentType: ["Vanlig hyresrätt", "Student", "Korttid", "Senior"],
    buildingType: ["Gammal", "Nyproduktion"]
}

const initialValues = {
    queue: ["Bostadskön"],
    rooms: ["1", "2", "3", "4", "5+"],
    apartmentType: ["Vanlig hyresrätt"],
    buildingType: ["Gammal"],
    waitingTime: 0
}


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

// boundaries for the stadsdelar
const layer = L.geoJson(stadsdelar, {onEachFeature: bla}).bindTooltip(tooltip).addTo(map);


// legend...
//initLegend("verticalcenterright").addTo(map);

L.control.waitingTimesSlider({ position: 'verticalcenterleft', layer: layer,
    possibleValues: possibleValues, initialValues: initialValues}).addTo(map);
