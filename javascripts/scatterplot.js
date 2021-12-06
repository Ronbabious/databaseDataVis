import { sendDataToFile } from '../javascripts/radarchart.js'
var scatterPlot = {
        "$schema": "https://vega.github.io/schema/vega-lite/v5.json",
        "title": "USDA Food Database",
        "data": {
          "url": "data/data.csv"
        },      
        "transform": [{
            "filter": "datum.ONIscore > 0 && datum.F6 != ''",
        }],
        "vconcat": [
          {
            "encoding": {
              "color": {
                "condition": {
                  "param": "brush",
                  "title": "Food Categories",
                  "field": "F6",
                  "type": "nominal",

                },
                "value": "gray"
              },
              "tooltip": [
                { "field": "foodName", "type": "nominal" },
                { "field": "Protein", "type": "nominal" },
                { "field": "Fat", "type": "nominal" },
                { "field": "Carb", "type": "nominal" },
                { "field": "Calorie", "type": "nominal" },
                { "field": "ONIscore", "type": "nominal" },
            ],
              "x": {
                "field": "Protein",
                "title": "Protein",
                "type": "quantitative"
              },
              "y": {
                "title": "ONIscore",
                "field": "ONIscore",
                "type": "quantitative"
              }
            },
            "width": 600,
            "height": 300,
            "mark": "point",
            "params": [
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
            "transform": [{"filter": {"param": "click"}}],

          },
          "hconcat": [
            {
            {
              "encoding": {
                "color": {
                  "condition": {
                    "param": "click",
                    "field": "F6",
                  },
                  "value": "gray"
                },
                "x": {"aggregate": "count", "type": "nominal"},
                "y": {"title": "Food Category", "field": ["Protein", "Fat", "Carb"]}
              },
              
              "width": 600,
              "mark": "bar",
              "params": [{
                "name": "click",
                "select": {"type": "point", "encodings": ["color"]}
              }],
              "transform": [{"filter": {"param": "brush"}}]
            },
            {
              "encoding": {
                "color": {
                  "condition": {
                    "param": "click",
                    "field": "F6",
                  },
                  "value": "gray"
                },
                "x": {"aggregate": "count", "type": "nominal"},
                "y": {"title": "Food Category", "field": ["Protein", "Fat", "Carb"]}
              },
              
              "width": 600,
              "mark": "bar",
              "params": [{
                "name": "click",
                "select": {"type": "point", "encodings": ["color"]}
              }],
              "transform": [{"filter": {"param": "brush"}}]
            }
      ]}
          {
            "encoding": {
              "color": {
                "condition": {
                  "param": "click",
                  "field": "F6",
                },
                "value": "gray"
              },
              "x": {"aggregate": "count", "type": "nominal"},
              "y": {"title": "Food Category", "field": "F6"}
            },
            
            "width": 600,
            "mark": "bar",
            "params": [{
              "name": "click",
              "select": {"type": "point", "encodings": ["color"]}
            }],
            "transform": [{"filter": {"param": "brush"}}]
          },
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