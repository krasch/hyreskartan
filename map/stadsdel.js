function matches(row, settings){
    return settings.rooms.includes(row.rooms)
        && settings.queue.includes(row.queue)
        && settings.apartmentType.includes(row.apartmentType)
        && settings.buildingType.includes(row.buildingType);
}

function stadsdelStyle(feature, settings) {
    const stadsdel = feature.properties.NAMN.toLowerCase();

    let count = 0;
    for (let i in counts.index){
        if (counts.index[i].stadsdel !== stadsdel)
            continue

        if (!matches(counts.index[i], settings))
            continue

        count += counts.data[i][settings.waitingTime];
    }


    feature.properties.count = count;

    return {
        fillColor: color(count),
        weight: 1,
        opacity: 1,
        color: 'white',
        fillOpacity: 0.7
    };
}


function bla(feature, layer){

    /*layer.on('mouseover', function (e) {
    layer.setStyle({
        fillOpacity: 0.4
    });
    });
    layer.on('mouseout', function (e) {
        layer.setStyle({
            fillOpacity: 0
        });
    });*/
}

function changeColor(bla){
    console.log(bla);
}

function tooltip(event){
    const name = event.feature.properties.NAMN.toLowerCase();
    const count = event.feature.properties.count;
    return name + " " +count;

}
