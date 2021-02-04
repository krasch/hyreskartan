/* https://stackoverflow.com/questions/33614912/how-to-locate-leaflet-zoom-control-in-a-desired-position */
function addControlPlaceholders(map) {
    var corners = map._controlCorners,
        l = 'leaflet-',
        container = map._controlContainer;

    function createCorner(vSide, hSide) {
        var className = l + vSide + ' ' + l + hSide;

        corners[vSide + hSide] = L.DomUtil.create('div', className, container);
    }

    createCorner('verticalcenter', 'left');
    createCorner('verticalcenter', 'right');
}


function addToArray(array, value){
    if (array.includes(value)){
        console.log("WTF??")
    }
    array.push(value);
    return array;
}

function removeFromArray(array, value){
    if (!array.includes(value)){
        console.log("WTF?????");
    }
    array = array.filter(valueInArray =>  valueInArray !== value);
    return array;
}
