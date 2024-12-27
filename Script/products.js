const mainProducts = [];
const productCard = document.querySelector(".card");
const API_URL = "https://www.themealdb.com/api/json/v1/1/search.php?s=";
let productsLimit = 25;
const MealPrices = [
  24.39, 32.58, 15.74, 47.12, 12.09, 19.87, 28.42, 40.15, 36.67, 11.39, 25.67,
  13.99, 45.22, 18.74, 22.18, 30.29, 14.48, 27.96, 39.47, 20.11, 26.83, 48.0,
  17.61, 44.5, 21.25,
];
function createProduct(obj, idx) {
  return {
    id: obj["idMeal"],
    name: obj["strCategory"] + " " + obj["strArea"],
    imgURL: obj["strMealThumb"],
    price: MealPrices[idx],
    description: obj["strIngredient1"] + " " + obj["strIngredient2"],
  };
}

function createProductCard(product) {
  let newProduct = productCard.cloneNode(true);
  let productIdx = product.id;
  let productName = product.name;
  let productPrice = product.price;
  let productImgURL = product.imgURL;
  let productDes = product.description;

  newProduct.querySelector(".card-img").style.backgroundImage =
    "url('" + productImgURL + "')";
  newProduct.querySelector(".productPrice").innerHTML = productPrice;
  newProduct.querySelector(".productName").innerHTML = productName;
  newProduct.querySelector(".text-body").innerHTML = productDes;
  newProduct.querySelector(".elementId").innerHTML = productIdx;
  newProduct.style.display = "inline-block";
  document.getElementById("imgcontainer").appendChild(newProduct);
}

function getProducts() {
  fetch(API_URL)
    .then((respone) => {
      if (respone.ok) {
        return respone.json();
      } else {
        throw new Error("the data dosent fetches");
      }
    })
    .then((data) => {
      const limitedMeals = data.meals.slice(0, 25);
      let idxOfP = 0;
      limitedMeals.forEach((item) => {
        mainProducts.push(createProduct(item, idxOfP));
        idxOfP++;
      });
      console.log(mainProducts);
      setToLocalStorage("mainProducts" , mainProducts);
    })
    .then(() => {
      for (let i = 0; i < productsLimit; i++) {
        createProductCard(mainProducts[i]);
      }
    })
    .catch((error) => {
      console.error("There was a problem with the fetch operation:", error);
    });
}

document.addEventListener("DOMContentLoaded", getProducts);