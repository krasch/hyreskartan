function _dictFromTwoArrays(keys, values) {
    let dict = {};
    for (let i = 0; i < keys.length; i++) {
        dict[keys[i]] = values[i];
    }
    return dict;
}

function WaitingTimesDatabase(rawCounts) {
    this.data = rawCounts.data;
    this.index = rawCounts.index.map(row => _dictFromTwoArrays(rawCounts.names, row));


    // does this row in the database match the selection?
    function isMatch(selection, row) {
        // if korttid is selected, return flats that are korttid and flats that are not korttid
        // if korttid is not selected, only return flats that are not korttid
        if (row.isShortContract && !selection.additionalFilters.includeShortContracts)
            return false

        // same with nyproduktion
        if (row.isNewbuild && !selection.additionalFilters.includeNewbuilds)
            return false

        // this apartmentType/number of rooms was selected
        return selection.rooms[row.rooms] === true
            && selection.apartmentType[row.apartmentType] === true;
    }

    this.getMatchingRowIds = function*(selection){
        for (let i in this.index)
            if (isMatch(selection, this.index[i]))
                yield i;
    }


    this.lookup = function (selection) {
        let matchingRows = Array.from(this.getMatchingRowIds(selection));

        // how long would the person have been on the waiting list in 2020?
        let waitingTimeIn2020 = selection.waitingTime - 1;
        if (waitingTimeIn2020 < 0)
            waitingTimeIn2020 = 0;

        let waitingTimes = {}
        for (let area in this.data) {
            waitingTimes[area] = 0;

            for (let rowId of matchingRows) {
                waitingTimes[area] += this.data[area][rowId][waitingTimeIn2020];
            }
        }

        return waitingTimes;
    }

    return this;
}