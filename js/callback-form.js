const callbackform = document.querySelector(".callback-form-container");
const requestReseivedModel = document.querySelector("#request-received");
const userName = document.querySelector("#callback-input-form-name");
const userEmail = document.querySelector("#callback-input-form-email");
const userPhone = document.querySelector("#callback-input-form-phone");
userPhone.addEventListener("click", function () {
  if (!userPhone.value.trim()) {
    userPhone.value = "+380";
  }
});
userPhone.addEventListener("blur", function () {
  if (userPhone.value === "+380") {
    userPhone.value = "";
  }
});
callbackform.addEventListener("submit", function (event) {
  event.preventDefault();
  let hasError = false;
  if (!userName.value.trim()) {
    userName.classList.add("callback-form-error");
    hasError = true;
  } else {
    userEmail.classList.remove("callback-form-error");
  }
  if (!userEmail.value.trim() || !isEmailValid(userEmail.value)) {
    userEmail.classList.add("callback-form-error");
    hasError = true;
  } else {
    userEmail.classList.remove("callback-form-error");
  }
  if (!userPhone.value.trim() || !isPhoneValid(userPhone.value)) {
    userPhone.classList.add("callback-form-error");
    hasError = true;
  } else {
    userPhone.classList.remove("callback-form-error");
  }
  if (hasError) {
    return;
  }
  userName.value = "";
  userEmail.value = "";
  userPhone.value = "";
  requestReseivedModel.classList.add("modal-active");
  setTimeout(function () {
    requestReseivedModel.classList.remove("modal-active");
  }, 2000);
});
function isPhoneValid(phone = "") {
  const regexp = /(\+38)?\(?\d{3}\)?[\s\.-]?(\d{7}|\d{3}[\s\.-]\d{2}[\s\.-]\d{2}|\d{3}-\d{4})/;

  return phone.match(regexp);
}

function isEmailValid(email) {
  const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(email.toLowerCase());
}
