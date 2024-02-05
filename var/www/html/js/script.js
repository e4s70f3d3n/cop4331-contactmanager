const urlBase = 'http://cop4331-15.xyz/LAMPAPI';
const extension = 'php';

let userId = 0;
let firstName = "";
let lastName = "";
const ids = []

function doLogin() {
	userId = 0;
	firstName = "";
	lastName = "";

	let login = document.getElementById("username").value;
	let password = document.getElementById("password").value;
	//	var hash = md5( password );

	document.getElementById("loginResult").innerHTML = "";

	let tmp = { login: login, password: password };
	//	var tmp = {login:login,password:hash};
	let jsonPayload = JSON.stringify(tmp);

	let url = urlBase + '/Login.' + extension;

	let xhr = new XMLHttpRequest();
	xhr.open("POST", url, true);
	xhr.setRequestHeader("Content-type", "application/json; charset=UTF-8");
	try {
		xhr.onreadystatechange = function () {
			if (this.readyState == 4 && this.status == 200) {
				let jsonObject = JSON.parse(xhr.responseText);
				userId = jsonObject.id;

				if (userId < 1) {
					document.getElementById("loginResult").innerHTML = "User/Password combination incorrect";
					return;
				}

				firstName = jsonObject.firstName;
				lastName = jsonObject.lastName;

				saveCookie();

				window.location.href = "contacts.html";
			}
		};
		xhr.send(jsonPayload);
	}
	catch (err) {
		document.getElementById("loginResult").innerHTML = err.message;
	}

}

function doRegister() {


	firstName = document.getElementById("firstName").value;
	lastName = document.getElementById("lastName").value;
	let username = document.getElementById("username").value;
	let password = document.getElementById("password").value;

	const url = urlBase + "/Register." + extension;

	const body = JSON.stringify({
		firstName: firstName,
		lastName: lastName,
		login: username,
		password: password
	})

	const xhr = new XMLHttpRequest();
	xhr.open("POST", url, true);
	xhr.setRequestHeader("Content-Type", "application/json; charset = UTF-8");

	try {
		xhr.onreadystatechange = function () {
			if (xhr.readyState == 4 && xhr.status == 200) {

				let jsonObject = JSON.parse(xhr.responseText);

				//if there is an error, send an alert
				if (jsonObject.error) {

					document.getElementById("registerResult").innerHTML = `Username already exists`;
					return;
				}

				userId = body.id;
				firstName = body.firstName;
				lastName = body.lastName;;
				document.getElementById("registerResult").innerHTML = `User created`;

				saveCookie();

				window.location.href = "contacts.html";


			}
			else {
				document.getElementById("registerResult").innerHTML = `Username already exists`;
				return;
			}
		};
		xhr.send(body);
	} catch (err) {
		document.getElementById("registerResult").innerHTML = err.message;
	}

}

function saveCookie() {
	let minutes = 20;
	let date = new Date();
	date.setTime(date.getTime() + (minutes * 60 * 1000));
	document.cookie = "firstName=" + firstName + ",lastName=" + lastName + ",userId=" + userId + ";expires=" + date.toGMTString();
}

function returnCookie(firstName, lastName, userId) {
	let minutes = 20;
	let date = new Date();
	date.setTime(date.getTime() + (minutes * 60 * 1000));
	return document.cookie = "firstName=" + firstName + ",lastName=" + lastName + ",userId=" + userId + ";expires=" + date.toGMTString();
}

function readCookie() {
	userId = -1;
	let data = document.cookie;
	let splits = data.split(",");
	for (var i = 0; i < splits.length; i++) {
		let thisOne = splits[i].trim();
		let tokens = thisOne.split("=");
		if (tokens[0] == "firstName") {
			firstName = tokens[1];
		}
		else if (tokens[0] == "lastName") {
			lastName = tokens[1];
		}
		else if (tokens[0] == "userId") {
			userId = parseInt(tokens[1].trim());
		}
	}

	if (userId < 0) {
		window.location.href = "index.html";
	}
	else {
		document.getElementById("f").innerHTML = "Logged in as " + firstName + " " + lastName;
		//window.location.href = "contacts.html";

	}
}

function doLogout() {
	userId = 0;
	firstName = "";
	lastName = "";
	document.cookie = "firstName= ; expires = Thu, 01 Jan 1970 00:00:00 GMT";
	window.location.href = "index.html";
}

