function Selection() {
    this.rooms = {"1": false, "2": false, "3": false, "4": false, "5": false}
    this.apartmentType = {"Vanlig hyresrätt": false, "Ungdom": false, "Student": false, "Senior": false};
    this.korttid = false
    this.nyproduktion = false
    this.waitingTime = 0;
}

function getInitialSelection(){
    let selection = new Selection();

    selection.waitingTime = 0;

    // all apartment sizes should be initially selected
    selection.rooms["1"] = true;
    selection.rooms["2"] = true;
    selection.rooms["3"] = true;
    selection.rooms["4"] = true;
    selection.rooms["5"] = true;

    // only "Vanlig hyresrätt" should be initially selected
    selection.apartmentType["Vanlig hyresrätt"] = true

    // exclude korttid-apartments
    selection.korttid = false;

    // exclude nyproduktion
    selection.nyproduktion = true;

    return selection;
}