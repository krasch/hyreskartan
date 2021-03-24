function initTitle(position) {

    let title = L.control({position: position});

    title.onAdd = function (map) {

        const container =  L.DomUtil.create("div", "title");

        //const h1 = L.DomUtil.create('h1', "", container);
        //h1.innerHTML = texts["title"][language];

        const h2 = L.DomUtil.create('h2', "", container);
        h2.innerHTML = texts["subtitle"][language];

        return container;
    };

    return title;
}
