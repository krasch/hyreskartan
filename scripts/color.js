/* warning: you also have to change the legend in index.html if you change these constants here */
const GREY = "#f1f1f1";
const COLOURS = ["#c7e9c0", "#a1d99b","#74c476","#41ab5d", "#238b45", "#005a32"];
const WIDTH = 20;    // how wide is each colour interval (in number of förmedlade apartments)

const maxColourIndex = COLOURS.length -1;

function color(d) {
    if (d === 0)
        return GREY;

    let colourIndex = Math.floor(d / WIDTH);
    colourIndex = Math.min(colourIndex, maxColourIndex);

    return COLOURS[colourIndex];
}
