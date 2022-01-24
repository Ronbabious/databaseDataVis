import { sendDataToParallel } from "../javascripts/parallelCord.js";
import { addToItemList } from "../javascripts/parallelCord.js";
const scatterPlot = {
  $schema: "https://vega.github.io/schema/vega-lite/v5.json",
  title: "Visualizing Nutritional Data and Satiety Index",
  autosize: "pad",
  data: {
    name: "source",
    url: "data/newData.json",
  },
  transform: [
    {
      filter:
        "datum.ONIscore > 0 && datum.Protein != 'NULL' && datum.Fat != 'NULL' && datum.Carb != 'NULL' && datum.Calorie != 'NULL' && datum.ND != '' && datum.InsulinIndex != '' && datum.NutrivoreScore != '' && datum.Satiety != '' && datum.cost != 0",
    },
  ],
  concat: [
    {
      //ScatterPlot # 1
      encoding: {
        color: {
          condition: {
            selection: "brush",
            title: "Food Categories",
            field: "F6",
            type: "nominal",
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
          value: "gray",
        },
        opacity: {
          condition: { param: "category", value: 0.8 },
          value: 0.1,
        },
        tooltip: [
          { title: "Food Name", field: "foodName", type: "nominal" },
          { field: "Satiety", type: "nominal" },
          { title: "Nutrient Density", field: "ND", type: "nominal" },
        ],
        y: {
          field: "Satiety",
          title: "Satiety",
          type: "quantitative",
        },
        x: {
          title: "Nutrient Density",
          field: "ND",
          type: "quantitative",
        },
        size: { field: "Calorie", type: "quantitative" },
      },
      width: 420,
      height: 250,
      mark: "circle",
      params: [
        {
          name: "brush",
          select: {
            type: "interval",
            resolve: "union",
            on:
              "[mousedown[event.shiftKey], window:mouseup] > window:mousemove!",
            translate:
              "[mousedown[event.shiftKey], window:mouseup] > window:mousemove!",
            zoom: "wheel![event.shiftKey]",
          },
        },
        {
          name: "grid",
          select: {
            type: "interval",
            resolve: "global",
            translate:
              "[mousedown[!event.shiftKey], window:mouseup] > window:mousemove!",
            zoom: "wheel![!event.shiftKey]",
          },
          bind: "scales",
        },
        {
          name: "category",
          select: { type: "point", fields: ["F6"] },
          bind: "legend",
        },
      ],
      transform: [{ filter: { param: "click" } }],
    },
    //ScatterPlot #2
    {
      encoding: {
        color: {
          condition: {
            param: "brush",
            title: "Food Categories",
            field: "F6",
            type: "nominal",
          },
          value: "gray",
        },
        opacity: {
          condition: { param: "category", value: 0.8 },
          value: 0.1,
        },

        tooltip: [
          { title: "Food Name", field: "foodName", type: "nominal" },
          { field: "Protein", type: "nominal" },
          {
            title: "Calories per 100 grams",
            field: "Calorie",
            type: "nominal",
          },
          { title: "USD$ per 2000 calories", field: "cost", type: "nominal" },
        ],
        x: {
          field: "Protein",
          title: "Protein",
          type: "quantitative",
          scale: { zero: false },
          axis: { maxExtent: 20 },
        },
        y: {
          field: "cost",
          title: "Cost per 2000 KCAL",
          scale: { type: "log" },
          axis: { maxExtent: 20 },
        },
        size: { field: "Calorie", type: "quantitative" },
      },
      width: 420,
      height: 250,
      mark: "circle",
      params: [
        {
          name: "brush",
          select: {
            type: "interval",
            resolve: "union",
            on:
              "[mousedown[event.shiftKey], window:mouseup] > window:mousemove!",
            translate:
              "[mousedown[event.shiftKey], window:mouseup] > window:mousemove!",
            zoom: "wheel![event.shiftKey]",
          },
        },
        {
          name: "grid",
          select: {
            type: "interval",
            resolve: "global",
            translate:
              "[mousedown[!event.shiftKey], window:mouseup] > window:mousemove!",
            zoom: "wheel![!event.shiftKey]",
          },

          bind: "scales",
        },
      ],
      transform: [{ filter: { param: "click" } }],
    },
    //Scatterplot #3
    {
      encoding: {
        color: {
          condition: {
            param: "brush",
            title: "Food Categories",
            field: "F6",
            type: "nominal",
          },
          value: "gray",
        },
        opacity: {
          condition: { param: "category", value: 0.8 },
          value: 0.1,
        },
        tooltip: [
          { title: "Food Name", field: "foodName", type: "nominal" },
          { title: "Insulin Index", field: "InsulinIndex", type: "nominal" },
          {
            title: "Carb and Fat Ratio",
            field: "CarbPlusFat",
            type: "nominal",
          },
        ],
        y: {
          field: "InsulinIndex",
          title: "Insulin Index",
          type: "quantitative",
        },
        x: {
          title: "Carbohydrates and Fat Ratio",
          field: "CarbPlusFat",
          type: "quantitative",
        },
      },
      width: 420,
      height: 250,
      mark: "circle",
      params: [
        {
          name: "brush",
          select: {
            type: "interval",
            resolve: "union",
            on:
              "[mousedown[event.shiftKey], window:mouseup] > window:mousemove!",
            translate:
              "[mousedown[event.shiftKey], window:mouseup] > window:mousemove!",
            zoom: "wheel![event.shiftKey]",
          },
        },
        {
          name: "grid",
          select: {
            type: "interval",
            resolve: "global",
            translate:
              "[mousedown[!event.shiftKey], window:mouseup] > window:mousemove!",
            zoom: "wheel![!event.shiftKey]",
          },
          bind: "scales",
        },
      ],
      transform: [{ filter: { param: "click" } }],
    },
    //Scatterplot #4
    {
      encoding: {
        color: {
          condition: {
            param: "brush",
            title: "Food Categories",
            field: "F6",
            type: "nominal",
          },
          value: "gray",
        },
        opacity: {
          condition: { param: "category", value: 0.8 },
          value: 0.1,
        },
        tooltip: [
          { title: "Food Name", field: "foodName", type: "nominal" },
          { field: "Satiety", type: "nominal" },
          { title: "Carbohydrates", field: "Carb", type: "nominal" },
          {
            title: "Calories per 100 grams",
            field: "Calorie",
            type: "nominal",
          },
        ],
        y: {
          field: "Satiety",
          title: "Satiety",
          type: "quantitative",
        },
        x: {
          title: "Carbohydrates",
          field: "Carb",
          type: "quantitative",
        },
        size: { field: "Calorie", type: "quantitative" },
      },
      width: 420,
      height: 250,
      mark: "circle",
      params: [
        {
          name: "brush",
          select: {
            type: "interval",
            resolve: "union",
            on:
              "[mousedown[event.shiftKey], window:mouseup] > window:mousemove!",
            translate:
              "[mousedown[event.shiftKey], window:mouseup] > window:mousemove!",
            zoom: "wheel![event.shiftKey]",
          },
        },
        {
          name: "grid",
          select: {
            type: "interval",
            resolve: "global",
            translate:
              "[mousedown[!event.shiftKey], window:mouseup] > window:mousemove!",
            zoom: "wheel![!event.shiftKey]",
          },
          bind: "scales",
        },
      ],
      transform: [
        {
          filter: { param: "click" },
          //filter: "datum.Carb > 0",
        },
      ],
    },
    //Scatterplot #5
    {
      encoding: {
        color: {
          condition: {
            param: "brush",
            title: "Food Categories",
            field: "F6",
            type: "nominal",
          },
          value: "gray",
        },
        opacity: {
          condition: { param: "category", value: 0.8 },
          value: 0.1,
        },
        tooltip: [
          { title: "Food Name", field: "foodName", type: "nominal" },
          { field: "ONIscore", type: "nominal" },
          { field: "Satiety", type: "nominal" },
        ],
        y: {
          field: "ONIscore",
          title: "ONIscore",
          type: "quantitative",
        },
        x: {
          title: "Satiety",
          field: "Satiety",
          type: "quantitative",
        },
      },
      width: 420,
      height: 250,
      mark: "circle",
      params: [
        {
          name: "brush",
          select: {
            type: "interval",
            resolve: "union",
            on:
              "[mousedown[event.shiftKey], window:mouseup] > window:mousemove!",
            translate:
              "[mousedown[event.shiftKey], window:mouseup] > window:mousemove!",
            zoom: "wheel![event.shiftKey]",
          },
        },
        {
          name: "grid",
          select: {
            type: "interval",
            resolve: "global",
            translate:
              "[mousedown[!event.shiftKey], window:mouseup] > window:mousemove!",
            zoom: "wheel![!event.shiftKey]",
          },
          bind: "scales",
        },
      ],
      transform: [{ filter: { param: "click" } }],
    },
    {
      width: 420,
      height: 250,
      mark: "bar",
      //Barchart Begin
      encoding: {
        color: {
          condition: {
            param: "click",
            field: "F6",
          },
          value: "gray",
        },
        text: {
          field: "foodName",
          type: "quantitative",
          format: ".1f",
        },
        opacity: {
          condition: { param: "category", value: 1 },
          value: 0.1,
        },
        tooltip: [
          { title: "Food Name", field: "foodName", type: "nominal" },
          { title: "ONI score", field: "ONIscore", type: "nominal" },
        ],
        y: { field: "ONIscore", type: "quantitative" },
        x: {
          title: "Food Name",
          field: "foodName",
          sort: { field: "ONIscore" },
          axis: {
            labelOpacity: 0,
            maxExtent: 20,
          },
        },
      },
      //BARCHART
      transform: [{ filter: { param: "brush" } }],
      params: [
        {
          name: "click",
          select: { type: "point", encodings: ["color"] },
        },
      ],
    },
  ],
  config: {
    concat: {
      spacing: 10,
      columns: 2,
      view: { stroke: "black" },
    },
  },
};

const chart = await vegaEmbed("#scatterPlot", scatterPlot, {
  theme: "googlecharts",
}).then(function (result) {
  //Simulere et click?
  result.view.addEventListener("click", function (event, item) {
    //Create new list item
    console.log(item.datum);
    var ul = document.getElementById("listofitems");
    var li = document.createElement("li");
    li.classList.add("list-group-item");
    var input = document.createElement("input");
    input.classList.add("form-check-input");
    input.classList.add("me-1");
    input.setAttribute("value", "");
    input.setAttribute("type", "checkbox");
    input.setAttribute("aria-label", "...");
    //Also create remove button
    var removebutton = document.createElement("button");
    removebutton.classList.add("btn");
    removebutton.classList.add("btn-outline-light");
    removebutton.setAttribute("type", "button");
    removebutton.innerHTML = "Remove";
    //Add remove functionality
    removebutton.onclick = function () {
      removebutton.parentElement.remove();
      return;
    };

    //Get name of item to add
    console.log("Item datum is: " + item.datum);
    var foodItemName = Object.values(item.datum)[3];
    console.log("foodName is: " + foodItemName);

    if (!foodItemName || foodItemName == "12") {
      return;
    }

    //Append it to the list
    li.appendChild(input);
    li.appendChild(document.createTextNode(foodItemName));
    li.appendChild(removebutton);
    ul.appendChild(li);

    //Add object to array of items for later use
    addToItemList(item.datum);
  });
});

// vegaEmbedModule('#scatterPlot', scatterPlot, {tooltip: {theme:'dark'}})
// .then(function(result){
//   console.log(result.view);
//   result.view.addEventListener('mouseclick', function(event,item){
//   console.log(item);
//   })
// })
// .catch(console.error)
