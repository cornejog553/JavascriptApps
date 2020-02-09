// pulling in all dom elements

const form = document.getElementById("form");
const username = document.getElementById("username");
const email = document.getElementById("email");
const password = document.getElementById("password");
const password2 = document.getElementById("password2");

// Show input error message
function showError(input, message) {
  const formControl = input.parentElement; //This gets form-control which we add the error class to.
  formControl.className = "form-control error";
  const small = formControl.querySelector("small"); //grabbing the small tag within form-control
  small.innerText = message; //displays error message that is passed in when calling function
}

// Show success outline
function showSuccess(input) {
  const formControl = input.parentElement; //This gets form-control which we add the success class to.
  formControl.className = "form-control success";
}

// Check email is valid
function isValidEmail(email) {
  const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
}

// check required fields
function checkRequired(inputArr) {
  inputArr.forEach(function(input) {
    if (input.value.trim() === "") {
      showError(input, `${getFieldName(input)} is required`); // Grabbing input id so that it displays correct error message
    } else {
      showSuccess(input);
    }
  });
}

// get field name. this makes the first letter of input id capital
function getFieldName(input) {
  return input.id.charAt(0).toUpperCase() + input.id.slice(1);
}

// Event listeners

// Adding event listener for when we submit
form.addEventListener("submit", function(e) {
  //   Prevents just a flash when clicking submit
  e.preventDefault();

  checkRequired([username, email, password, password2]);
});
