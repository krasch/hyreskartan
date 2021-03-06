function selectionMatchesRow(selection, row){
    // todo only during development
    console.assert(JSON.stringify(Object.keys(selection).sort()) === JSON.stringify(Object.keys(row).concat("waitingTime").sort()))
    console.assert(selection.rooms[row.rooms] !== undefined);  // this room number is known
    console.assert(selection.apartmentType[row.apartmentType]  !== undefined);  // this apartment type is known

    // if korttid is selected, return flats that are korttid and flats that are not korttid
    // if korttid is not selected, only return flats that are not korttid
    if (selection.korttid === false && row.korttid === true)
            return false

    // same with nyproduktion
    if (selection.nyproduktion === false && row.nyproduktion === true)
            return false

    // this apartmentType/number of rooms was selected
    return selection.rooms[row.rooms] === true
        && selection.apartmentType[row.apartmentType] === true;
}

console.log(counts["index"]);

function* getMatchingRows(selection){
    for (let rowId in counts["index"]){
        let row = counts["index"][rowId];
        //console.log(row);
        //console.log(selection);
        //console.log(selection.matches(row))
        if (selectionMatchesRow(selection, row))
            yield rowId;
    }
}


function lookupWaitingTimes(selection) {
    //console.time('someFunction')
    let matchingRows = Array.from(getMatchingRows(selection));
    if (matchingRows.length === 0)
        console.error("NO MATCHING ROWS FOUND, THIS CAN'T BE RIGHT")
    //console.timeEnd('someFunction')

    let waitingTimes = {}
    for (let area in counts["data"]) {
        waitingTimes[area] = 0;

        for (let rowId of matchingRows){
            waitingTimes[area] += counts["data"][area][rowId][selection.waitingTime];
        }


        // mariehäll good for checking that nyproduktion works correctly
        /*if (area === "södermalm"){
            let all = Array(21).fill(0);
            for (let rowId of matchingRows){
                for (let colId in all)
                    all[colId] += counts["data"][area][rowId][colId];
            }
            console.log(all);
        }*/
    }

    return waitingTimes;
}
