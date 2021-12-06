function plotBarChart(data) {
    var barChart = {
      "$schema": "https://vega.github.io/schema/vega-lite/v5.json",
      "description": "A bar chart with negative values. We can hide the axis domain line, and instead use a conditional grid color to draw a zero baseline.",
      "data": {
          "url" : data
      },
      "mark": "bar",
      "encoding": {
        "x": {
          "field": "a", "type": "nominal",
          "axis": {
            "domain": false,
            "ticks": false,
            "labelAngle": 0,
            "labelPadding": 4
          }
        },
        "y": {
          "field": "b", "type": "quantitative",
          "axis": {
            "gridColor": {
              "condition": {"test": "datum.value === 0", "value": "black"},
              "value": "#ddd"
            }
          }
        }
      }
    }
vegaEmbed('#barChart', barChart)
    .then(function(result){
        console.log(result.view.addEventListener('click',function(event,item){
        //sendDataToFile(item.datum,1);
        //console.log("Sending data to JSON file.");
        }));
      })
}