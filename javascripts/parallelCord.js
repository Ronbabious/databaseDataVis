/*exampleData = {
    "": 149,
    cost: "",
    foodName: "Chicken, broiler, rotisserie, BBQ, drumstick meat and skin",
    popular: "",
    CarbPlusFat: "",
    ONIscore: "",
    Group: "Poultry Products",
    SatietyIndex: 0.504124449,
    InsulinIndex: 0.39029182,
    F6: "animal",
    ND: -0.53657119,
    InsulinogenicV2: 0.39029182,
    NutrivoreScore: 0.211575689,
    Satiety: 0.557304502,
    group: "animal",
    Protein: 25.6,
    Fat: 11.5,
    Carb: 0.12,
    ServingSize: "100g",
    Calorie: 206,
};*/

export function sendDataToFile(data, category) {
  //Create empty array
  //var arrayOfFoodObjects = [];
  //console.log(Object.keys(data)[1]);
  //console.log(Object.values(data)[1]);
  console.log("Length of object is: " + Object.keys(data).length);

  var newArrayOfFoodObjects = [];
  newArrayOfFoodObjects.push(data);

  /*
    for (let i = 0; i < Object.keys(data).length; i++) {
        if (Object.keys(data)[i] == "Calorie" || Object.keys(data)[i] == "Carb" || Object.keys(data)[i] == "Fat" || Object.keys(data)[i] == "InsulinIndex" || Object.keys(data)[i] == "ND" || Object.keys(data)[i] == "NutrivoreScore" || Object.keys(data)[i] == "ONIscore" || Object.keys(data)[i] == "Protein" || Object.keys(data)[i] == "Satiety" || Object.keys(data)[i] == "cost") {

            var foodPropertyName = Object.keys(data)[i];
            console.log("FoodPropertyName is: " + foodPropertyName);
            var foodPropertyValue = Object.values(data)[i];
            //console.log(Object.keys(data)[i] + " is index " + i);
            arrayOfFoodObjects[foodPropertyName] = foodPropertyValue;
        }
    }*/

  //console.log("foodObject is:  " + JSON.stringify(arrayOfFoodObjects));
  //console.log("Length of new array is: " + arrayOfFoodObjects.length);

  console.log("before stringify: " + newArrayOfFoodObjects);
  var newArrayOfFoodObjectsStringified = JSON.stringify(newArrayOfFoodObjects);
  console.log("after stringify: " + newArrayOfFoodObjectsStringified);
  parallelChart(newArrayOfFoodObjectsStringified);
}

//sendDataToFile(exampleData, 1);
/* 
function parallelChart(data) {
  console.log("data received:", data); */
const chart = {
  $schema: "https://vega.github.io/schema/vega-lite/v5.json",
  description:
    "Though Vega-Lite supports only one scale per axes, one can create a parallel coordinate plot by folding variables, using `joinaggregate` to normalize their values and using ticks and rules to manually create axes.",
  data: {
    url: "data/data_copy.json",
  },
  width: 600,
  height: 300,
  transform: [
    {
      filter: "datum.F6 != ''",
      window: [{ op: "count", as: "index" }],
    },
    {
      fold: [
        "Calorie",
        "Carb",
        "Fat",
        "InsulinIndex",
        "ND",
        "NutrivoreScore",
        "Protein",
        "Satiety",
        "cost",
      ],
    },
    {
      joinaggregate: [
        { op: "min", field: "value", as: "min" },
        { op: "max", field: "value", as: "max" },
      ],
      groupby: ["key"],
    },
    {
      calculate: "(datum.value - datum.min) / (datum.max-datum.min)",
      as: "norm_val",
    },
    {
      calculate: "(datum.min + datum.max) / 2",
      as: "mid",
    },
  ],
  layer: [
    {
      mark: { type: "rule", color: "#ccc" },
      encoding: {
        detail: { aggregate: "count" },
        x: { field: "key" },
      },
    },
    {
      mark: "line",
      encoding: {
        color: { type: "nominal", field: "F6" },
        detail: { type: "nominal", field: "index" },
        opacity: { value: 0.3 },
        x: { type: "nominal", field: "key" },
        y: { type: "quantitative", field: "norm_val", axis: null },
        tooltip: [
          {
            type: "quantitative",
            field: "ONIscore",
          },
          {
            type: "quantitative",
            field: "SatietyIndex",
          },
          {
            type: "quantitative",
            field: "InsulinIndex",
          },
          {
            type: "quantitative",
            field: "ND",
          },
        ],
      },
    },
    {
      encoding: {
        x: { type: "nominal", field: "key" },
        y: { value: 0 },
      },
      layer: [
        {
          mark: { type: "text", style: "label" },
          encoding: {
            text: { aggregate: "max", field: "max" },
          },
        },
        {
          mark: { type: "tick", style: "tick", size: 8, color: "#ccc" },
        },
      ],
    },
    {
      encoding: {
        x: { type: "nominal", field: "key" },
        y: { value: 150 },
      },
      layer: [
        {
          mark: { type: "text", style: "label" },
          encoding: {
            text: { aggregate: "min", field: "mid" },
          },
        },
        {
          mark: { type: "tick", style: "tick", size: 8, color: "#ccc" },
        },
      ],
    },
    {
      encoding: {
        x: { type: "nominal", field: "key" },
        y: { value: 300 },
      },
      layer: [
        {
          mark: { type: "text", style: "label" },
          encoding: {
            text: { aggregate: "min", field: "min" },
          },
        },
        {
          mark: { type: "tick", style: "tick", size: 8, color: "#ccc" },
        },
      ],
    },
  ],
  config: {
    axisX: { domain: false, labelAngle: 0, tickColor: "#ccc", title: null },
    view: { stroke: null },
    style: {
      label: { baseline: "middle", align: "right", dx: -5 },
      tick: { orient: "horizontal" },
    },
  },
};
vegaEmbed("#radarChart", chart);
/* } */

/* const chart = vegaEmbed("#radarChart", parallel, {
  theme: "googlecharts",
}).then(function (result) {

});

const chart = {
  $schema: "https://vega.github.io/schema/vega-lite/v5.json",
  description: "A simple bar chart with embedded data.",
  data: {
    values: [
      { a: "A", b: 28 },
      { a: "B", b: 55 },
      { a: "C", b: 43 },
      { a: "D", b: 91 },
      { a: "E", b: 81 },
      { a: "F", b: 53 },
      { a: "G", b: 19 },
      { a: "H", b: 87 },
      { a: "I", b: 52 },
    ],
  },
  mark: "bar",
  encoding: {
    x: { field: "a", type: "nominal", axis: { labelAngle: 0 } },
    y: { field: "b", type: "quantitative" },
  },
}; */
