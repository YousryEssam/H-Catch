const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
const passwordRegex =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
let switchCtn = document.querySelector("#switch-cnt");
let switchC1 = document.querySelector("#switch-c1");
let switchC2 = document.querySelector("#switch-c2");
let switchCircle = document.querySelectorAll(".switch__circle");
let switchBtn = document.querySelectorAll(".switch-btn");
let aContainer = document.querySelector("#a-container");
let bContainer = document.querySelector("#b-container");
let allButtons = document.querySelectorAll(".submit");

let getButtons = (e) => e.preventDefault();

let changeForm = (e) => {
  switchCtn.classList.add("is-gx");
  setTimeout(function () {
    switchCtn.classList.remove("is-gx");
  }, 1500);

  switchCtn.classList.toggle("is-txr");
  switchCircle[0].classList.toggle("is-txr");
  switchCircle[1].classList.toggle("is-txr");

  switchC1.classList.toggle("is-hidden");
  switchC2.classList.toggle("is-hidden");
  aContainer.classList.toggle("is-txl");
  bContainer.classList.toggle("is-txl");
  bContainer.classList.toggle("is-z200");
};

let mainF = (e) => {
  for (var i = 0; i < allButtons.length; i++)
    allButtons[i].addEventListener("click", getButtons);
  for (var i = 0; i < switchBtn.length; i++)
    switchBtn[i].addEventListener("click", changeForm);
};

window.addEventListener("load", mainF);


function clearValidationSpan() {
  let validationSpanSU = document.getElementById("validationSpanSU");
  validationSpanSU.innerHTML = "";
  let validationSpanSI = document.getElementById("validationSpanSI");
  validationSpanSI.innerHTML = "";
}
////

/**
 * Function to create a user object
 * @param {string} email - The email address of the user
 * @param {string} name - The name of the user
 * @param {string} password - The password of the user
 * @returns {object} - An object containing email, name, and password
 */
function createUser(email, name, password) {
  return {
    email: email,
    name: name,
    password: password,
  };
}

///



function signUp() {
  let userName = document.getElementById("userSUName").value;
  let userEmail = document.getElementById("userSUEmail").value;
  let userPassword = document.getElementById("userSUPassword").value;
  let validationSpan = document.getElementById("validationSpanSU");
  clearValidationSpan();
  if (userName.length < 3) {
    validationSpan.innerHTML +=
      "Invalid Name , Your name must be more than 2 latters.";
    validationSpan.style.display = "inline-block";
  }
  if (emailRegex.test(userEmail) == false) {
    if (validationSpan.innerHTML.length > 0) {
      validationSpan.appendChild(document.createElement("br"));
    }
    validationSpan.innerHTML += "Invalid email";
    validationSpan.style.display = "inline-block";
  }
  if (passwordRegex.test(userPassword) == false) {
    if (validationSpan.innerHTML.length > 0) {
      validationSpan.appendChild(document.createElement("br"));
    }
    validationSpan.innerHTML += "Invalid password :";
    validationSpan.appendChild(document.createElement("br"));
    validationSpan.innerHTML +=
      "- Password must be at least 8 characters long.";
    validationSpan.appendChild(document.createElement("br"));
    validationSpan.innerHTML +=
      "- Password must contain at least one special character (e.g., @, $, !, %, *, ?, &).";
    validationSpan.style.display = "inline-block";
  }
  if (validationSpan.innerHTML.length > 0) {
    return;
  }
  if (window.localStorage.getItem(userEmail) == null) {
    window.localStorage.setItem(
      userEmail,
      JSON.stringify(createUser(userEmail, userName, userPassword))
    );
    alert("Account created successfully");
  }
}

function signIn() {
  let userEmail = document.getElementById("userSIEmail").value;
  let userPassword = document.getElementById("userSIPassword").value;
  let validationSpan = document.getElementById("validationSpanSI");
  clearValidationSpan();
  if (emailRegex.test(userEmail) == false) {
    if (validationSpan.innerHTML.length > 0) {
      validationSpan.appendChild(document.createElement("br"));
    }
    validationSpan.innerHTML += "Invalid email";
    validationSpan.style.display = "inline-block";
  }
  if (passwordRegex.test(userPassword) == false) {
    if (validationSpan.innerHTML.length > 0) {
      validationSpan.appendChild(document.createElement("br"));
    }
    validationSpan.innerHTML += "Invalid password :";
    validationSpan.appendChild(document.createElement("br"));
    validationSpan.innerHTML +=
      "- Password must be at least 8 characters long.";
    validationSpan.appendChild(document.createElement("br"));
    validationSpan.innerHTML +=
      "- Password must contain at least one special character (e.g., @, $, !, %, *, ?, &).";
    validationSpan.style.display = "inline-block";
  }
  if (validationSpan.innerHTML.length > 0) {
    return;
  }
  let user =JSON.parse(localStorage.getItem(userEmail));
  if (user == null) {
    validationSpan.innerHTML += "User does not exist.";
    validationSpan.style.display = "inline-block";
    return;
  }
  console.log();
  if(user.password != userPassword){
    validationSpan.innerHTML += "Wrong Password.";
    validationSpan.style.display = "inline-block";
    return;
  }
  userIn(user);
  window.location = "index.html";
}

function userIn(user){
    localStorage.setItem(
        "UserIN",
        JSON.stringify(user)
    );
}