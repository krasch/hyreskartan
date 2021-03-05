function dictFromTwoArrays(keys, values){
    let dict = {};
    for (let i =0; i < keys.length; i++){
        dict[keys[i]] = values[i];
    }
    return dict;
}

// todo move to some init or just export as dict
for (let row_index in counts["index"])
    counts["index"][row_index] = dictFromTwoArrays(counts["names"], counts["index"][row_index]);

function* getMatchingRows(selection){
    for (let rowId in counts["index"]){
        let row = counts["index"][rowId];
        if (selection.matches(row))
            yield rowId;
    }
}


function lookupWaitingTimes(selection) {
    //console.time('someFunction')
    let matchingRows = Array.from(getMatchingRows(selection));
    //console.timeEnd('someFunction')

    let waitingTimes = {}
    for (let area in counts["data"]) {
        waitingTimes[area] = 0;

        for (let rowId of matchingRows){
            waitingTimes[area] += counts["data"][area][rowId][selection.waitingTime];
        }
    }

    return waitingTimes;
}
