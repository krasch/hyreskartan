L.Control.WaitingTimesSlider = L.Control.extend({

    // constructor
    initialize: function(options){
        // propagate things like position of the slider
        L.setOptions(this, options);

        // the polygons in this layer will be changed whenever one of the settings has changed
        this.stadsdelar = options.layer;

        // these are the possible values in the control panel
        this.possible = options.possibleValues;

        // initialize all the settings with default values
        this.selected = options.initialValues;
    },

    onAdd: function(map) {
        let container = L.DomUtil.create("div", "custom-control");

        // if not doing this, map will pan when moving the slider
        L.DomEvent.disableClickPropagation(container);

        // slider to select waiting years
        let slider = this._initWaitingTimeSelector(container, this.selected.waitingTime);

        this._addMultiSelect(container, "rooms", this.possible.rooms, this.selected.rooms);
        this._addMultiSelect(container, "apartmentType", this.possible.apartmentType, this.selected.apartmentType);
        this._addMultiSelect(container, "buildingType", this.possible.buildingType, this.selected.buildingType);


        L.DomEvent.on(container, "input", function(ev){
            const input = ev.target;

            if (input.type === "checkbox"){
                if (input.checked)
                    this.selected[input.name] = addToArray(this.selected[input.name], input.value)
                else
                    this.selected[input.name] = removeFromArray(this.selected[input.name], input.value)
            }
            else if (input.type === "range"){
                this.selected[input.name] = input.value;
            }
            else
                throw new Error("Unknown input " + input.type);

            //console.log(ev.target);
            //console.log(ev.target.value);
            //this.selected.waitingTime = ev.target.value;
            this.updateMapColors();
        }, this);

        this.updateMapColors();
        return container;
    },

    onRemove: function(map) {
      // todo remove events
    },

    updateMapColors: function() {
        this.stadsdelar.setStyle((feature) => stadsdelStyle(feature, this.selected));
    },

    // utility function to set the values
    _initWaitingTimeSelector: function(container, initialValue) {
        let slider = L.DomUtil.create("input", null, container);
        slider.type = "range";
        slider.min = 0;
        slider.max = 20;
        slider.step = 2;
        slider.value = initialValue;
        slider.name = "waitingTime";

        // todo this is terrible
        let info = L.DomUtil.create("div", "", container);
        let explanation = L.DomUtil.create("span", "", info);
        explanation.innerHTML = "Waiting time (years): ";
        let currentValue = L.DomUtil.create("span", "", info);
        currentValue.innerHTML = initialValue;

        L.DomEvent.on(slider, "input", e => currentValue.innerHTML=e.target.value);

        return slider;
    },

    _addMultiSelect: function(container, name, values, initialValues) {
        let innerContainer =  L.DomUtil.create("fieldset", "select-"+name, container);
        for (let value of values){
            // the checkbox
            let input = L.DomUtil.create("input", null, innerContainer);
            input.type = "checkbox";
            input.name = name;
            input.value = value;
            input.id = "select-" + name + "-" + value;

            // is this checkbox pre-selected?
            if (initialValues.includes(value))
                input.checked = true;

            if (["buildingType"].includes(name))
                input.disabled = true;  // not supported for now

            // the label, todo set "for"
            let label = L.DomUtil.create("label", null, innerContainer);
            label.innerHTML = value;
        }

    }
});

L.control.waitingTimesSlider = function(opts) {
    return new L.Control.WaitingTimesSlider(opts);
}