function searchContacts() {
	const searchResults = document.getElementById("searchBar");
	const results = searchResults.value.toUpperCase().split(' ');
	const table = document.getElementById("contacts");
	const tr = table.getElementsByTagName("tr");

	for (let i = 0; i < tr.length; i++) {
		const tdFirstName = tr[i].getElementsByTagName("td")[0];
		const tdLastName = tr[i].getElementsByTagName("td")[1];

		if (tdFirstName && tdLastName) {
			const firstNameVal = tdFirstName.textContent || tdFirstName.innerText;
			const lastNameVal = tdLastName.textContent || tdLastName.innerText;
			tr[i].style.display = "none";

			for (selection of results) {
				if(firstNameVal.toUpperCase().indexOf(selection) > -1) {
					tr[i].style.display = "";
				}
				if (lastNameVal.toUpperCase().indexOf(selection) > -1) {
					tr[i].style.display = ""
				}
			}
		}

	}

}

function doSearch() {
	let search = document.getElementById("searchBar").value;

	let jsonPayload = JSON.stringify({
		search: search,
		userId: userId
	});

	let url = urlBase + '/SearchContacts.' + extension;

	let xhr = new XMLHttpRequest();
	xhr.open("POST", url, true);
	xhr.setRequestHeader("Content-type", "application/json; charset=UTF-8");
	try {
		xhr.onreadystatechange = function () {
			if (this.readyState == 4 & this.status == 200) {
				jsonObject = JSON.parse(xhr.responseText);

				if (jsonObject.error) {
					//	alert(jsonObject.error);
					return;
				}

				//add to table
				let text = "<table>"
				for (let i = 0; i < jsonObject.results.length; i++) {
					ids[i] = jsonObject.results[i].id;
					text += "<tr id='row" + i + "'>";
					text += "<td><span id='first_Name" + i + "'>" + jsonObject.results[i].firstName + "</span></td>";
					text += "<td id='last_Name" + i + "'><span>" + jsonObject.results[i].lastName + "</span></td>";
					text += "<td id='phone" + i + "'><span>" + jsonObject.results[i].phone + "</span></td>";
					text += "<td id='email" + i + "'><span>" + jsonObject.results[i].email + "</span></td>";
					text += "<td>" +
						"<button type='button' id='edit_button" + i + "' class='editButton' onclick='editContact(" + i + ")'>" + "<span class='glyphicon glyphicon-edit'></span>" + "Edit" + "</button>" +
						"<button type='button' id='save_button" + i + "' value='Save' class='saveButton' onclick='updateContact(" + i + ")' style='display: none'>" + "<span class='glyphicon glyphicon-saved'></span>" + "Save" + "</button>" +
						"<button type='button' onclick='deleteContact(" + i + ")' class='deleteButton'" + "<span class='glyphicon glyphicon-trash'></span> " + "Delete" + "</button>" + "</td>";
					text += "<tr/>"
				}
				text += "</table>";
				document.getElementById("contactBody").innerHTML = text
			}
		};
		xhr.send(jsonPayload);
	}
	catch (err) {
		return;
	}
}

function deleteContact(index) {

	var fname_val = document.getElementById("first_Name" + index).innerText;
	var lname_val = document.getElementById("last_Name" + index).innerText;
	let fname = fname_val.substring(0, fname_val.length);
	let lname = lname_val.substring(0, lname_val.length);
	let check = confirm('Are you sure you want to delete the following contact?: ' + fname + ' ' + lname);
	if (check === true) {
		document.getElementById("row" + index + "").outerHTML = "";

		let tmp = {
			ID: ids[index]
		};

		let jsonPayload = JSON.stringify(tmp);

		let url = urlBase + '/Delete.' + extension;

		let xhr = new XMLHttpRequest();
		xhr.open("POST", url, true);
		xhr.setRequestHeader("Content-type", "application/json; charset=UTF-8");
		try {
			xhr.onreadystatechange = function () {
				if (this.readyState == 4 && this.status == 200) {

					console.log("DELETED");
					doSearch();
				}
			};
			xhr.send(jsonPayload);
		} catch (err) {
			console.log(err.message);
		}
	};
}


