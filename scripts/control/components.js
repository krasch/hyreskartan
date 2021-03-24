function MultiCheckbox(container, name, initialState, layout="horizontal"){
    let innerContainer =  L.DomUtil.create("div", "control-element", container);

    let heading =  L.DomUtil.create("div", "control-header", innerContainer);
    heading.innerHTML = texts[name][language];

    let fieldset =  L.DomUtil.create("fieldset", "fieldset-"+layout, innerContainer);
    let inputs = []
    for (let value in initialState){
        // set up the label as a container for input and label string
        // this way, it is clear which label belongs to which input
        // (unfortunately label.for = input.id does not work)
        let label = L.DomUtil.create("label", null, fieldset);

        // the checkbox
        let input = L.DomUtil.create("input", null, label);
        input.type = "checkbox";
        input.name = name;
        input.value = value;
        input.id = "select-" + name + "-" + value;

        // the label text
        let text = L.DomUtil.create("span", null, label);
        text.innerHTML = texts[value][language];

        // is this checkbox pre-selected?
        if (initialState[value])
            input.checked = true;

        inputs.push(input);
    }

    this.getCurrentState = function(){
        let selection = {}
        for (let input of inputs){
            selection[input.value] = input.checked;
        }
        return selection;
    }
}


function SingleCheckbox(container, name, isInitiallyChecked){

    // convert the single boolean into the state format expected by MultiCheckbox
    let state = {};
    state[name] = isInitiallyChecked;

    // init a multicheckbox
    let checkbox = new MultiCheckbox(container, "other", state);

    this.getCurrentState = function(){
        // convert state back to single boolean
        let currentState = checkbox.getCurrentState();
        return currentState[name];
    }
}

function WaitingTimesSelection(container, name, initialValue) {

    // three rows of content will be put into this inner container
    let innerContainer =  L.DomUtil.create("div", "control-element", container);

    // 1. The heading
    let heading =  L.DomUtil.create("div", "control-header", innerContainer);
    heading.innerHTML = texts[name][language];

    // 2. The slider itself, with start and end label before and after
    let sliderArea = L.DomUtil.create("div", "slider-area", innerContainer);

    // 2a. start label
    let start =  L.DomUtil.create("span", "", sliderArea);
    start.innerHTML = "0&nbsp;"+texts["year"][language]; // &nbsp; to avoid newline

    // 2b. slider
    let slider = L.DomUtil.create("input", null, sliderArea);
    slider.type = "range";
    slider.min = 0;
    slider.max = 40;
    slider.step = 1;
    slider.value = initialValue;
    slider.name = name;

    // 2c. end label
    let end =  L.DomUtil.create("span", "", sliderArea);
    end.innerHTML = "40&nbsp;"+texts["year"][language];

    // 3. the text that displays the current selected value of the slider
    let info = L.DomUtil.create("div", "slider-info", innerContainer);

    let currentValue = L.DomUtil.create("span", "", info);
    currentValue.innerHTML = initialValue;

    let explanation = L.DomUtil.create("span", "", info);
    explanation.innerHTML = " " + texts["year"][language];

    // function that links together the slider with the display of the current value
    updateDisplayedValue = function (){
        currentValue.innerHTML = slider.value;
    }

    // whenever slider changes, slider info display should change
    L.DomEvent.on(container, "input", updateDisplayedValue, this);

    // call this function to safely remove the event handler
    this.removeHandler = function(){
        L.DomEvent.on(container, "input", updateDisplayedValue, this);
    }

    this.getCurrentState = function(){
        return slider.value;
    }
}



