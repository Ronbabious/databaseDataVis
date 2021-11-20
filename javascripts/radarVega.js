var radarChart = {
    "$schema": "https://vega.github.io/schema/vega-lite/v5.json",
    "data": {"url": "data/data.csv"},
    "mark": "bar",
    "encoding": {
      "x": {
        "field": "foodName",
        "type": "nominal",
        "axis" : {"labelAngle": 90} 
      },
      "y": {
        "field": "Calorie",
         "type": "quantitative"},
    }
  }
  
  vegaEmbed('#radarChart', radarChart)