let passform = document.getElementById("password");
let pNumInput = document.getElementById("passNum");
let pUpperInput = document.getElementById("passUpper");
let pLowerInput = document.getElementById("passLower");
let pSpecInput = document.getElementById("passSpecial");
let pLenInput = document.getElementById("passLen");

passform.onkeyup = function () {
    var nums = /[0-9]/g;
    var upper = /[A-Z]/g;
    var lower = /[a-z]/g;
    var spec = /[!@#$%^&*]/g;

        //check length
        if (passform.value.length >= 8) {
          pLenInput.classList.remove("invalid");
          pLenInput.classList.add("valid");
        }

        else {
          pLenInput.classList.remove("valid");
          pLenInput.classList.add("invalid");
        }

        //check numbers
        if (passform.value.match(nums)) {
          pNumInput.classList.remove("invalid");
          pNumInput.classList.add("valid");
        }

        else {
          pNumInput.classList.remove("valid");
          pNumInput.classList.add("invalid");
        }

        if (passform.value.match(lower)) {
          pLowerInput.classList.remove("invalid");
          pLowerInput.classList.add("valid");
        }

        else {
          pLowerInput.classList.remove("valid");
          pLowerInput.classList.add("invalid");
        }

        if (passform.value.match(upper)) {
            pUpperInput.classList.remove("invalid");
            pUpperInput.classList.add("valid");
          }
  
        else {
            pUpperInput.classList.remove("valid");
            pUpperInput.classList.add("invalid");
          }

        if (passform.value.match(spec)) {
          pSpecInput.classList.remove("invalid");
          pSpecInput.classList.add("valid");
        }

        else {
          pSpecInput.classList.remove("valid");
          pSpecInput.classList.add("invalid");
        }
    }