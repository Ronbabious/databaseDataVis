/*         {
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
              "field": "Fat",
              "title": "Fat",
              "type": "quantitative"
          },
          "y": {
              "title": "ONIscore",
              "field": "ONIscore",
              "type": "quantitative"
          },
          },
          /*
          "width": 500,
          "height": 250,
          "mark": "circle",
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
        //Scatterplot #3
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
            "field": "Carb",
            "title": "Carbohydrates",
            "type": "quantitative"
        },
        "y": {
            "title": "ONIscore",
            "field": "ONIscore",
            "type": "quantitative"
        }
        },
        "width": 500,
        "height": 250, 
        "mark": "circle",
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
        //Scatterplot #4
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
              "field": "Calorie",
              "title": "Calories pr. 100 grams",
              "type": "quantitative"
          },
          "y": {
              "title": "ONIscore",
              "field": "ONIscore",
              "type": "quantitative"
          }
          },
          "width": 500,
          "height": 250, 
          "mark": "circle",
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
        //Scatterplot #5
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
            "field": "Calorie",
            "title": "Calories pr. 100 grams",
            "type": "quantitative"
        },
        "y": {
            "title": "ONIscore",
            "field": "ONIscore",
            "type": "quantitative"
        }
        },
        "width": 500,
        "height": 250,
        "mark": "circle",
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
        //Scatterplot #6
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
            "field": "Calorie",
            "title": "Calories pr. 100 grams",
            "type": "quantitative"
        },
        "y": {
            "title": "ONIscore",
            "field": "ONIscore",
            "type": "quantitative"
        }
        },
        "width": 500,
        "height": 250,
        "mark": "circle",
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
        "transform": [{"filter": {"param": "click"}}]
    }, */