const API_URL = "https://www.themealdb.com/api/json/v1/1/search.php?s=";
function goToTop() {
  window.scrollTo({ top: 0, behavior: "smooth" });
}

function isUserIn() {
  let user = JSON.parse(localStorage.getItem("UserIN"));
  if (user != null) {
    document.getElementById("login").style.display = "none";
    document.getElementById("logout").style.display = "inline";
  }
}
function logOutUser() {
  let user = JSON.parse(localStorage.getItem("UserIN"));
  if (user != null) {
    localStorage.removeItem("UserIN");
    document.getElementById("login").style.display = "inline";
    document.getElementById("logout").style.display = "none";
  }
}

function goToProductsPage() {
  window.location = "products.html";
}

document.addEventListener("DOMContentLoaded", isUserIn);


//////////////////////
const MealPrices = [
  24.39, 32.58, 15.74, 47.12, 12.09, 19.87, 28.42, 40.15, 36.67, 11.39, 25.67,
  13.99, 45.22, 18.74, 22.18, 30.29, 14.48, 27.96, 39.47, 20.11, 26.83, 48.0,
  17.61, 44.5, 21.25,
];
function createProduct(obj , idx){
  return {
    id : obj["idMeal"],
    name : obj["strCategory"] + " " + obj["strArea"], 
    imgURL : obj["strMealThumb"], 
    price : MealPrices[idx] , 
    description : obj["strIngredient1"] + " " + obj["strIngredient2"]
  };
}