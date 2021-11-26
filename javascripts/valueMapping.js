'use strict'
var fs = require('fs');

function addToRadarChart(data) {
    //Create empty array
    foodObject = [];

    for (let i = 0; i = data.length; i++) {
        if (data[i].key() !== "" || data[i].key() !== "CarbPlusFat" || data[i].key() !== "F6" || data[i].key() !== "Group" || data[i].key() !== "Satiety" || data[i].key() !== "Unnamed: 0" || data[i].key() !== "Unnamed: 0.1" || data[i].key() !== "foodName" || data[i].key() !== "group" || data[i].key() !== "popular" || data[i].key() !== "Symbol(vega_id)") {
            foodObject[i] = {
                "key": data[i].key(),
                "value": data[i].value(),
                "category": 0
            }
        }
    }

    fs.writeFile("data/radarChartData.json", foodObject, function(err) {
        if (err) {
            console.log(err);
        }
    });

}



export function mapValue(value) {
    return value * 100;
}