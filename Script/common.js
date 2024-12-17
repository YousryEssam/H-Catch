
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
