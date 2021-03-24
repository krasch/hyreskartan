function GeoJsonWrapper(polygons){

    function formatName(feature){
        let name = feature.properties.NAMN.toLowerCase();
        let nameCapitalized = name.charAt(0).toUpperCase() + name.slice(1);

        if (nameCapitalized.startsWith("Ulvsunda industriomr"))
            nameCapitalized = "Ulvsunda industriområde";

        return nameCapitalized;
    }

    function getTooltipText(feature){
        const count = feature.properties.count;
        const name = formatName(feature);

        const header = "<h1> " + name + "</h1> ";
        const body = "<span>" + texts["tooltipBefore"][language] + "<strong>"+count+"</strong>" + texts["tooltipAfter"][language] +"</span>"

        return "<div class='tooltip'>" + header + body + "</div>";
    }

    function configureTooltip(feature, layer){
        const offset = {'offset': L.point(0,-50)}

        layer.on('mouseover', function (e) {
            layer.bindPopup(getTooltipText(feature), offset).openPopup();
        });

        layer.on('mouseout', function (e) {
            e.target.closePopup();
        });
    }

    function updateColor(feature){
        return {
            fillColor: color(feature.properties.count),
        };
    }


    let layer = L.geoJson(polygons, {className: "stadsdel", onEachFeature: configureTooltip});

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