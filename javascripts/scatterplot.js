import { sendDataToFile } from "../javascripts/radarchart.js";

const spec = {
  $schema: "https://vega.github.io/schema/vega-lite/v5.json",
  title: "USDA Food Database",
  data: {
    name: "source",
    url: "data/newData.json",
  },
  transform: [
    {
      filter:
        "datum.ONIscore > 0 && datum.F6 != '' && datum.Protein != 'NULL' && datum.Fat != 'NULL'&& datum.Carb != 'NULL' && datum.Calorie != 'NULL'",
    },
  ],
  concat: [
    {
      //ScatterPlot # 1
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
        tooltip: [
          { field: "foodName", type: "nominal" },
          { field: "Protein", type: "nominal" },
          { field: "Fat", type: "nominal" },
          { field: "Carb", type: "nominal" },
          { field: "Calorie", type: "nominal" },
          { field: "ND", type: "nominal" },
        ],
        y: {
          field: "Protein",
          title: "Protein",
          type: "quantitative",
        },
        x: {
          title: "ONIscore",
          field: "ONIscore",
          type: "quantitative",
        },
      },
      width: 500,
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
        tooltip: [
          { field: "foodName", type: "nominal" },
          { field: "Protein", type: "nominal" },
          { field: "Fat", type: "nominal" },
          { field: "Carb", type: "nominal" },
          { field: "Calorie", type: "nominal" },
          { field: "ND", type: "nominal" },
        ],
        y: {
          field: "Fat",
          title: "Fat",
          type: "quantitative",
        },
        x: {
          title: "ONIscore",
          field: "ONIscore",
          type: "quantitative",
        },
      },
      width: 500,
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
        tooltip: [
          { field: "foodName", type: "nominal" },
          { field: "Protein", type: "nominal" },
          { field: "Fat", type: "nominal" },
          { field: "Carb", type: "nominal" },
          { field: "Calorie", type: "nominal" },
          { field: "ND", type: "nominal" },
        ],
        y: {
          field: "Carb",
          title: "Carbohydrates",
          type: "quantitative",
        },
        x: {
          title: "ONIscore",
          field: "ONIscore",
          type: "quantitative",
        },
      },
      width: 500,
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
        tooltip: [
          { field: "foodName", type: "nominal" },
          { field: "Protein", type: "nominal" },
          { field: "Fat", type: "nominal" },
          { field: "Carb", type: "nominal" },
          { field: "Calorie", type: "nominal" },
          { field: "ND", type: "nominal" },
          { field: "ONIscore", type: "nominal" },
          { field: "SatietyIndex", type: "nominal" },
          { field: "Satiety", type: "nominal" },
        ],
        y: {
          field: "Calorie",
          title: "Calories pr. 100 grams",
          type: "quantitative",
        },
        x: {
          title: "ONIscore",
          field: "ONIscore",
          type: "quantitative",
        },
      },
      width: 500,
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
        tooltip: [
          { field: "foodName", type: "nominal" },
          { field: "Protein", type: "nominal" },
          { field: "Fat", type: "nominal" },
          { field: "Carb", type: "nominal" },
          { field: "Calorie", type: "nominal" },
          { field: "ND", type: "nominal" },
        ],
        y: {
          field: "Carb",
          title: "Carb",
          type: "quantitative",
        },
        x: {
          title: "InsulinogenicV2",
          field: "InsulinogenicV2",
          type: "quantitative",
        },
      },
      width: 500,
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
    //Scatterplot #6
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
        tooltip: [
          { field: "foodName", type: "nominal" },
          { field: "Protein", type: "nominal" },
          { field: "Fat", type: "nominal" },
          { field: "Carb", type: "nominal" },
          { field: "Calorie", type: "nominal" },
          { field: "ND", type: "nominal" },
        ],
        y: {
          field: "SatietyIndex",
          title: "Satiety",
          type: "quantitative",
        },
        x: {
          title: "Satiety",
          field: "Satiety",
          type: "quantitative",
        },
      },
      width: 500,
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
      //Barchart Begin
      encoding: {
        color: {
          condition: {
            param: "click",
            field: "F6",
          },
          value: "gray",
        },
        x: { aggregate: "count", type: "quantitative" },
        y: { title: "Food Category", field: "F6" },
      },
      //BARCHART
      width: 500,
      mark: "bar",
      params: [
        {
          name: "click",
          select: { type: "point", encodings: ["color"] },
        },
      ],
      transform: [{ filter: { param: "brush" } }],
    },
  ],
  config: {
    concat: {
      spacing: 0,
      columns: 2,
    },
  },
};

const old = await vegaEmbed("#scatterPlot", spec).then(function (result) {
  result.view.addEventListener("click", function (event, item) {
    console.log((result.spec.concat[0].mark = "point"));
    vegaEmbed("#scatterPlot", spec);
    //console.log("CreatedNew");
    //// console.log("New");
    /*     p.spec.transform[0].filter = "";
            p.finalize();
            newResult; */
  });
});
/*     p.spec.transform[0].filter = "";
    p.finalize();
    newResult; */

function callNew(spec1) {
  vegaEmbed("#scatterPlot", spec1).then(function (p) {
    console.log((p.spec.transform[0].filter = ""));
  });
  /*   let changeset = vega
    .changeset()
    .remove(() => true)
    .insert(view);
  view.change("source_0", changeset).run(); */
}

/* await vegaEmbed("#scatterPlot", scatterPlot, {
  theme: "googlecharts",
}).then(function (result) {
  //Simulere et click?
  console.log(scatterPlot.transform[0]);
  result.view.addDataListener("source", function (name, value) {
    console.log("dataListener", name, value);
  });
  result.view.addEventListener("click", function (event, item) {
    scatterPlot.transform[0].filter = "";
    sendDataToFile(item.datum, 1);
    console.log(result.test);
    vegaEmbed("#scatterPlot", scatterPlot);
    //callNew();
  });
});

function callNew() {
  vegaEmbed("#scatterPlot", scatterPlot).then(function (result) {
    console.log(result);
  });
} */

// vegaEmbedModule('#scatterPlot', scatterPlot, {tooltip: {theme:'dark'}})
// .then(function(result){
//   console.log(result.view);
//   result.view.addEventListener('mouseclick', function(event,item){
//   console.log(item);
//   })
// })
// .catch(console.error)
