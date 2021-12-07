//Inde i data.json virker det nu fordi jeg har sat [...] rundt om det hele så det er et array i stedet for et object

const autoCompleteJS = new autoComplete({
  placeHolder: "Search for Food...",
  data: {
    src: async () => {
      try {
        // Loading placeholder text
        document
          .getElementById("autoComplete")
          .setAttribute("placeholder", "Loading...");
        // Fetch External Data Source
        const source = await fetch("./data/newData.json");
        const data = await source.json();
        // Post Loading placeholder text
        document
          .getElementById("autoComplete")
          .setAttribute("placeholder", autoCompleteJS.placeHolder);
        // Returns Fetched data
        return data;
      } catch (error) {
        return error;
      }
    },
    keys: ["foodName"],
    cache: true,
  },
  resultItem: {
    highlight: true,
  },
  events: {
    input: {
      selection: (event) => {
        const selection = event.detail.selection.value;
        autoCompleteJS.input.value = selection;
      },
    },
  },
});

autoCompleteJS.input.addEventListener("selection", function (event) {
  const feedback = event.detail;
  autoCompleteJS.input.blur();
  // Prepare User's Selected Value
  const selection = feedback.selection.value[feedback.selection.key];

  var ul = document.getElementById("listofitems");
  //document.querySelector(".selection").innerHTML = selection;
  var li = document.createElement("li");
  li.classList.add("list-group-item");
  var input = document.createElement("input");
  input.classList.add("form-check-input");
  input.classList.add("me-1");
  input.setAttribute("value", "");
  input.setAttribute("type", "checkbox");
  input.setAttribute("aria-label", "...");

  var removebutton = document.createElement("button");
  removebutton.classList.add("btn");
  removebutton.classList.add("btn-outline-light");
  removebutton.setAttribute("type", "button");
  removebutton.innerHTML = "Remove";

  removebutton.onclick = function () {
    removebutton.parentElement.remove();
    return;
  };

  li.appendChild(input);
  li.appendChild(document.createTextNode(selection));
  li.appendChild(removebutton);
  ul.appendChild(li);

  autoCompleteJS.input.value = selection;
  // Console log autoComplete data feedback
  console.log(feedback);
});
