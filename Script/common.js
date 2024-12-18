
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

/// Cookies

function setCookie(cname, cvalue, exdays) {
  const d = new Date();
  d.setTime(d.getTime() + (exdays*24*60*60*1000));
  let expires = "expires="+ d.toUTCString();
  document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}
function getCookie(cname) {
  var name = cname + "=";
  var decodedCookie = decodeURIComponent(document.cookie);
  var ca = decodedCookie.split(';');
  for(let i = 0; i <ca.length; i++) {
    var c = ca[i];
    while (c.charAt(0) == ' ') {
      c = c.substring(1);
    }
    if (c.indexOf(name) == 0) {
      return c.substring(name.length, c.length);
    }
  }
  return "";
}

// Local Storage.
function setToLocalStorage( key , value){
  localStorage.setItem(key , JSON.stringify(value));
}
function removeFromLocalStorage(key){
  localStorage.removeItem(key);
}
function getFromLocalStorage(key){
  return JSON.parse(localStorage.getItem(key));
}

/// Cart

function addProductToCart (idx){
  let cartCnt = document.getElementById("quantity");
  let cartProducts = getFromLocalStorage("cartProducts") || [];
  cartProducts.push(idx);

  console.log(cartProducts);
  setToLocalStorage("cartProducts" ,cartProducts);
  console.log(cartProducts.length)
  cartCnt.innerHTML = cartProducts.length;
}
// removeFromLocalStorage("cartProducts");
function getProductId(){
  const imgContainer = document.getElementById("imgcontainer");
  imgContainer.addEventListener("click", function (event) {
    let svgElement = event.target.closest(".svg-icon");
    if (svgElement) {
      const card = svgElement.closest(".card");
      if (card) {
        const elementIdSpan = card.querySelector(".elementId");
        if (elementIdSpan) {
          const elementId = elementIdSpan.innerHTML.trim();
          console.log("Element ID:", elementId);
          addProductToCart(elementId);
          /// Complet Here 
        }
      }
    }
  });

}

document.addEventListener("DOMContentLoaded", getProductId );