var scatterPlot = {
    "$schema": "https://vega.github.io/schema/vega-lite/v5.json",
    "width": 400,
    "height": 400,
    "padding": 10,
    "data": {"url": "data/data.csv"},
    "transform": [{
      "filter": "datum.Carb > 0 && datum.ONIscore > 0 && datum.F6 != ''"
    }],
    "params": [{
      "name":"grid",
      "select": "interval",
      "bind": "scales",
    }],
    "mark": "point",
    "encoding": {
      "x": {"field": "ONIscore","type": "quantitative",},
      "y": {"field": "Carb", "type": "quantitative"},
      "color": {"field": "F6", "type": "nominal"},
      "tooltip": {"field": "foodName", "type": "nominal"},
      }
    }
    vegaEmbed('#scatterPlot', scatterPlot)
