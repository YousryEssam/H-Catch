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

document.addEventListener("DOMContentLoaded", displayViewProduct);