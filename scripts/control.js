function setupEventListeners(handler){

    // range
    let rangeInput = document.getElementById("control-waitingTime");
    let rangeOutputToday = document.getElementById("control-waitingTime-info-today");
    let rangeOutputHistorical = document.getElementById("control-waitingTime-info-historical");

    function displayRangeValue(){
        let valueToday = rangeInput.value;
        let valueHistorical = rangeInput.value -1;
        if (valueHistorical < 0)
            valueHistorical = 0;

        rangeOutputToday.innerHTML = valueToday;
        rangeOutputHistorical.innerHTML = valueHistorical;
    }

    rangeInput.oninput = e => {displayRangeValue(); handler(e);};

    // checkboxes
    for (let element of ["control-apartmentType", "control-rooms", "control-additionalFilters"])
        document.getElementById(element).onclick = handler;

}

function getFieldsetState(fieldset){
    let state = {};
    for (let element of fieldset.elements)
        state[element.value] = element.checked;
    return state;
}

function getCurrentSettingsFromControlPanel(){
    let selection = {};

    let waitingTime = document.getElementById("control-waitingTime");
    selection["waitingTime"] = waitingTime.value;

    let apartmentTypeFieldset = document.getElementById("control-apartmentType");
    selection["apartmentType"] = getFieldsetState(apartmentTypeFieldset);

    let roomsFieldset = document.getElementById("control-rooms");
    selection["rooms"] = getFieldsetState(roomsFieldset);

    let additionalFiltersFieldset = document.getElementById("control-additionalFilters");
    selection["additionalFilters"] = getFieldsetState(additionalFiltersFieldset);

    return selection;
}