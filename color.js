// brewer purples
const grey = "#dddddd"
const colors = ["#fcfbfd", "#f0eef6","#dedded","#c6c6e1","#abaad1","#918dc2","#796eb2","#65489f","#52238d","#3f007d"];

// width = 25 with 9 colours
const width = 25;

const maxColourIndex = colors.length -1;

function color(d) {
    if (d === undefined)
        return grey

    if (d === 0)
        return grey

    let colourIndex = Math.floor(d / width);
    colourIndex = Math.min(colourIndex, maxColourIndex)

    return colors[colourIndex];
}

function* legendEntries() {
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

