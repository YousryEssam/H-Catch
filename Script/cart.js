const cartElement = document.querySelector(".cartElement");

function createCartElement(product) {
  let newCartElement = cartElement.cloneNode(true);
  let productIdx = product.id;
  let productName = product.name;
  let productPrice = product.price;
  let productImgURL = product.imgURL;
  let productDes = product.description;

  newCartElement.querySelector(".cart-ele-img").src = productImgURL;
  newCartElement.querySelector(".element-name").innerHTML = productName;
  newCartElement.querySelector(".element-desc").innerHTML = productDes;
  newCartElement.querySelector(".element-price").innerHTML = productPrice;

  newCartElement.querySelector(".elementId").innerHTML = productIdx;
  newCartElement.style.display = "flex";
  document.getElementById("cart-table").appendChild(newCartElement);
}

// Local Storage.
function setToLocalStorage(key, value) {
  localStorage.setItem(key, JSON.stringify(value));
}
function removeFromLocalStorage(key) {
  localStorage.removeItem(key);
}
function getFromLocalStorage(key) {
  return JSON.parse(localStorage.getItem(key));
}

function displayCart() {
  let cartProducts = getFromLocalStorage("cartProducts") || [];
  console.log(cartProducts);
  let mainProducts = getFromLocalStorage("mainProducts") || [];
  console.log(mainProducts);
  for (let i = 0; i < cartProducts.length; i++) {
    for (let j = 0; j < mainProducts.length; j++) {
      if (cartProducts[i] == mainProducts[j].id) {
        createCartElement(mainProducts[j]);
        break;
      }
    }
  }
}
document.addEventListener("DOMContentLoaded", displayCart);
