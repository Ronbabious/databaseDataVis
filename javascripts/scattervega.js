
var scatter = {
    "$schema": "https://vega.github.io/schema/vega/v5.json",
    "description": "A scatter plot of film statistics, with null values visualized along the axes.",
    "width": 450,
    "height": 450,
    "padding": 5,
    "autosize": {"type": "fit", "resize": true},
  
    "signals": [
      { "name": "yField", "value": "InsulinIndex",
        "bind": {"input": "select", "options": ["ONIscore", "SatietyIndex", "ND", "Satiety"]} },
      { "name": "xField", "value": "cost",
        "bind": {"input": "select", "options": ["Protein", "Fat", "Carb", "Calorie"]} },
      { "name": "nullSize", "value": 8 },
      { "name": "nullGap", "update": "nullSize + 10" }
      
    ],
  
    "data": [
      {
        "name": "foodData",
        "url": "data/dataVega.json",
        "transform": [
          {
            "type": "formula",
            "expr": "datum.foodName+datum.Protein",
            "as":   "tooltip"
          }
        ]
      },
      {
        "name": "valid",
        "source": "foodData",
        "transform": [
          {
            "type": "filter",
            "expr": "datum[xField] != null && datum[yField] != null"
          }
        ]
      },
      {
        "name": "nullXY",
        "source": "foodData",
        "transform": [
          {
            "type": "filter",
            "expr": "datum[xField] == null && datum[yField] == null"
          },
          { "type": "aggregate" }
        ]
      },
      {
        "name": "nullY",
        "source": "foodData",
        "transform": [
          {
            "type": "filter",
            "expr": "datum[xField] != null && datum[yField] == null"
          }
        ]
      },
      {
        "name": "nullX",
        "source": "foodData",
        "transform": [
          {
            "type": "filter",
            "expr": "datum[xField] == null && datum[yField] != null"
          }
        ]
      }
    ],
  
    "scales": [
      {
        "name": "yscale",
        "type": "linear",
        "range": [{"signal": "height - nullGap"}, 0],
        "nice": true,
        "domain": {"data": "valid", "field": {"signal": "yField"}}
      },
      {
        "name": "xscale",
        "type": "linear",
        "range": [{"signal": "nullGap"}, {"signal": "width"}],
        "nice": true,
        "domain": {"data": "valid", "field": {"signal": "xField"}}
      }
    ],
  
    "axes": [
      {
        "orient": "bottom", "scale": "xscale", "offset": 5, "format": "s",
        "title": {"signal": "xField"}
      },
      {
        "orient": "left", "scale": "yscale", "offset": 5, "format": "s",
        "title": {"signal": "yField"}
      }
    ],
  
    "marks": [
      {
        "type": "symbol",
        "from": {"data": "valid"},
        "encode": {
          "enter": {
            "size": {"value": 50},
            "tooltip": {"field": "tooltip"}
          },
          "update": {
            "x": {"scale": "xscale", "field": {"signal": "xField"}},
            "y": {"scale": "yscale", "field": {"signal": "yField"}},
            "fill": {"value": "steelblue"},
            "fillOpacity": {"value": 0.5},
            "zindex": {"value": 0}
          },
          "hover": {
            "fill": {"value": "firebrick"},
            "fillOpacity": {"value": 1},
            "zindex": {"value": 1}
          }
        }
      },
      {
        "type": "symbol",
        "from": {"data": "nullY"},
        "encode": {
          "enter": {
            "size": {"value": 50},
            "tooltip": {"field": "tooltip"}
          },
          "update": {
            "x": {"scale": "xscale", "field": {"signal": "xField"}},
            "y": {"signal": "height - nullSize/2"},
            "fill": {"value": "#aaa"},
            "fillOpacity": {"value": 0.2}
          },
          "hover": {
            "fill": {"value": "firebrick"},
            "fillOpacity": {"value": 1}
          }
        }
      },
      {
        "type": "symbol",
        "from": {"data": "nullX"},
        "encode": {
          "enter": {
            "size": {"value": 50},
            "tooltip": {"field": "tooltip"}
          },
          "update": {
            "x": {"signal": "nullSize/2"},
            "y": {"scale": "yscale", "field": {"signal": "yField"}},
            "fill": {"value": "#aaa"},
            "fillOpacity": {"value": 0.2},
            "zindex": {"value": 0}
          },
          "hover": {
            "fill": {"value": "firebrick"},
            "fillOpacity": {"value": 1},
            "zindex": {"value": 1}
          }
        }
      },
      {
        "type": "text",
        "interactive": false,
        "from": {"data": "nullXY"},
        "encode": {
          "update": {
            "x": {"signal": "nullSize", "offset": -4},
            "y": {"signal": "height", "offset": 13},
            "text": {"signal": "datum.count + ' null'"},
            "align": {"value": "right"},
            "baseline": {"value": "top"},
            "fill": {"value": "#999"},
            "fontSize": {"value": 9}
          }
        }
      }
    ]
  }
vegaEmbed("#scatterPlot", scatter,)