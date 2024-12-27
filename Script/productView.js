function displayViewProduct() {
  let product = getFromLocalStorage("curProductView");
  let displayElement = document.getElementById("displayElement");
  let productIdx = product.id;
  let productName = product.name;
  let productPrice = product.price;
  let productImgURL = product.imgURL;
  let productDes = product.description;
  displayElement.querySelector(".product-img").style.backgroundImage =
    "url('" + productImgURL + "')";
  displayElement.querySelector(".price-sp").innerHTML = productPrice;
  displayElement.querySelector(".p-name").innerHTML = productName;
  displayElement.querySelector(".p-des").innerHTML = productDes;
  displayElement.querySelector(".elementId").innerHTML = productIdx;
}

function addToCart(element) {
  let idx = element.querySelector(".elementId").innerHTML;
  let cartProducts = getFromLocalStorage("cartProducts") || [];
  let cartProductsCnt =
    getFromLocalStorage("cartProductsCnt") || new Array(25).fill(0);
  let newProduct = true;
  for (let i = 0; i < cartProducts.length; i++) {
    if (cartProducts[i] == idx) {
      newProduct = false;
      cartProductsCnt[i]++;
    }
  }
  if (newProduct) {
    cartProducts.push(idx);
    cartProductsCnt[cartProducts.indexOf(idx)]++;
  }

  console.log(cartProducts);
  setToLocalStorage("cartProducts", cartProducts);
  setToLocalStorage("cartProductsCnt", cartProductsCnt);
  console.log(cartProducts.length);
  upDateCartCnt();
}

document.addEventListener("DOMContentLoaded", displayViewProduct);