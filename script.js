const form = document.getElementById("form");
const name = document.getElementById("name");
const contact = document.getElementById("contact");
const email = document.getElementById("email");
const address = document.getElementById("address");

//add event listener
form.addEventListener("submit", (event) => {
  event.preventDefault();
  validate();
});
const sendData = (count, sRate, nameVal, contactVal, emailVal, addressVal) => {
  if (sRate === count) {
    fetch("http://localhost:8080/insert", {
      method: "POST",
      body: JSON.stringify({
        customerName: nameVal,
        contact: contactVal,
        email: emailVal,
        Address: addressVal,
      }),
      headers: {
        "Content-type": "application/json",
      },
    });

    Swal.fire("Good job! " + nameVal, " We will contact you soon");
  }
};
// for all data validation in form

const successMsg = (nameVal, contactVal, emailVal, addressVal) => {
  let formCon = document.getElementsByClassName("form-control");
  var count = formCon.length - 1;
  for (var i = 0; i < formCon.length; i++) {
    if (formCon[i].className === "form-control success") {
      var sRate = 0 + i;
      console.log(sRate);
      sendData(count, sRate, nameVal, contactVal, emailVal, addressVal);
    } else {
      return false;
    }
  }
};

// Additional email validation
const isEmail = (emailVal) => {
  var atSymbol = emailVal.indexOf("@");
  if (atSymbol < 1) return false;
  var dot = emailVal.lastIndexOf(".");
  if (dot <= atSymbol + 2) return false;
  if (dot === emailVal.length - 1) return false;
  return true;
};

// define the validate function
const validate = () => {
  const nameVal = name.value.trim();
  const emailVal = email.value.trim();
  const contactVal = contact.value.trim();
  const addressVal = address.value.trim();

  //validate name
  const reg = new RegExp("^[0-9]+$");
  if (nameVal === "") {
    setErrorMsg(name, "Name can not be blank");
  } else if (nameVal.length <= 2) {
    setErrorMsg(name, "Name min 3 char");
  } else if (reg.test(nameVal) === true) {
    setErrorMsg(name, "Name can not be number");
  } else {
    setSuccessMsg(name);
  }
  //validate email

  if (emailVal === "") {
    setErrorMsg(email, "email can not be blank");
  } else if (!isEmail(emailVal)) {
    setErrorMsg(email, "not a valid email");
  } else {
    setSuccessMsg(email);
  }

  // validate contact detail
  if (contactVal === "") {
    setErrorMsg(contact, "Mobile number can not be blank");
  } else if (contactVal.length !== 10) {
    setErrorMsg(contact, "Mobile number is not valid");
  } else {
    setSuccessMsg(contact);
  }
  // validate address
  if (addressVal === "") {
    setErrorMsg(address, "Address must be filled");
  } else if (addressVal.length < 15) {
    setErrorMsg(address, "Address must contain atleast 15 character");
  } else {
    setSuccessMsg(address);
  }
  successMsg(nameVal, contactVal, emailVal, addressVal);
};

function setErrorMsg(input, errorMsgs) {
  const formControl = input.parentElement;
  const small = formControl.querySelector("small");
  formControl.className = "form-control error";
  small.innerText = errorMsgs;
}
function setSuccessMsg(input) {
  const formControl = input.parentElement;
  formControl.className = "form-control success";
}
