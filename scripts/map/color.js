const grey = "#eee";
const white = "white";

// brewer purples
const purples = ["#fcfbfd", "#f0eef6","#dedded","#c6c6e1","#abaad1","#918dc2","#796eb2","#65489f","#52238d","#3f007d"];
const yellowGreens = ["#ffffe5", "#f7fcb9", "#d9f0a3", "#addd8e", "#78c679", "#41ab5d", "#238443", "#006837", "#004529"];
const greens = ["#e5f5e0", "#c7e9c0", "#a1d99b", "#74c476","#41ab5d","#238b45","#006d2c","#00441b"]; // removed #f7fcf5 because too light
const colors = greens;

// how wide is each colour interval (in number of förmedlade apartments)
const width = 25;

const maxColourIndex = colors.length -1;

function color(d) {
    if (d === 0)
        return white;

    let colourIndex = Math.floor(d / width);
    colourIndex = Math.min(colourIndex, maxColourIndex)

    return colors[colourIndex];
}

function* colorLegend() {
    for (let i=0; i<colors.length - 1; i++){
        const lowerBound = i*width;
        const upperBound = (i+1)*width;
        const label = lowerBound + "-" + upperBound;
        yield {"color": colors[i], "label": label};
    }

    // last entry behaves slightly differently
    const lastEntryIndex = colors.length -1;
    const maxUpperBound = lastEntryIndex * width;
    yield {"color": colors[lastEntryIndex], "label": ">=" + maxUpperBound}
}

