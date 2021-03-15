function MultiCheckbox(container, name, initialSelection){

    let innerContainer =  L.DomUtil.create("fieldset", "select-"+name, container);

    let inputs = []
    for (let value in initialSelection){
        // the checkbox
        let input = L.DomUtil.create("input", null, innerContainer);
        input.type = "checkbox";
        input.name = name;
        input.value = value;
        input.id = "select-" + name + "-" + value;

        // is this checkbox pre-selected?
        if (initialSelection[value])
            input.checked = true;

        // the label, todo set "for"
        let label = L.DomUtil.create("label", null, innerContainer);
        label.innerHTML = value;

        inputs.push(input);
    }

    this.getCurrentSelection = function(){
        let selection = {}
        for (let input of inputs){
            selection[input.value] = input.checked;
        }
        return selection;
    }
}


function SingleCheckbox(container, name, displayedName, isInitiallyChecked){

    let innerContainer =  L.DomUtil.create("fieldset", "select-"+name, container);

    let input = L.DomUtil.create("input", null, innerContainer);
    input.type = "checkbox";
    input.name = name;
    input.id = "select-" + name;

     // is this checkbox pre-selected?
    if (isInitiallyChecked)
        input.checked = true;

    // the label, todo set "for"
    let label = L.DomUtil.create("label", null, innerContainer);
    label.innerHTML = displayedName;

    this.getCurrentSelection = function(){
        return input.checked;
    }
}

function WaitingTimesSelection(container, name, initialValue) {

    initSlider = function(){
        let slider = L.DomUtil.create("input", null, container);
        slider.type = "range";
        slider.min = 0;
        slider.max = 20;
        slider.step = 2;
        slider.value = initialValue;
        slider.name = name;

        return slider;
    }

    initInfoDisplay = function(){
        let info = L.DomUtil.create("div", "", container);

        let explanation = L.DomUtil.create("span", "", info);
        explanation.innerHTML = "Waiting time (years): ";

        let currentValue = L.DomUtil.create("span", "", info);
        currentValue.innerHTML = initialValue;

        return currentValue;
    }

    // initialise
    let slider = initSlider();
    let info = initInfoDisplay();

    updateDisplayedValue = function (){
        info.innerHTML = slider.value;
    }

    // whenever slider changes, slider info display should change
    L.DomEvent.on(container, "input", updateDisplayedValue, this);

    // call this function to safely remove the event handler
    this.removeHandler = function(){
        L.DomEvent.on(container, "input", updateDisplayedValue, this);
    }

    this.getCurrentSelection = function(){
        return slider.value;
    }
}



