L.Control.CustomControlPanel = L.Control.extend({

    // constructor
    initialize: function(options){
        // propagate things like position of the slider
        L.setOptions(this, options);

        // function to trigger map update
        this.updateMap = options.updateMap;

        // initial values for the controls
        this.state = options.state;

        // references to the controls will be stored here
        this.controls = {};

        // the div where we will place all the controls
        this.container = null;

    },

    onAdd: function(map) {
        this.container = L.DomUtil.create("div", "custom-control");

        // if not doing this, map will pan when moving the slider
        L.DomEvent.disableClickPropagation(this.container);

        //const title = L.DomUtil.create("h1", "custom-control", this.container);
        //title.innerHTML = "Bla"

        // slider to select waiting years
        this.controls["waitingTime"] = new WaitingTimesSelection(this.container, "waitingTime", this.state.waitingTime);

        // add selectors for the other possible settings
        this.controls["apartmentType"] = new MultiCheckbox(this.container, "apartmentType", this.state.apartmentType);
        this.controls["rooms"] = new MultiCheckbox(this.container, "rooms", this.state.rooms);
        this.controls["additionalFilters"] = new MultiCheckbox(this.container, "additionalFilters", this.state.additionalFilters);
        /*this.controls["includeShortContracts"] = new SingleCheckbox(this.container, "includeShortContracts", this.state.includeShortContracts);
        this.controls["includeNewbuilds"] = new SingleCheckbox(this.container, "includeNewbuilds", this.state.includeNewbuilds);*/

        // wire up the event handler
        L.DomEvent.on(this.container, "input", this.onInputChange, this);

        // prepare function to remove event handler when this control is removed
        this.removeHandler = () => L.DomEvent.off(this.container, "input", onInputChange, this);

        // redraw the map
        this.updateMap(this.state);

        return this.container;
    },

    onRemove: function(map) {
        this.removeHandler();
        this.controls["waitingTime"].removeHandler();
    },

    onInputChange: function(event){
        let name = event.target.name;

        // get the current values from the control element that changed
        let updatedState = this.controls[name].getCurrentState();

        // and set them in the global "selection" object
        this.state[name] = updatedState;

        // redraw the map
        this.updateMap(this.state);
    },

});

L.control.customControlPanel = function(opts) {
    return new L.Control.CustomControlPanel(opts);
}

