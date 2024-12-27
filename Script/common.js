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

function setCookie(cname, cvalue, exdays) {
  const d = new Date();
  d.setTime(d.getTime() + exdays * 24 * 60 * 60 * 1000);
  let expires = "expires=" + d.toUTCString();
  document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}
function getCookie(cname) {
  var name = cname + "=";
  var decodedCookie = decodeURIComponent(document.cookie);
  var ca = decodedCookie.split(";");
  for (let i = 0; i < ca.length; i++) {
    var c = ca[i];
    while (c.charAt(0) == " ") {
      c = c.substring(1);
    }
    if (c.indexOf(name) == 0) {
      return c.substring(name.length, c.length);
    }
  }
  return "";
}

function setToLocalStorage(key, value) {
  localStorage.setItem(key, JSON.stringify(value));
}
function removeFromLocalStorage(key) {
  localStorage.removeItem(key);
}
function getFromLocalStorage(key) {
  return JSON.parse(localStorage.getItem(key));
}

function upDateCartCnt() {
  let cartProductsCnt =
    getFromLocalStorage("cartProductsCnt") || new Array(25).fill(0);
  let cnt = 0;
  for (let i = 0; i < cartProductsCnt.length; i++) {
    cnt += cartProductsCnt[i];
  }
  document.querySelector(".quantity").innerHTML = String(cnt);
}

function addProductToCart(idx) {
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

function clearLS() {
  removeFromLocalStorage("cartProducts");
  removeFromLocalStorage("cartProductsCnt");
}

function getProductId() {
  const imgContainer = document.getElementById("imgcontainer");
  imgContainer.addEventListener("click", function (event) {
    let svgElement = event.target.closest(".svg-icon");
    if (svgElement) {
      const card = svgElement.closest(".card");
      if (card) {
        const elementIdSpan = card.querySelector(".elementId");
        if (elementIdSpan) {
          const elementId = elementIdSpan.innerHTML.trim();
          addProductToCart(elementId);
        }
      }
    }
  });
}

function goToHome(){
  window.location = "index.html";
}

function buyProducts(){
  alert("")
  clearLS();
}

function goToProductView(idx){
  let curProductView;
  for(let i  =0 ; i < mainProducts.length ; i++){
    if(mainProducts[i].id == idx){
      curProductView = mainProducts[i];
      break;
    }
  }
  setToLocalStorage("curProductView" ,curProductView );
  window.location = "productView.html";
}

function ProductView() {
  const imgContainer = document.getElementById("imgcontainer");
  imgContainer.addEventListener("click", function (event) {
    let cardImg = event.target.closest(".card-img");
    if (cardImg) {
      const card = cardImg.closest(".card");
      if (card) {
        const elementIdSpan = card.querySelector(".elementId");
        if (elementIdSpan) {
          console.log("Hello");
          const elementId = elementIdSpan.innerHTML.trim();
          goToProductView(elementId);
        }
      }
    }
  });
}

document.addEventListener("DOMContentLoaded", isUserIn);
document.addEventListener("DOMContentLoaded", ProductView);
document.addEventListener("DOMContentLoaded", getProductId);
document.addEventListener("DOMContentLoaded", upDateCartCnt);