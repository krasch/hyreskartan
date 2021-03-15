function GeoJsonWrapper(polygons){
    function name(feature){
        return feature.properties.NAMN.toLowerCase();
    }

    function initialStyle(feature, layer){
        return {
            fillColor: color(0),
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

    function tooltip(event){
        const count = event.feature.properties.count;
        return name(event.feature) + " " +count;
    }

    function updateColor(feature){
        return {
            fillColor: color(feature.properties.count),
        };
    }


    layer = L.geoJson(polygons, {onEachFeature: bla, className: "stadsdel"}).bindTooltip(tooltip);

    // just some sugar to make this behave like L.geoJson
    this.addTo = function(map){
        layer.addTo(map);
        return this;
    }

    this.update = function(selection){
        let currentCounts = lookupWaitingTimes(selection);

        // is there a way outside setStyle to overwrite feature values?
        layer.setStyle(function(feature){
            if (currentCounts[name(feature)] === undefined)
                feature.properties.count = 0;
            else
                feature.properties.count = currentCounts[name(feature)];
            return updateColor(feature);
        });

    }
}