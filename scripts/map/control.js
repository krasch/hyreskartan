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


L.Control.CustomControlPanel = L.Control.extend({

    // constructor
    initialize: function(options){
        // propagate things like position of the slider
        L.setOptions(this, options);

        // the polygons in this layer will be changed whenever one of the settings has changed
        this.polygons = options.polygons;

        // initial values for the controls
        this.selection = options.selection;

        // references to the controls will be stored here
        this.controls = {};

        // the div where we will place all the controls
        this.container = null;

    },

    onAdd: function(map) {
        this.container = L.DomUtil.create("div", "custom-control");

        // if not doing this, map will pan when moving the slider
        L.DomEvent.disableClickPropagation(this.container);

        // slider to select waiting years
        this.controls["waitingTime"] = new WaitingTimesSelection(this.container, "waitingTime", this.selection.waitingTime);

        // add selectors for the other possible settings
        this.controls["rooms"] = new MultiCheckbox(this.container, "rooms", this.selection.rooms);
        this.controls["apartmentType"] = new MultiCheckbox(this.container, "apartmentType", this.selection.apartmentType);
        this.controls["buildingType"] = new MultiCheckbox(this.container, "buildingType", this.selection.buildingType);

        // wire up the event handler
        L.DomEvent.on(this.container, "input", this.onInputChange, this);

        // prepare function to remove event handler when this control is removed
        this.removeHandler = () => L.DomEvent.off(this.container, "input", onInputChange, this);

        // redraw the map
        this.polygons.update(this.selection);

        return this.container;
    },

    onRemove: function(map) {
        this.removeHandler();
        this.controls["waitingTime"].removeHandler();
    },

    onInputChange: function(event){
        let name = event.target.name;

        // get the current values from the control element that changed
        let updatedSelection = this.controls[name].getCurrentSelection();

        // and set them in the global "selection" object
        this.selection[name] = updatedSelection;

        // redraw the map
        this.polygons.update(this.selection);
    },

});

L.control.customControlPanel = function(opts) {
    return new L.Control.CustomControlPanel(opts);
}


/* Adds two new "corners": verticalcenterleft and verticalcenterright
 their actual placing is done in css
 see https://stackoverflow.com/questions/33614912/how-to-locate-leaflet-zoom-control-in-a-desired-position */
function addControlPlaceholders(map) {
    let corners = map._controlCorners;
    let l = 'leaflet-';
    let container = map._controlContainer;

    function createCorner(vSide, hSide) {
        var className = l + vSide + ' ' + l + hSide;
        corners[vSide + hSide] = L.DomUtil.create('div', className, container);
    }

    createCorner('verticalcenter', 'left');
    createCorner('verticalcenter', 'right');
}