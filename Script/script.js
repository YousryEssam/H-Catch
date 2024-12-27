// Products Limit
productsLimit = 12;
// Slider Functions
let next = document.querySelector(".next");
let prev = document.querySelector(".prev");
let curInterval = setInterval(nextSlide, 5000);
function nextSlide() {
  let items = document.querySelectorAll(".item");
  document.querySelector(".slide").appendChild(items[0]);
}
function newInterval() {
  clearInterval(curInterval);
  curInterval = setInterval(nextSlide, 5000);
}
next.addEventListener("click", function () {
  let items = document.querySelectorAll(".item");
  document.querySelector(".slide").appendChild(items[0]);
  newInterval();
});
prev.addEventListener("click", function () {
  let items = document.querySelectorAll(".item");
  document.querySelector(".slide").prepend(items[items.length - 1]);
  newInterval();
});