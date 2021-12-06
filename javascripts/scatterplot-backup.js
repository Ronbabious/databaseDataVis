import { sendDataToFile } from '../javascripts/radarchart.js'
var scatterPlot = {
    "$schema": "https://vega.github.io/schema/vega-lite/v5.json",
    "width":1000,
    "height" : {"step": 1},
    "repeat": {
        "row": ["Satiety", "ONIscore"],
        "column": ["Protein", "Fat"],
    },
    "spec" : {
        "width": 250,
        "height": 250,
        "data": 
        {
            "url": "data/data.csv",
        },
        "transform": [{
            "filter": "datum.Protein > 0 && datum.ONIscore > 0 && datum.F6 != ''",
        }],
        "mark": "circle",
        "params": [
            {
                "name": "legendSelect",
                "select": { "type": "point", "fields": ["F6"] },
                "bind": "legend"
            },
            {
                "name": "brush",
                "select": {
                "type": "interval",
                "resolve": "union",
                "on": "[mousedown[event.shiftKey], window:mouseup] > window:mousemove!",
                "translate": "[mousedown[event.shiftKey], window:mouseup] > window:mousemove!",
                "zoom": "wheel![event.shiftKey]"
                }
            },
            {
                "name": "grid",
                "select": {
                    "type": "interval",
                    "resolve": "global",
                    "translate": "[mousedown[!event.shiftKey], window:mouseup] > window:mousemove!",
                    "zoom": "wheel![!event.shiftKey]"
                  },               
                   "bind": "scales",
            },
        ],
        "encoding": {
            "x": { "field": {"repeat": "column"}, "type": "quantitative", },
            "y": {
                "field": {"repeat": "row"},
                "type": "quantitative"
                }, 
                "color": {
                    // "field": "F6",
                    //  "type": "nominal",
                    //  "select": "interval"
                    "legend": {"orient": "bottom", "titleOrient": "top"},
                    "condition" : {
                        "param": "legendSelect",
                        "field": 'F6',
                        "type": "nominal",
                        "scheme": "dark2"
                    },
                    "value":"gray"
                },
                "tooltip": [
                    { "field": "foodName", "type": "nominal" },
                    { "field": "Protein", "type": "nominal" },
                    { "field": "Fat", "type": "nominal" },
                    { "field": "Carb", "type": "nominal" },
                    { "field": "Calorie", "type": "nominal" },
                    { "field": "ONIscore", "type": "nominal" },
                ],
            },
            // "opacity": {
            //     "condition": { "param": "legendSelect", "value": 1 },
            //     "value": 0.2,
            // },
            //"tooltip": {"content": "data"},
        }
    }


await vegaEmbed('#scatterPlot', scatterPlot).then(function(result){
  console.log(result.view.addEventListener('click',function(event,item){
  sendDataToFile(item.datum,1);    
  console.log("Sending data to JSON file.");
  }));
})

// vegaEmbedModule('#scatterPlot', scatterPlot, {tooltip: {theme:'dark'}})
// .then(function(result){
//   console.log(result.view);
//   result.view.addEventListener('mouseclick', function(event,item){
//   console.log(item);
//   })
// })
// .catch(console.error)