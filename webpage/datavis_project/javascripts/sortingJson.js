const fs = require('fs')
var _ = require('underscore')
var previous;
var next;
foodNameArray = []
testObject = {}
var newObject;
var jsonOjbect;
fs.readFile('/Users/aronelibaldvinsson/Desktop/dataVis/databaseDataVis/data.json','utf8', (err, data) =>{
    if(err) {
        console.error(err)
        return
    }
    //if(data.foodName == 'crab')
    var json = JSON.parse(data)
    previous = next = 0;
    jsonLength = Object.keys(json).length 
    //Creating foodName Array for indexing
    // for (let index = 0; index < jsonLength; index++) {
    //     foodNameArray.push(Object.keys(json))        
    // }

    Object.keys(json).forEach(k =>{ 
        //console.log("Key with value: " +k +" =" +json[k])
        newObject = json[k].reduce((acc, cur, idx) => {
            const newAcc = {...acc};
            for (let [key, val] of Object.entries(cur)) {
              if (!newAcc[key]) {
                newAcc[key] = val;
              } else {
                newAcc[key] = `${newAcc[key]},${val}`;
              }
            }
            return newAcc;
          });
          foodNameArray.push(newObject)
        })
        jsonOjbect = JSON.stringify(foodNameArray)
                fs.promises
                .writeFile('CsvMerge.json', jsonOjbect, {encoding: 'utf8'})
                .then(() => {
                    console.log("Done Saving");
                })
  })
    //Saving File with fsWrite
    // var groupedData = _.groupBy(json,function(food){return food.foodName})
    // var newData = JSON.stringify(groupedData)
    //   fs.promises
    //   .writeFile('csvToBeJSON', newData, {encoding: 'utf8'})
    //   .then(() => {
    //     console.log('Done saving');
    //   })

