function initLegend(position) {

    let legend = L.control({position: position});

    legend.onAdd = function (map) {

        const container = L.DomUtil.create('div', 'info legend');

        const title = L.DomUtil.create('div', "", container);
        title.innerHTML = texts["legend"][language];

        /* prepare HTML for entries */
        const entries = [];
        for (let entry of colorLegend()) {
            const styledEntry = '<i style="background:' + entry["color"] + '"></i>' + entry["label"];
            entries.push(styledEntry);
        }

        /* add HTML to container */
        const div = L.DomUtil.create('div', "", container);
        div.innerHTML = entries.reverse().join('<br>');

        return container;
    };

    return legend;
}
