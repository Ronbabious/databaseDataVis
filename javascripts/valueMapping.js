//var fs = require('fs');
import fs from 'fs'

//Helt almindeligt JSON object
dummyFood = {
    "": 1,
    "Unnamed: 0": 1,
    "Unnamed: 0.1": 1,
    "cost": 0.560078348,
    "foodName": "Shredded Wheat, bagged cereal",
    "popular": "",
    "CarbPlusFat": "",
    "ONIscore": "",
    "Group": "",
    "SatietyIndex": "",
    "InsulinIndex": "",
    "F6": "",
    "ND": "",
    "InsulinogenicV2": "",
    "NutrivoreScore": "",
    "Satiety": "",
    "group": "",
    "Protein": 11.2,
    "Fat": 2.01,
    "Carb": 81,
    "Calorie": 348
};

function sendDataToFile(data, foodNumber) {


    //Create empty array
    var arrayOfFoodObjects = [];
    //console.log(Object.keys(data)[1]);
    //console.log(Object.values(data)[1]);
    console.log("Length of object is: " + Object.keys(data).length);


    for (let i = 0; i < Object.keys(data).length; i++) {
        if (i != 0 && i != 6 && i != 11 && i != 8 && i != 15 && i != 2 && i != 1 && i != 4 && i != 16 && i != 5) {
            arrayOfFoodObjects.push({ "key": Object.keys(data)[i], "value": Object.values(data)[i], "category": foodNumber });
        };
    };

    console.log("foodObject is:  " + JSON.stringify(arrayOfFoodObjects));
    console.log("Length of new array is: " + arrayOfFoodObjects.length);

    return JSON.stringify(arrayOfFoodObjects)

}

//sendDataToFile(dummyFood, 0);

/*
export function mapValue(value) {
    return value * 100;
}*/