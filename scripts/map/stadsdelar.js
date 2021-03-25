function GeoJsonWrapper(polygons){

    function updateColor(feature){
        return {
            fillColor: color(feature.properties.count),
        };
    }

    let layer = L.geoJson(polygons, {className: "stadsdel"}).bindTooltip(getTooltip);

    // just some sugar to make this behave like L.geoJson
    this.addTo = function(map){
        layer.addTo(map);
        return this;
    }

    this.update = function(selection){
        let currentCounts = lookupWaitingTimes(selection);

        // is there a way outside setStyle to overwrite feature values?
        layer.setStyle(function(feature){
            const name = feature.properties.NAMN.toLowerCase();
            if (currentCounts[name] === undefined)
                feature.properties.count = 0;
            else
                feature.properties.count = currentCounts[name];
            //console.log(feature.properties.count);
            return updateColor(feature);
        });
    }
}