/* Adds two new "corners": verticalcenterleft and verticalcenterright
 their actual placing is done in css
 see https://stackoverflow.com/questions/33614912/how-to-locate-leaflet-zoom-control-in-a-desired-position */
function addControlPlaceholders(map) {
    let corners = map._controlCorners;
    let l = 'leaflet-';
    let container = map._controlContainer;

    function createCorner(vSide, hSide) {
        var className = l + vSide + ' ' + l + hSide;
        corners[vSide + hSide] = L.DomUtil.create('div', className, container);
    }

    createCorner('verticalcenter', 'left');
    createCorner('verticalcenter', 'right');
}