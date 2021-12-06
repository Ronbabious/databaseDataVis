var scatterVega = {
        "$schema": "https://vega.github.io/schema/vega/v5.json",
        "description": "A scatter plot matrix of penguin data with interactive linked selections.",
        "padding": 10,
        "config": {
          "axis": {
            "tickColor": "#ccc"
          }
        },
      
        "signals": [
          { "name": "chartSize", "value": 200 },
          { "name": "chartPad", "value": 50 },
          { "name": "chartStep", "update": "chartSize + chartPad" },
          { "name": "width", "update": "chartStep * 4" },
          { "name": "height", "update": "chartStep * 4" },
          {
            "name": "cell", "value": null,
            "on": [
              {
                "events": "@cell:mousedown", "update": "group()"
              },
              {
                "events": "@cell:mouseup",
                "update": "!span(brushX) && !span(brushY) ? null : cell"
              }
            ]
          },
          {
            "name": "brushX", "value": 0,
            "on": [
              {
                "events": "@cell:mousedown",
                "update": "[x(cell), x(cell)]"
              },
              {
                "events": "[@cell:mousedown, window:mouseup] > window:mousemove",
                "update": "[brushX[0], clamp(x(cell), 0, chartSize)]"
              },
              {
                "events": {"signal": "delta"},
                "update": "clampRange([anchorX[0] + delta[0], anchorX[1] + delta[0]], 0, chartSize)"
              }
            ]
          },
          {
            "name": "brushY", "value": 0,
            "on": [
              {
                "events": "@cell:mousedown",
                "update": "[y(cell), y(cell)]"
              },
              {
                "events": "[@cell:mousedown, window:mouseup] > window:mousemove",
                "update": "[brushY[0], clamp(y(cell), 0, chartSize)]"
              },
              {
                "events": {"signal": "delta"},
                "update": "clampRange([anchorY[0] + delta[1], anchorY[1] + delta[1]], 0, chartSize)"
              }
            ]
          },
          {
            "name": "down", "value": [0, 0],
            "on": [{"events": "@brush:mousedown", "update": "[x(cell), y(cell)]"}]
          },
          {
            "name": "anchorX", "value": null,
            "on": [{"events": "@brush:mousedown", "update": "slice(brushX)"}]
          },
          {
            "name": "anchorY", "value": null,
            "on": [{"events": "@brush:mousedown", "update": "slice(brushY)"}]
          },
          {
            "name": "delta", "value": [0, 0],
            "on": [
              {
                "events": "[@brush:mousedown, window:mouseup] > window:mousemove",
                "update": "[x(cell) - down[0], y(cell) - down[1]]"
              }
            ]
          },
          {
            "name": "rangeX", "value": [0, 0],
            "on": [
              {
                "events": {"signal": "brushX"},
                "update": "invert(cell.datum.x.data + 'X', brushX)"
              }
            ]
          },
          {
            "name": "rangeY", "value": [0, 0],
            "on": [
              {
                "events": {"signal": "brushY"},
                "update": "invert(cell.datum.y.data + 'Y', brushY)"
              }
            ]
          },
          {
            "name": "cursor", "value": "'default'",
            "on": [
              {
                "events": "[@cell:mousedown, window:mouseup] > window:mousemove!",
                "update": "'nwse-resize'"
              },
              {
                "events": "@brush:mousemove, [@brush:mousedown, window:mouseup] > window:mousemove!",
                "update": "'move'"
              },
              {
                "events": "@brush:mouseout, window:mouseup",
                "update": "'default'"
              }
            ]
          }
        ],
      
        "data": [
          {
            "name": "foodData",
            "url": "data/dataVega.json",
            "transform": [
              {"type": "filter", "expr": "datum['Protein'] != null && datum['Fat'] != null && datum['Carb'] != null && datum['Calorie'] != null && datum['F6'] != ''"}
            ]
          },
          {
            "name": "fields",
            "values": [
              "Protein",
              "Fat",
              "Carb",
              "Calorie"
            ]
          },
          {
            "name": "cross",
            "source": "fields",
            "transform": [
              { "type": "cross", "as": ["x", "y"] },
              { "type": "formula", "as": "xscale", "expr": "datum.x.data + 'X'" },
              { "type": "formula", "as": "yscale", "expr": "datum.y.data + 'Y'" }
            ]
          }
        ],
      
        "scales": [
          {
            "name": "groupx",
            "type": "band",
            "range": "width",
            "domain": {"data": "fields", "field": "data"}
          },
          {
            "name": "groupy",
            "type": "band",
            "range": [{"signal": "height"}, 0],
            "domain": {"data": "fields", "field": "data"}
          },
          {
            "name": "color",
            "type": "ordinal",
            "domain": {"data": "foodData", "field": "F6"},
            "range": "category"
          },
      
          {
            "name": "ProteinX", "zero": false, "nice": true,
            "domain": {"data": "foodData", "field": "Protein"},
            "range": [0, {"signal": "chartSize"}]
          },
          {
            "name": "FatX", "zero": false, "nice": true,
            "domain": {"data": "foodData", "field": "Fat"},
            "range": [0, {"signal": "chartSize"}]
          },
          {
            "name": "CarbX", "zero": false, "nice": true,
            "domain": {"data": "foodData", "field": "Carb"},
            "range": [0, {"signal": "chartSize"}]
          },
          {
            "name": "CalorieX", "zero": false, "nice": true,
            "domain": {"data": "foodData", "field": "Calorie"},
            "range": [0, {"signal": "chartSize"}]
          },
      
          {
            "name": "ProteinY", "zero": false, "nice": true,
            "domain": {"data": "foodData", "field": "Protein"},
            "range": [{"signal": "chartSize"}, 0]
          },
          {
            "name": "FatY", "zero": false, "nice": true,
            "domain": {"data": "foodData", "field": "Fat"},
            "range": [{"signal": "chartSize"}, 0]
          },
          {
            "name": "CarbY", "zero": false, "nice": true,
            "domain": {"data": "foodData", "field": "Carb"},
            "range": [{"signal": "chartSize"}, 0]
          },
          {
            "name": "CalorieY", "zero": false, "nice": true,
            "domain": {"data": "foodData", "field": "Calorie"},
            "range": [{"signal": "chartSize"}, 0]
          }
        ],
      
        "axes": [
          {
            "orient": "left", "scale": "ProteinY", "minExtent": 25,
            "title": "Protein", "tickCount": 5, "domain": false,
            "position": {"signal": "3 * chartStep"}
          },
          {
            "orient": "left", "scale": "FatY", "minExtent": 25,
            "title": "Fat", "tickCount": 5, "domain": false,
            "position": {"signal": "2 * chartStep"}
          },
          {
            "orient": "left", "scale": "CarbY", "minExtent": 25,
            "title": "Carb", "tickCount": 5, "domain": false,
            "position": {"signal": "1 * chartStep"}
          },
          {
            "orient": "left", "scale": "CalorieY", "minExtent": 25,
            "title": "Calorie", "tickCount": 5, "domain": false
          },
          {
            "orient": "bottom", "scale": "ProteinX",
            "title": "Protein", "tickCount": 5, "domain": false,
            "offset": {"signal": "-chartPad"}
          },
          {
            "orient": "bottom", "scale": "FatX",
            "title": "Fat", "tickCount": 5, "domain": false,
            "offset": {"signal": "-chartPad"}, "position": {"signal": "1 * chartStep"}
          },
          {
            "orient": "bottom", "scale": "CarbX",
            "title": "Carb", "tickCount": 5, "domain": false,
            "offset": {"signal": "-chartPad"}, "position": {"signal": "2 * chartStep"}
          },
          {
            "orient": "bottom", "scale": "CalorieX",
            "title": "Calorie", "tickCount": 5, "domain": false,
            "offset": {"signal": "-chartPad"}, "position": {"signal": "3 * chartStep"}
          }
        ],
      
        "legends": [
          {
            "fill": "color",
            "title": "Food Category",
            "offset": 0,
            "encode": {
              "symbols": {
                "update": {
                  "fillOpacity": {"value": 0.5},
                  "stroke": {"value": "transparent"}
                }
              }
            }
          }
        ],
      
        "marks": [
          {
            "type": "rect",
            "encode": {
              "enter": {
                "fill": {"value": "#eee"}
              },
              "update": {
                "opacity": {"signal": "cell ? 1 : 0"},
                "x": {"signal": "cell ? cell.x + brushX[0] : 0"},
                "x2": {"signal": "cell ? cell.x + brushX[1] : 0"},
                "y": {"signal": "cell ? cell.y + brushY[0] : 0"},
                "y2": {"signal": "cell ? cell.y + brushY[1] : 0"}
              }
            }
          },
          {
            "name": "cell",
            "type": "group",
            "from": {"data": "cross"},
      
            "encode": {
              "enter": {
                "x": {"scale": "groupx", "field": "x.data"},
                "y": {"scale": "groupy", "field": "y.data"},
                "width": {"signal": "chartSize"},
                "height": {"signal": "chartSize"},
                "fill": {"value": "transparent"},
                "stroke": {"value": "#ddd"}
              },

            },
      
            "marks": [
              {
                "type": "symbol",
                "from": {"data": "foodData"},
                "interactive": false,
                "encode": {
                  "enter": {
                    "x": {
                      "scale": {"parent": "xscale"},
                      "field": {"datum": {"parent": "x.data"}}
                    },
                    "y": {
                      "scale": {"parent": "yscale"},
                      "field": {"datum": {"parent": "y.data"}}
                    },
                    "fillOpacity": {"value": 0.5},
                    "size": {"value": 36},
                    "tooltip": {
                        "signal": "{'FoodName' : format(datum, '0.1%')}"
                    }
                  },
                  "update": {
                    "fill": [
                      {
                        "fill": {"scale": "color", "field": "datum"},
                        "test": "!cell || inrange(datum[cell.datum.x.data], rangeX) && inrange(datum[cell.datum.y.data], rangeY)",
                        "scale": "color", "field": "F6"
                      },
                      {"value": "#ddd"}
                    ]
                  },
                  "hover": {"fill": {"value":"red"}},
                }
              }
            ]
          },
          {
            "type": "rect",
            "name": "brush",
            "encode": {
              "enter": {
                "fill": {"value": "transparent"}
              },
              "update": {
                "x": {"signal": "cell ? cell.x + brushX[0] : 0"},
                "x2": {"signal": "cell ? cell.x + brushX[1] : 0"},
                "y": {"signal": "cell ? cell.y + brushY[0] : 0"},
                "y2": {"signal": "cell ? cell.y + brushY[1] : 0"}
              }
            }
          }
        ]
      }
      vegaEmbed('#scatterPlot', scatterVega)
