import embed from 'vega-embed'
import {sendDataToFile} from './valueMapping.js'
var scatterPlot = {
    "$schema": "https://vega.github.io/schema/vega-lite/v5.json",
    "width": 400,
    "height": 400,
    "padding": 10,
    "data": 
    {
        "url": "data/data.csv",
    },
    "transform": [{
        "filter": "datum.Protein > 0 && datum.ONIscore > 0 && datum.F6 != ''",
    }],
    "params": [{
            "name": "grid",
            "select": "interval",
            "bind": "scales",
        },
        {
            "name": "legendSelect",
            "select": { "type": "point", "fields": ["F6"] },
            "bind": "legend"
        },
    ],
    "mark": "point",
    "encoding": {
        "x": { "field": "ONIscore", "type": "quantitative", },
        "y": { "field": "Protein", "type": "quantitative" },
        "color": { "field": "F6", "type": "nominal" },
        "opacity": {
            "condition": { "param": "legendSelect", "value": 1 },
            "value": 0.2,
        },
        //"tooltip": {"content": "data"},
        "tooltip": [
            { "field": "foodName", "type": "nominal" },
            { "field": "Protein", "type": "nominal" },
            { "field": "Fat", "type": "nominal" },
            { "field": "Carb", "type": "nominal" },
            { "field": "Calorie", "type": "nominal" },
            { "field": "ONIscore", "type": "nominal" },
        ]
    }
}

await embed('#scatterPlot', scatterPlot).then(function(result){
  result.view.addEventListener('click',function(event,item){
  sendDataToFile(item.datum);
  console.log("Sending data to JSON file.");
  });
})

// vegaEmbed('#scatterPlot', scatterPlot, {tooltip: {theme:'dark'}})
// .then(function(result){
//   console.log(result.view);
//   result.view.addEventListener('mouseclick', function(event,item){
//   console.log(item);
//   })
// })
// .catch(console.error)