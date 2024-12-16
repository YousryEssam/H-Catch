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
function goToProductsPage(){
  window.location = "products.html";
}

document.addEventListener("DOMContentLoaded", isUserIn);
