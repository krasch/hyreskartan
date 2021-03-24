function State() {
    this.rooms = {"1": false, "2": false, "3": false, "4": false, "5": false}
    this.apartmentType = {"standard": false, "youth": false, "student": false, "senior": false};
    this.additionalFilters = {"includeNewbuilds": false, "includeShortContracts": false}
    this.waitingTime = 0;
}

function getInitialState(){
    let state = new State();

    state.waitingTime = 5;

    // all apartment sizes should be initially selected
    state.rooms["1"] = true;
    state.rooms["2"] = true;
    state.rooms["3"] = true;
    state.rooms["4"] = true;
    state.rooms["5"] = true;

    // only "Vanlig hyresrätt" should be initially selected
    state.apartmentType["standard"] = true

    // korttid /short contracts should be disabled
    state.additionalFilters.includeShortContracts = false;

    // include nyproduktion / newbuilds
    state.additionalFilters.includeNewbuilds = true;

    return state;
}