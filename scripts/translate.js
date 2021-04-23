const texts = {
    "title": {"sv": "Var har jag chans att få hyresrätt i Stockholm?",
        "en": "Where could I get a rental apartment in Stockholm?"},
    "subtitle": {"sv": "Denna kartan visar hur många hyresrätter som förmedlades genom Stockholms Bostadsförmedling under 2020. " +
            "Använd kartan för att kolla om du har chans att få en lägenhet i ditt favoritområde.",
        "en": "This map shows how many apartments were allocated through Stockholms Bostadsförmedling in 2020. " +
             "Use this map to check if you would have a chance to get an apartment in your favourite area."},
    "explanation": {"sv": "Färgarna visar hur många lägenheter du hade haft god chans att få om du hade anmält intresse. Dessa " +
        "lägenheter matchar alla dina sökkriterier och förmedlades under 2020 till personer som då hade samma " +
        "eller kortare kötid än du.",
        "en": "The colours show how many apartments you would have had a good chance of getting, if you had registered " +
            "your interest in them. These apartments match your search criteria and were rented to people that in 2020 had the same or a shorter " +
            "waiting time than you."

    },
    "legend": {"sv": "Antalet matchande lägenheter du hade haft god chans att få under 2020",
               "en": "Number of matching apartments you had a good chance of getting in 2020"},
    "tooltipBefore": {"sv": "", "en": ""},
    "tooltipAfter": {"sv": " matchande lägenheter du hade haft god chans att få under 2020",
                     "en": " matching apartments you would have had a good chance of getting in 2020"},
    // apartmentType
    "standard": {"sv": "Vanlig hyresrätt", "en": "Standard hyresrätt"},
    "student": {"sv": "Student", "en": "Student"},
    "youth": {"sv": "Ungdom", "en": "Youth"},
    "senior": {"sv": "Senior", "en": "Senior"},
    // additional filters
    "includeShortContracts": {"sv": "Inkludera korttidskontrakt", "en": "Include short contracts"},
    "includeNewbuilds": {"sv": "Inkludera nyproduktion", "en": "Include newbuilds"},
    // headings
    "rooms": {"sv": "Hur många rum?", "en": "How many rooms?"},
    "apartmentType": {"sv": "Vilken typ av lägenhet söker du?", "en": "Type of apartment?"},
    "waitingTime": {"sv": "Hur länge har du stått i Bostadskön (fram tills idag) ?", "en": "How long have you been on the bostadskö (until today) ?"},
    "additionalFilters": {"sv": "Övrigt", "en": "Other"},
    // random stuff
    "year1": {"sv": "år", "en": "years"},
    "year2": {"sv": "år", "en": "years"},
    "year3": {"sv": "år", "en": "year(s)"},
    "year4": {"sv": "år", "en": "year(s)"},
    "in": {"sv": "i", "en": "in"},
    "om-datan": {"sv": "Om datan", "en": "About the data"},
    "om-mig": {"sv": "Om krasch.io", "en": "About krasch.io"},
}

function setToEnglish(){
    LANGUAGE = "en";
    translate(LANGUAGE);

    const languageSwitcher = document.getElementById("select-language");
    languageSwitcher.innerText = "På svenska"
    languageSwitcher.onclick = setToSwedish;
}


function setToSwedish(){
    LANGUAGE = "sv";
    translate(LANGUAGE);

    const languageSwitcher = document.getElementById("select-language");
    languageSwitcher.innerText = "English version"
    languageSwitcher.onclick = setToEnglish;
}

function translate(language){
    for (let name in texts){
        const element = document.getElementById("text-"+name)
        if (element !== null)
            element.innerText = texts[name][language];
    }
}



