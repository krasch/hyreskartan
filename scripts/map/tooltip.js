function getTooltip(event){
    function formatName(feature){
        let name = feature.properties.NAMN.toLowerCase();
        let nameCapitalized = name.charAt(0).toUpperCase() + name.slice(1);

        if (nameCapitalized.startsWith("Ulvsunda industriomr"))
            nameCapitalized = "Ulvsunda industriområde";

        return nameCapitalized;
    }

    const count = event.feature.properties.count;
    const name = formatName(event.feature);

    const header = "<h1> " + name + "</h1> ";
    const text = texts["tooltipBefore"][language] + "<strong>"+count+"</strong>" + texts["tooltipAfter"][language];

    return "<div class='tooltip'>" + header + "<span>" + text + "</span>" + "</div>";
}