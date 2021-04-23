const maxWaitingTime = 40;


function sumDictValues(dict){
    return Object.values(dict).reduce((a, b) => a + b);
}

function stateWithEverythingSelected(){
    return {
        apartmentType: {standard: true, youth: true, student: true, senior: true},
        rooms: {1: true, 2: true, 3: true, 4: true, 5: true},
        additionalFilters: {includeNewbuilds: true, includeShortContracts: true},
        waitingTime: maxWaitingTime
    }

}


function testAreas(database){
    const expected = {"abrahamsberg": 7, "akalla": 42, "aspudden": 57, "bagarmossen": 104, "bandhagen": 157,
        "beckomberga": 65, "björkhagen": 28, "blackeberg": 158, "bredäng": 209, "bromsten": 12, "djurgården": 4,
        "enskede gård": 19, "enskededalen": 11, "enskedefältet": 3, "fagersjö": 30, "farsta": 247, "farsta strand": 95,
        "flysta": 1, "fredhäll": 9, "fruängen": 32, "gamla enskede": 44, "gamla stan": 12, "grimsta": 192, "gröndal": 67,
        "gubbängen": 110, "hagsätra": 111, "hammarbyhöjden": 46, "hjorthagen": 153, "husby": 288, "hägersten": 132,
        "hägerstensåsen": 53, "hässelby gård": 172, "hässelby strand": 118, "hässelby villastad": 17, "högdalen": 92,
        "hökarängen": 426, "johanneshov": 41, "kista": 416, "kristineberg": 24, "kungsholmen": 199, "kärrtorp": 47,
        "ladugårdsgärdet": 112, "larsboda": 8, "liljeholmen": 201, "lilla essingen": 27, "långbro": 13, "långholmen": 2,
        "marieberg": 17, "mariehäll": 275, "midsommarkransen": 82, "mälarhöjden": 5, "nockebyhov": 6,
        "norra djurgården": 95, "norra ängby": 37, "norrmalm": 48, "nälsta": 1, "reimersholme": 1, "riksby": 14,
        "rinkeby": 237, "råcksta": 173, "rågsved": 131, "skarpnäcks gård": 29, "skärholmen": 42, "sköndal": 83,
        "solberga": 135, "solhem": 24, "stadshagen": 148, "stureby": 71, "svedmyra": 29, "sätra": 63, "södermalm": 776,
        "södra hammarbyhamnen": 177, "tallkrogen": 260, "tensta": 351, "traneberg": 24, "ulvsunda": 3,
        "ulvsunda industriområde": 24, "vasastaden": 231, "vinsta": 2, "vällingby": 115, "västberga": 202,
        "västertorp": 60, "vårberg": 103, "älvsjö": 242, "äppelviken": 3, "åkeslund": 18, "årsta": 101, "örby": 1,
        "örby slott": 8, "östberga": 9, "östermalm": 42}

    // everything is selected
    let selection = stateWithEverythingSelected();
    let actual = database.lookup(selection);

    // every expected area should show up in actual
    for (let area in expected)
        console.assert(area in actual)

    // every actual area should should be in expected
    for (let area in actual)
        console.assert(area in expected)

    // counts should match
    for (let area in actual)
        console.assert(actual[area] === expected[area]);
}


function testYears(database){
    const expected = {"0": 0, "1": 237, "2": 475, "3": 769, "4": 1108, "5": 1551, "6": 2056, "7": 2667, "8": 3498,
        "9": 4387, "10": 5166, "11": 5973, "12": 6633, "13": 7194, "14": 7733, "15": 8085, "16": 8295, "17": 8390,
        "18": 8485, "19": 8553, "20": 8619, "21": 8686, "22": 8726, "23": 8758, "24": 8776, "25": 8785, "26": 8802,
        "27": 8823, "28": 8837, "29": 8846, "30": 8860, "31": 8875, "32": 8889, "33": 8901, "34": 8902, "35": 8906,
        "36": 8908, "37": 8910, "38": 8910, "39": 8911, "40": 8911}


    let selection = stateWithEverythingSelected();

    for (let years=0; years<=maxWaitingTime; years+=1){
        selection.waitingTime = years + 1;
        let actual = sumDictValues(database.lookup(selection));
        console.assert(actual === expected[years], "Mismatch at years=" + years);
    }
}

