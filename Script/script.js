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






let maxNumberOfProducts = 12;
const MealPrices = [
  24.39, 32.58, 15.74, 47.12, 12.09, 19.87, 28.42, 40.15, 36.67, 11.39, 25.67,
  13.99, 45.22, 18.74, 22.18, 30.29, 14.48, 27.96, 39.47, 20.11, 26.83, 48.0,
  17.61, 44.5, 21.25,
];
const productCard = document.querySelector(".card");

function addNewProdunctCard(product, idx) {
  let newProduct = productCard.cloneNode(true);
  let productIdx = idx;
  let productImgURL = product["strMealThumb"];
  let productName = product["strArea"] + " " + product["strCategory"];
  let productPrice = MealPrices[productIdx];
  let productDes =
    product["strIngredient1"] +
    " " +
    product["strIngredient2"] ;

    newProduct.querySelector('.card-img').style.backgroundImage = "url('"+ productImgURL+"')";
    newProduct.querySelector('.productPrice').innerHTML = productPrice;
    newProduct.querySelector('.productName').innerHTML = productName;
    newProduct.querySelector('.text-body').innerHTML = productDes;
    newProduct.querySelector('.elementId').innerHTML = String(productIdx);
    newProduct.style.display = "inline-block";
    document.getElementById("imgcontainer").appendChild(newProduct);
}

function getProducts() {
  fetch(API_URL).then((respone) => {
      if (respone.ok) {
        return respone.json();
      } 
      else { 
        throw new Error("the data dosent fetches"); 
    }
    }).then((data) => {
      const limitedMeals = data.meals.slice(0, maxNumberOfProducts);
      let idxOfP = 0;
      limitedMeals.forEach((item) => {
        addNewProdunctCard(item , idxOfP);
        idxOfP++;
      });
    }).catch((error) => {
      console.error("There was a problem with the fetch operation:", error);
    });
}

document.addEventListener("DOMContentLoaded",getProducts);