function editContact(index) {
	document.getElementById("edit_button" + index).style.display = "none";
	document.getElementById("save_button" + index).style.display = "inline-block";

	var firstNameI = document.getElementById("first_Name" + index);
	var lastNameI = document.getElementById("last_Name" + index);
	var email = document.getElementById("email" + index);
	var phone = document.getElementById("phone" + index);

	var fname_data = firstNameI.innerText;
	var lname_data = lastNameI.innerText;
	var email_data = email.innerText;
	var phone_data = phone.innerText;

	firstNameI.innerHTML = "<input type='text' id='fname_text" + index + "' value='" + fname_data + "'>";
	lastNameI.innerHTML = "<input type='text' id='lname_text" + index + "' value='" + lname_data + "'>";
	email.innerHTML = "<input type='text' id='email_text" + index + "' value='" + email_data + "'>";
	phone.innerHTML = "<input type='text' id='phone_text" + index + "' value='" + phone_data + "'>";
}

function updateContact(index) {
	var fname_val = document.getElementById("fname_text" + index).value;
	var lname_val = document.getElementById("lname_text" + index).value;
	var email_val = document.getElementById("email_text" + index).value;
	var phone_val = document.getElementById("phone_text" + index).value;
	var id_val = ids[index]

	document.getElementById("first_Name" + index).innerHTML = fname_val;
	document.getElementById("last_Name" + index).innerHTML = lname_val;
	document.getElementById("email" + index).innerHTML = email_val;
	document.getElementById("phone" + index).innerHTML = phone_val;

	document.getElementById("edit_button" + index).style.display = "inline-block";
	document.getElementById("save_button" + index).style.display = "none";

	let tmp = {

		firstName: fname_val,
		lastName: lname_val,
		phone: phone_val,
		email: email_val,
		ID: id_val
	};

	let jsonPayload = JSON.stringify(tmp);

	let url = urlBase + '/UpdateContact.' + extension;
	let xhr = new XMLHttpRequest();

	xhr.open("POST", url, true);
	xhr.setRequestHeader("Content-type", "application/json; charset=UTF-8");
	try {
		xhr.onreadystatechange = function () {

			if (this.readyState == 4 && this.status == 200) {
				doSearch();
			}

		};
		xhr.send(jsonPayload);
	} catch (err) {
		console.log(err.message);
	}

}

function saveNewContact() {
	let firstName = document.getElementById("contactFirstName").value;
	let lastName = document.getElementById("contactLastName").value;
	let phoneNumber = document.getElementById("contactPhone").value;
	let email = document.getElementById("contactEmail").value;


	const body = JSON.stringify({
		firstName: firstName,
		lastName: lastName,
		phone: phoneNumber,
		email: email,
		userId: userId
	});

	let url = urlBase + '/AddContact.' + extension;

	let xhr = new XMLHttpRequest();
	xhr.open("POST", url, true);
	xhr.setRequestHeader("Content-type", "application/json; charset=UTF-8");

	try {
		xhr.onreadystatechange = function () {
			if (this.readyState == 4 && this.status == 200) {
				let jsonObj = JSON.parse(xhr.responseText);
				//error check

				if (jsonObj.error) {
					alert(jsonObj.error);
					return;
				}

				document.getElementById("addContactResult").innerHTML = "complete!";

				//reset the div
			}
			else {
				document.getElementById("addContactResult").innerHTML = `Error ${xhr.status}: ${xhr.responseText}`;
				return;
			}
		};
		xhr.send(body);
	}
	catch (err) {
		document.getElementById("addContactResult").innerHTML = err.message;

	}

	dialog.close();
	document.getElementById('contactsTable').style.visibility = "visible";


}

function checkPassword() {
	let initPassword = document.getElementById("password").value;
	let checkPass = document.getElementById("checkPassInput").value;

	if (initPassword !== checkPass) {
		document.getElementById("checkPassResult").style.visibility = "visible";
		document.getElementById("checkPassResult").innerHTML = "<br/>" + "❌Passwords much match!";
		document.getElementById("checkPassResult").style.color = "red";
	}
	else {
		document.getElementById("checkPassResult").innerHTML = "<br/>" + "✅Passwords match!";
		document.getElementById("checkPassResult").style.color = "green";
		passCheck = true;
	}
}