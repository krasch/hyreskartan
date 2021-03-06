function dictFromTwoArrays(keys, values){
    let dict = {};
    for (let i =0; i < keys.length; i++){
        dict[keys[i]] = values[i];
    }
    return dict;
}

function createDataIndex(){
    for (let row_index in counts["index"])
        counts["index"][row_index] = dictFromTwoArrays(counts["names"], counts["index"][row_index]);
}