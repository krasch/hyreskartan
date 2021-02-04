function initLegend(position) {

    let legend = L.control({position: position});

    legend.onAdd = function (map) {

        const div = L.DomUtil.create('div', 'info legend');

        const entries = [];
        for (let entry of colorLegend()) {
            const styledEntry = '<i style="background:' + entry["color"] + '"></i>' + entry["label"];
            entries.push(styledEntry);
        }

        div.innerHTML = entries.reverse().join('<br>');
        return div;
    };

    return legend;
}
