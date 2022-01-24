var img = document.getElementById("infoIcon");
var center = document.getElementById("center");

img.addEventListener("click", function (event) {
  if (center.style.display !== "none") {
    center.style.display = "none";
  } else {
    center.style.display = "block";
  }
  console.log("clicked image");
});
