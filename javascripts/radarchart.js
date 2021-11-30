export function sendDataToFile(data, category) {


    //Create empty array
    var arrayOfFoodObjects = [];
    //console.log(Object.keys(data)[1]);
    //console.log(Object.values(data)[1]);
    console.log("Length of object is: " + Object.keys(data).length);


    for (let i = 0; i < Object.keys(data).length; i++) {
        if (i != 0 && i != 6 && i != 11 && i != 8 && i != 15 && i != 2 && i != 1 && i != 4 && i != 16 && i != 5) {
            arrayOfFoodObjects.push({ "key": Object.keys(data)[i], "value": Object.values(data)[i], "category": category });
        };
    };

    // //console.log("foodObject is:  " + JSON.stringify(arrayOfFoodObjects));
    // console.log("Length of new array is: " + arrayOfFoodObjects.length);
    // console.log("Variables is: " + JSON.stringify(variables));
    var variables = JSON.stringify(arrayOfFoodObjects)
    // return JSON.stringify(arrayOfFoodObjects)
    radarChart(variables)
}
function radarChart(data) {
    var radarJSON = {
        "$schema": "https://vega.github.io/schema/vega/v5.json",
        "description": "A radar chart example, showing multiple dimensions in a radial layout.",
        "width": 400,
        "height": 400,
        "padding": 40,
        "autosize": { "type": "none", "contains": "padding" },
        "signals": [
            { "name": "radius", "update": "width / 2" }
        ],
        "data": [{
                "name": "table",
                "values": data
            },
            {
                "name": "keys",
                "source": "table",
                "transform": [{
                    //
                    "type": "aggregate",
                    "groupby": ["key"]
                }]
            }
        ],
        "scales": [{
                "name": "angular",
                "type": "point",
                "range": { "signal": "[-PI, PI]" },
                "padding": 0.5,
                "domain": { "data": "table", "field": "key" }
            },
            {
                "name": "radial",
                "type": "linear",
                "range": { "signal": "[0, radius]" },
                "zero": true,
                "nice": false,
                "domain": { "data": "table", "field": "value" },
                "domainMin": 0
            },
    
            {
                "name": "color",
                "type": "ordinal",
                "domain": { "data": "table", "field": "category" },
                "range": { "scheme": "category10" }
            }
        ],
    
        "encode": {
            "enter": {
                "x": { "signal": "radius" },
                "y": { "signal": "radius" }
            }
        },
    
        "marks": [{
                "type": "group",
                "name": "categories",
                "zindex": 1,
                "from": {
                    "facet": { "data": "table", "name": "facet", "groupby": ["category"] }
                },
                "marks": [{
                        "type": "line",
                        "name": "category-line",
                        "from": { "data": "facet" },
                        "encode": {
                            "enter": {
                                "interpolate": { "value": "linear-closed" },
                                "x": { "signal": "scale('radial', datum.value) * cos(scale('angular', datum.key))" },
                                "y": { "signal": "scale('radial', datum.value) * sin(scale('angular', datum.key))" },
                                "stroke": { "scale": "color", "field": "category" },
                                "strokeWidth": { "value": 1 },
                                "fill": { "scale": "color", "field": "category" },
                                "fillOpacity": { "value": 0.1 }
                            }
                        },
                        "encoding": {
                            "tooltip": { "data": "table", "field": "foodName", "type": "nominal" },
                        }
                    },
                    {
                        "type": "text",
                        "name": "value-text",
                        "from": { "data": "category-line" },
                        "encode": {
                            "enter": {
                                "x": { "signal": "datum.x" },
                                "y": { "signal": "datum.y" },
                                "text": { "signal": "datum.datum.value" },
                                "align": { "value": "center" },
                                "baseline": { "value": "middle" },
                                "fill": { "value": "black" }
                            }
                        }
                    }
                ]
            },
            {
                "type": "rule",
                "name": "radial-grid",
                "from": { "data": "keys" },
                "zindex": 0,
                "encode": {
                    "enter": {
                        "x": { "value": 0 },
                        "y": { "value": 0 },
                        "x2": { "signal": "radius * cos(scale('angular', datum.key))" },
                        "y2": { "signal": "radius * sin(scale('angular', datum.key))" },
                        "stroke": { "value": "lightgray" },
                        "strokeWidth": { "value": 1 }
                    }
                }
            },
            {
                "type": "text",
                "name": "key-label",
                "from": { "data": "keys" },
                "zindex": 1,
                "encode": {
                    "enter": {
                        "x": { "signal": "(radius + 5) * cos(scale('angular', datum.key))" },
                        "y": { "signal": "(radius + 5) * sin(scale('angular', datum.key))" },
                        "text": { "field": "key" },
                        "align": [{
                                "test": "abs(scale('angular', datum.key)) > PI / 2",
                                "value": "right"
                            },
                            {
                                "value": "left"
                            }
                        ],
                        "baseline": [{
                                "test": "scale('angular', datum.key) > 0",
                                "value": "top"
                            },
                            {
                                "test": "scale('angular', datum.key) == 0",
                                "value": "middle"
                            },
                            {
                                "value": "bottom"
                            }
                        ],
                        "fill": { "value": "black" },
                        "fontWeight": { "value": "bold" }
                    }
                }
            },
            {
                "type": "line",
                "name": "outer-line",
                "from": { "data": "radial-grid" },
                "encode": {
                    "enter": {
                        "interpolate": { "value": "linear-closed" },
                        "x": { "field": "x2" },
                        "y": { "field": "y2" },
                        "stroke": { "value": "lightgray" },
                        "strokeWidth": { "value": 1 }
    
                    }
    
                }
            }
        ]
    }
    
    vegaEmbed('#radarChart', radarJSON)
}