function Selection() {
    this.queue = {"Bostadskön": false}
    this.rooms = {"1": false, "2": false, "3": false, "4": false, "5": false}
    this.apartmentType = {"Vanlig hyresrätt": false, "Ungdom": false, "Student": false, "Senior": false};
    this.buildingType = {"Gammal": false, "Nyproduktion": false}
    this.waitingTime = 0;

    this.matches = function (other) {
        return this.queue[other.queue]
            && this.rooms[other.rooms]
            && this.apartmentType[other.apartmentType]
            && this.buildingType[other.buildingType];
    }
}

function getInitialSelection(){
    let selection = new Selection();
    // there is only one queue right now
    selection.queue["Bostadskön"] = true;

    // all apartment sizes should be initially selected
    selection.rooms["1"] = true;
    selection.rooms["2"] = true;
    selection.rooms["3"] = true;
    selection.rooms["4"] = true;
    selection.rooms["5"] = true;

    // only "Vanlig hyresrätt" should be initially selected
    selection.apartmentType["Vanlig hyresrätt"] = true

    // only "Gammal" should be initially selected
    selection.buildingType["Gammal"] = true

    return selection;
}