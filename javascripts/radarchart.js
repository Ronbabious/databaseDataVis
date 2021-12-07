/*exampleData = {
    "": 149,
    "cost": "",
    "foodName": "Chicken, broiler, rotisserie, BBQ, drumstick meat and skin",
    "popular": "",
    "CarbPlusFat": "",
    "ONIscore": "",
    "Group": "Poultry Products",
    "SatietyIndex": 0.504124449,
    "InsulinIndex": 0.39029182,
    "F6": "animal",
    "ND": -0.53657119,
    "InsulinogenicV2": 0.39029182,
    "NutrivoreScore": 0.211575689,
    "Satiety": 0.557304502,
    "group": "animal",
    "Protein": 25.6,
    "Fat": 11.5,
    "Carb": 0.12,
    "ServingSize": "100g",
    "Calorie": 206
}
*/

export function sendDataToFile(data, category) {
  //Create empty array
  var arrayOfFoodObjects = [];
  //console.log(Object.keys(data)[1]);
  //console.log(Object.values(data)[1]);
  console.log("Length of object is: " + Object.keys(data).length);

  for (let i = 0; i < Object.keys(data).length; i++) {
    if (
      Object.keys(data)[i] == "Calorie" ||
      Object.keys(data)[i] == "Carb" ||
      Object.keys(data)[i] == "Fat" ||
      Object.keys(data)[i] == "InsulinIndex" ||
      /*Object.keys(data)[i] == "ND" || */ Object.keys(data)[i] ==
        "NutrivoreScore" ||
      Object.keys(data)[i] == "ONIscore" ||
      Object.keys(data)[i] == "Protein" ||
      Object.keys(data)[i] == "Satiety" ||
      Object.keys(data)[i] == "cost"
    ) {
      console.log(Object.keys(data)[i] + " is index " + i);
      arrayOfFoodObjects.push({
        key: Object.keys(data)[i],
        value: normalizeValue(Object.values(data)[i], i),
        //"value": Object.values(data)[i],
        category: category,
      });
    }
  }

  console.log("foodObject is:  " + JSON.stringify(arrayOfFoodObjects));
  console.log("Length of new array is: " + arrayOfFoodObjects.length);
  var variables = JSON.stringify(arrayOfFoodObjects);
  // return JSON.stringify(arrayOfFoodObjects)
  radarChart(variables);
}

//sendDataToFile(exampleData, 1);

function normalizeValue(value, index) {
  switch (index) {
    //Cost
    case 1:
      return Math.round((value / 358) * 100);
    //OniScore
    case 5:
      return Math.round(value * 100);
    //InsulinIndex
    case 8:
      return Math.round(value * 100);
    //Nutrivore score
    case 12:
      return Math.round(value * 100);
    //Satiety
    case 13:
      return Math.round(value * 100);
    //Protein
    case 15:
      return Math.round((value / 62.4) * 100);
    //Fat
    case 16:
      return Math.round(value);
    //Carb
    case 17:
      return Math.round((value / 111) * 100);
    //Calories
    case 19:
      return Math.round((value / 563) * 100);
  }
}

function radarChart(data) {
  var radarJSON = {
    $schema: "https://vega.github.io/schema/vega/v5.json",
    description:
      "A radar chart example, showing multiple dimensions in a radial layout.",
    width: 400,
    height: 400,
    padding: 40,
    autosize: { type: "none", contains: "padding" },
    signals: [{ name: "radius", update: "width / 2" }],
    data: [
      {
        name: "table",
        values: data,
      },
      {
        name: "keys",
        source: "table",
        transform: [
          {
            //
            type: "aggregate",
            groupby: ["key"],
          },
        ],
      },
    ],
    scales: [
      {
        name: "angular",
        type: "point",
        range: { signal: "[-PI, PI]" },
        padding: 0.5,
        domain: { data: "table", field: "key" },
      },
      {
        name: "radial",
        type: "linear",
        range: { signal: "[0, radius]" },
        zero: true,
        nice: false,
        domain: { data: "table", field: "value" },
        domainMin: 0,
      },

      {
        name: "color",
        type: "ordinal",
        domain: { data: "table", field: "category" },
        range: { scheme: "category10" },
      },
    ],

    encode: {
      enter: {
        x: { signal: "radius" },
        y: { signal: "radius" },
      },
    },

    marks: [
      {
        type: "group",
        name: "categories",
        zindex: 1,
        from: {
          facet: { data: "table", name: "facet", groupby: ["category"] },
        },
        marks: [
          {
            type: "line",
            name: "category-line",
            from: { data: "facet" },
            encode: {
              enter: {
                interpolate: { value: "linear-closed" },
                x: {
                  signal:
                    "scale('radial', datum.value) * cos(scale('angular', datum.key))",
                },
                y: {
                  signal:
                    "scale('radial', datum.value) * sin(scale('angular', datum.key))",
                },
                stroke: { scale: "color", field: "category" },
                strokeWidth: { value: 1 },
                fill: { scale: "color", field: "category" },
                fillOpacity: { value: 0.1 },
              },
            },
            encoding: {
              tooltip: { data: "table", field: "foodName", type: "nominal" },
            },
          },
          {
            type: "text",
            name: "value-text",
            from: { data: "category-line" },
            encode: {
              enter: {
                x: { signal: "datum.x" },
                y: { signal: "datum.y" },
                text: { signal: "datum.datum.value" },
                align: { value: "center" },
                baseline: { value: "middle" },
                fill: { value: "black" },
              },
            },
          },
        ],
      },
      {
        type: "rule",
        name: "radial-grid",
        from: { data: "keys" },
        zindex: 0,
        encode: {
          enter: {
            x: { value: 0 },
            y: { value: 0 },
            x2: { signal: "radius * cos(scale('angular', datum.key))" },
            y2: { signal: "radius * sin(scale('angular', datum.key))" },
            stroke: { value: "lightgray" },
            strokeWidth: { value: 1 },
          },
        },
      },
      {
        type: "text",
        name: "key-label",
        from: { data: "keys" },
        zindex: 1,
        encode: {
          enter: {
            x: { signal: "(radius + 5) * cos(scale('angular', datum.key))" },
            y: { signal: "(radius + 5) * sin(scale('angular', datum.key))" },
            text: { field: "key" },
            align: [
              {
                test: "abs(scale('angular', datum.key)) > PI / 2",
                value: "right",
              },
              {
                value: "left",
              },
            ],
            baseline: [
              {
                test: "scale('angular', datum.key) > 0",
                value: "top",
              },
              {
                test: "scale('angular', datum.key) == 0",
                value: "middle",
              },
              {
                value: "bottom",
              },
            ],
            fill: { value: "black" },
            fontWeight: { value: "bold" },
          },
        },
      },
      {
        type: "line",
        name: "outer-line",
        from: { data: "radial-grid" },
        encode: {
          enter: {
            interpolate: { value: "linear-closed" },
            x: { field: "x2" },
            y: { field: "y2" },
            stroke: { value: "lightgray" },
            strokeWidth: { value: 1 },
          },
        },
      },
    ],
  };

  vegaEmbed("#radarChart", radarJSON);
}
