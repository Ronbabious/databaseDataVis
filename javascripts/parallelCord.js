var clickedItems = [];

document
  .getElementById("compareItemsButton")
  .addEventListener("click", function () {
    compareItems();
  });

export function addToItemList(item) {
  clickedItems.push(item);
}

function compareItems() {
  var foodNames = [];

  //Print list of all items
  var lis = document.querySelectorAll(".list-group-item");
  for (var i = 0; i < lis.length; i++) {
    foodNames[i] = lis[i].childNodes[1].data;
    console.log(lis[i].childNodes[1].data);
  }

  //Get json object from string and append to clicked items?
  //sendDataToParallel(foodNames);
  parallelChart(clickedItems);
}

export function sendDataToParallel(foodNames) {
  parallelChart(clickedItems);

  /*console.log("Length of object is: " + Object.keys(data).length);
    var newArrayOfFoodObjects = [];
    newArrayOfFoodObjects.push(data);
    console.log("before stringify: " + newArrayOfFoodObjects);
    var newArrayOfFoodObjectsStringified = JSON.stringify(newArrayOfFoodObjects);
    console.log("after stringify: " + newArrayOfFoodObjectsStringified);
    parallelChart(newArrayOfFoodObjectsStringified);*/
}

//sendDataToFile(exampleData, 1);

function parallelChart(data) {
  console.log("data received:", data);
  const chart = {
    $schema: "https://vega.github.io/schema/vega-lite/v5.json",
    description:
      "Though Vega-Lite supports only one scale per axes, one can create a parallel coordinate plot by folding variables, using `joinaggregate` to normalize their values and using ticks and rules to manually create axes.",
    data: {
      values: data,
    },
    width: 600,
    height: 300,
    transform: [
      { window: [{ op: "count", as: "index" }] },
      {
        fold: [
          "cost",
          "Protein",
          "Fat",
          "Carb",
          "Calorie",
          "Satiety",
          "InsulinIndex",
          "ND",
          "CarbPlusFat",
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
        selection: {
          highlight: {
            type: "single",
            on: "mouseover",
            nearest: "true",
            fields: ["foodName"],
          },
        },
        mark: "point",
        encoding: {
          x: { type: "nominal", field: "key" },
          y: { type: "quantitative", field: "norm_val", axis: null },
          color: {
            type: "nominal",
            field: "F6",
            title: "Food Categories",
          },
        },
      },
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
          color: {
            type: "nominal",
            field: "F6",
            scale: {
              range: [
                "#0077BB",
                "#33BBEE",
                "#009988",
                "#EE7733",
                "#CC3311",
                "#EE3377",
                "#BBBBBB",
              ],
            },
          },
          detail: { type: "nominal", field: "index" },
          opacity: { value: 1 },
          x: { type: "nominal", field: "key" },
          y: { type: "quantitative", field: "norm_val", axis: null },
          size: {
            condition: {
              selection: { not: "highlight" },
              value: 1,
            },
            value: 3,
          },
          tooltip: [
            { title: "Food Name", field: "foodName", type: "nominal" },
            { field: "Protein", type: "nominal" },
            { title: "Carbohydrates", field: "Carb", type: "nominal" },
            {
              title: "Calories per 100 grams",
              field: "Calorie",
              type: "nominal",
            },
            { title: "USD$ per 2000 calories", field: "cost", type: "nominal" },
            { field: "Satiety", type: "nominal" },
            { title: "Nutrient Density", field: "ND", type: "nominal" },

            { title: "Insulin Index", field: "InsulinIndex", type: "nominal" },
            {
              title: "Carb and Fat Ratio",
              field: "CarbPlusFat",
              type: "nominal",
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
            //Ikke her
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
            //ikke Her
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
            //IKKE HER
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
}

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
