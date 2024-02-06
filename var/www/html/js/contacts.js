// let firstName = document.getElementById("contactFirstName").value;
// let lastName = document.getElementById("contactLastName").value;
// let phoneNumber = document.getElementById("contactPhone").value;

// let email = document.getElementById("contactEmail").value;
function enableCreateContact() {
    let disableCreateContact = document.getElementById("addNewContact").disable();

    if (validateContacts() === true) {
        disableCreateContact.enable();
    }
}



function validateContacts() {

    let phoneNumber = document.getElementById("contactPhone").value;

    if (phoneNumber ==="") {
        console.log("Please enter a phone number.")
        return false;
    }

    // regex to validate united states phone number
    let regex = /^\(?(\d{3})\)?[- ]?(\d{3})[- ]?(\d{4})$/;

    if (regex.test(phoneNumber) === false) {
        console.log("Please enter a valid phone number");
        return "false";
    } else {
        return "true";
    }
}