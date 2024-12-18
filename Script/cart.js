const cartElement = document.querySelector(".cartElement");

function createCartElement(product , cnt) {
  let newCartElement = cartElement.cloneNode(true);
  let productIdx = product.id;
  let productName = product.name;
  let productPrice = product.price;
  let productImgURL = product.imgURL;
  let productDes = product.description;

  newCartElement.querySelector(".productImg").style.backgroundImage =
  "url('" + productImgURL + "')";
  newCartElement.querySelector(".element-name").innerHTML = productName;
  newCartElement.querySelector(".element-desc").innerHTML = productDes + "Juicy chicken grilled with zesty lemon and fresh herbs, packed with flavor. Perfect with veggies or mashed potatoes.";
  newCartElement.querySelector(".element-price").innerHTML = productPrice;
  newCartElement.querySelector(".element-cnt").innerHTML = cnt;
  newCartElement.querySelector(".total-price").innerHTML = cnt * productPrice;

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
  let cartProductsCnt = getFromLocalStorage("cartProductsCnt") || new Array(25).fill(0);
  let mainProducts = getFromLocalStorage("mainProducts") || [];

  for (let i = 0; i < cartProducts.length; i++) {
    for (let j = 0; j < mainProducts.length; j++) {
      if (cartProducts[i] == mainProducts[j].id) {
        createCartElement(mainProducts[j]  ,cartProductsCnt[i] );
        break;
      }
    }
  }
}


// buttons of cart
function incrementCnt(idx){
  let cartProducts = getFromLocalStorage("cartProducts") || [];
  let cartProductsCnt = getFromLocalStorage("cartProductsCnt")|| new Array(25).fill(0);
  cartProductsCnt[cartProducts.indexOf(idx)]++;
  setToLocalStorage("cartProductsCnt" , cartProductsCnt);
  upDateCartCnt();
}
function getProductIdPlus() {
  const cartTable = document.getElementById("cart-table");
  cartTable.addEventListener("click", function (event) {
    let plus = event.target.closest(".plus");
    if (plus) {
      const elementControl = plus.closest(".element-control");
      if (elementControl) {
        const elementIdSpan = elementControl.querySelector(".elementId");
        const elementCnt = elementControl.querySelector(".element-cnt");
        const elementPrice = elementControl.querySelector(".element-price");
        elementCnt.innerHTML = Number(elementCnt.innerHTML) + 1 ;
        const total = elementControl.querySelector(".total-price").innerHTML =  (Number(elementCnt.innerHTML) * Number(elementPrice.innerHTML)).toFixed(2); 
        if (elementIdSpan) {
          const elementId = elementIdSpan.innerHTML.trim();
          console.log("Element ID:", elementId);
          incrementCnt(elementId);
        }
      }
    }
  });
}

// 
function decrementCnt(idx){
  let cartProducts = getFromLocalStorage("cartProducts") || [];
  let cartProductsCnt = getFromLocalStorage("cartProductsCnt")|| new Array(25).fill(0);
  if(cartProductsCnt[cartProducts.indexOf(idx)] > 0 ){
    cartProductsCnt[cartProducts.indexOf(idx)]--;
  }
  setToLocalStorage("cartProductsCnt" , cartProductsCnt);
  upDateCartCnt();
}

function getProductIdMinus() {
  const cartTable = document.getElementById("cart-table");
  cartTable.addEventListener("click", function (event) {
    let minus = event.target.closest(".minus");
    if (minus) {
      const elementControl = minus.closest(".element-control");
      if (elementControl) {
        const elementCnt = elementControl.querySelector(".element-cnt");
        const elementIdSpan = elementControl.querySelector(".elementId");
        const elementPrice = elementControl.querySelector(".element-price");
        if(Number(elementCnt.innerHTML) > 0 ){
          elementCnt.innerHTML = Number(elementCnt.innerHTML) - 1 ;
          const total = elementControl.querySelector(".total-price").innerHTML = ( Number(elementCnt.innerHTML) * Number(elementPrice.innerHTML)).toFixed(2); ; 
        }
        if (elementIdSpan) {
          const elementId = elementIdSpan.innerHTML.trim();
          console.log("Element ID:", elementId);
          decrementCnt(elementId);
        }
      }
    }
  });
}


function deleteFromCart(idx){
  let cartProducts = getFromLocalStorage("cartProducts") || [];
  let cartProductsCnt = getFromLocalStorage("cartProductsCnt")|| new Array(25).fill(0);
  cartProductsCnt.splice(cartProducts.indexOf(idx) , 1);
  cartProducts.splice(cartProducts.indexOf(idx) , 1);
  setToLocalStorage("cartProductsCnt" , cartProductsCnt);
  setToLocalStorage("cartProducts" , cartProducts);
  upDateCartCnt();
}



function deleteProduct() {
  const cartTable = document.getElementById("cart-table");

  cartTable.addEventListener("click", function (event) {
    const deleteElement = event.target.closest(".delete-element"); 
    const cartElement = event.target.closest(".cartElement");

    if (deleteElement && cartElement ) {
      cartElement.remove();

      const product = deleteElement.closest(".element-control");

      if (product) {
        const elementIdSpan = product.querySelector(".elementId");
        if (elementIdSpan) {
          const elementId = elementIdSpan.innerHTML.trim();
          console.log("Element ID:", elementId);
          deleteFromCart(elementId);
        }
      }
    }

  });
}



document.addEventListener("DOMContentLoaded", displayCart);
document.addEventListener("DOMContentLoaded", deleteProduct);
document.addEventListener("DOMContentLoaded", getProductIdPlus);
document.addEventListener("DOMContentLoaded", getProductIdMinus);