function testRooms(database){
    const expected = {"1": 3923, "2": 2903, "3": 1605, "4": 420, "5": 60}

    function unselectAllRooms(selectionLocal){
        for (let numRooms in expected)
            selectionLocal.rooms[numRooms] = false;
        return selectionLocal;
    }

    let selection = stateWithEverythingSelected();

    // run with every room individually selected
    for (let numRooms in expected){
        // only select this room number
        selection = unselectAllRooms(selection);
        selection.rooms[numRooms] = true;

        let actual = sumDictValues(database.lookup(selection));
        console.assert(actual === expected[numRooms], "Mismatch at numRooms=" + numRooms);
    }

    // combination of some room numbers (to make sure things are summed up properly)
    selection = unselectAllRooms(selection);
    selection.rooms[1] = true;
    selection.rooms[4] = true;
    let actual = sumDictValues(database.lookup(selection));
    console.assert(actual === (expected[1] + expected[4]), "Mismatch at numRooms combination");

}

function testApartmentType(database){
    const expected = {"senior": 104, "standard": 5344, "student": 2199, "youth": 1264};

    function unselectAllApartmentTypes(selectionLocal){
        for (let apartmentType in expected)
            selectionLocal.apartmentType[apartmentType] = false;
        return selectionLocal;
    }

    let selection = stateWithEverythingSelected();

    // run with every apartment type individually selected
    for (let apartmentType in expected){
        // only select this apartment type
        selection = unselectAllApartmentTypes(selection);
        selection.apartmentType[apartmentType] = true;

        let actual = sumDictValues(database.lookup(selection));
        console.assert(actual === expected[apartmentType], "Mismatch at apartmentType=" + apartmentType);
    }

    // combination of some apartmentTypes (to make sure things are summed up properly)
    selection = unselectAllApartmentTypes(selection);
    selection.apartmentType.youth = true;
    selection.apartmentType.senior = true;
    let actual = sumDictValues(database.lookup(selection));
    console.assert(actual === (expected["youth"] + expected["senior"]), "Mismatch at apartmentType combination");
}

function testIncludeNewbuild(database){
    const expected = {"false": 7402, "true": 1509}

    let selection = stateWithEverythingSelected();

    // new buildings are included (-> both "false" and "true" are relevant")
    let actual = sumDictValues(database.lookup(selection));
    console.assert(actual === (expected["false"] + expected["true"]), "Mismatch when including nyproduktion")

    // new buildings are excluded (-> onyl "false" is relevant")
    selection.additionalFilters.includeNewbuilds = false;
    actual = sumDictValues(database.lookup(selection));
    console.assert(actual === expected["false"], "Mismatch when not including nyproduktion");
}

function testIncludeShortContracts(database){
    const expected = {"false": 7364, "true": 1547}

    let selection = stateWithEverythingSelected();

    // short contracts are included (-> both "false" and "true" are relevant")
    let actual = sumDictValues(database.lookup(selection));
    console.assert(actual === (expected["false"] + expected["true"]), "Mismatch when including korttid")

    // short contracts are excluded (-> onyl "false" is relevant")
    selection.additionalFilters.includeShortContracts = false
    actual = sumDictValues(database.lookup(selection));
    console.assert(actual === expected["false"], "Mismatch when not including korttid");
}

function testCombination(database){
    const expected = {"0": 0, "1": 1, "2": 1, "3": 5, "4": 9, "5": 16, "6": 25, "7": 35, "8": 44, "9": 86, "10": 116,
        "11": 151, "12": 188, "13": 234, "14": 266, "15": 301, "16": 324, "17": 334, "18": 345, "19": 354, "20": 361,
        "21": 369, "22": 372, "23": 375, "24": 377, "25": 377, "26": 378, "27": 379, "28": 382, "29": 383, "30": 384,
        "31": 385, "32": 387, "33": 391, "34": 391, "35": 391, "36": 391, "37": 391, "38": 391, "39": 391, "40": 391}


    let selection = {
        apartmentType: {standard: true, youth: true, student: true, senior: false},
        rooms: {1: false, 2: false, 3: false, 4: true, 5: true},
        additionalFilters: {includeNewbuilds: true, includeShortContracts: false},
    }

    for (let years=0; years<=maxWaitingTime; years+=1){
        selection.waitingTime = years + 1;
        let actual = sumDictValues(database.lookup(selection));
        console.assert(actual === expected[years], "Combination mismatch at years=" + years);
    }
}

function runTests(database){
    testAreas(database);
    testYears(database);
    testRooms(database);
    testApartmentType(database);
    testIncludeNewbuild(database);
    testIncludeShortContracts(database);
    testCombination(database);
    console.log("All tests done");
}





