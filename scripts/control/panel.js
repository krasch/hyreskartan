L.Control.CustomControlPanel = L.Control.extend({

    // constructor
    initialize: function(options){
        // propagate things like position of the slider
        L.setOptions(this, options);

        // function to trigger map update
        this.updateMap = options.updateMap;

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
        this.controls["korttid"] = new SingleCheckbox(this.container, "korttid", "inkludera korttid", this.selection.korttid);
        this.controls["nyproduktion"] = new SingleCheckbox(this.container, "nyproduktion", "inkludera nyproduktion", this.selection.nyproduktion);

        // wire up the event handler
        L.DomEvent.on(this.container, "input", this.onInputChange, this);

        // prepare function to remove event handler when this control is removed
        this.removeHandler = () => L.DomEvent.off(this.container, "input", onInputChange, this);

        // redraw the map
        this.updateMap(this.selection);

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
        this.updateMap(this.selection);
    },

});

L.control.customControlPanel = function(opts) {
    return new L.Control.CustomControlPanel(opts);
}

