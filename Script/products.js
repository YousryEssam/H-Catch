const productCard = document.querySelector(".card");
let maxNumberOfProducts = 25;


function addNewProdunctCard(product, idx) {
  let newProduct = productCard.cloneNode(true);
  let productIdx = idx;
  let productImgURL = product["strMealThumb"];
  let productName = product["strArea"] + " " + product["strCategory"];
  let productPrice = MealPrices[productIdx];
  let productDes = product["strIngredient1"] + " " + product["strIngredient2"];

  newProduct.querySelector(".card-img").style.backgroundImage =
    "url('" + productImgURL + "')";
  newProduct.querySelector(".productPrice").innerHTML = productPrice;
  newProduct.querySelector(".productName").innerHTML = productName;
  newProduct.querySelector(".text-body").innerHTML = productDes;
  newProduct.querySelector(".elementId").innerHTML = String(productIdx);
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
      const limitedMeals = data.meals.slice(0, maxNumberOfProducts);
      let idxOfP = 0;
      limitedMeals.forEach((item) => {
        addNewProdunctCard(item, idxOfP);
        idxOfP++;
      });
    })
    .catch((error) => {
      console.error("There was a problem with the fetch operation:", error);
    });
}

document.addEventListener("DOMContentLoaded", getProducts);