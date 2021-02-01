function stadsdelStyle(feature) {
    const stadsdel = feature.properties.NAMN.toLowerCase();
    const count = counts[stadsdel];

    return {
        fillColor: color(count),
        weight: 1,
        opacity: 1,
        color: 'white',
        fillOpacity: 0.7
    };
}

function initLegend(position) {

    let legend = L.control({position: position});

    legend.onAdd = function (map) {

        const div = L.DomUtil.create('div', 'info legend');

        const entries = [];
        for (let entry of legendEntries()) {
            const styledEntry = '<i style="background:' + entry["color"] + '"></i>' + entry["label"];
            entries.push(styledEntry);
        }

        div.innerHTML = entries.reverse().join('<br>');
        return div;
    };

    return legend;
}

function tooltip(event){
    const name = event.feature.properties.NAMN.toLowerCase();
    const count = counts[name];
    return name + " " +count;
}

// initialize zoomed on Stockholm center
let map = L.map('map').setView([59.325,18.05], 11);

/*L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 14,
    attribution: '&copy; <a href="https://openstreetmap.org/copyright">OpenStreetMap contributors</a>'
}).addTo(map);*/

// zoom buttons
L.control.scale().addTo(map);

// boundaries for the stadsdelar
L.geoJson(stadsdelar, {style: stadsdelStyle}).bindTooltip(tooltip).addTo(map);

// legend...
initLegend("bottomright").addTo(map);
