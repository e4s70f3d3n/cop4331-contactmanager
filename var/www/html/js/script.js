const urlBase = 'http://cop4331-15.xyz/LAMPAPI';
const extension = 'php';

let userId = 0;
let firstName = "";
let lastName = "";
let ids = []

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

					document.getElementById("registerResult").innerHTML = `Error: ${xhr.responseText}`;
					return;
				}

				userId = body.id;
				firstName = body.firstName;
				lastName = body.lastName;
				saveCookie();
				document.getElementById("registerResult").innerHTML = `Complete`;


				window.location.href = "contacts.html";

			}
			else {
				document.getElementById("registerResult").innerHTML = `Error ${xhr.status}: ${xhr.responseText}`;
				return;
			}
		};
		xhr.send(body);
	} catch (err) {
		document.getElementById("loginResult").innerHTML = err.message;
	}

}

function saveCookie() {
	let minutes = 20;
	let date = new Date();
	date.setTime(date.getTime() + (minutes * 60 * 1000));
	document.cookie = "firstName=" + firstName + ",lastName=" + lastName + ",userId=" + userId + ";expires=" + date.toGMTString();
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
					ids[i] = jsonObject.results[i].ID;
					text += "<tr id='row" + i + "'>";
					text += "<td><span id='first_Name" + i + "'>" + jsonObject.results[i].firstName + "</span></td>";
					text += "<td id='last_Name" + i + "'><span>" + jsonObject.results[i].lastName + "</span></td>";
					text += "<td id='phone" + i + "'><span>" + jsonObject.results[i].phone + "</span></td>";
					text += "<td id='email" + i + "'><span>" + jsonObject.results[i].email + "</span></td>";
					text += "<td>" +
						"<button type='button' id='edit_button" + i + "' class='w3-button w3-circle w3-lime' onclick='editContact(" + i + ")'>" + "<span class='glyphicon glyphicon-edit'></span>" + "Edit" + "</button>" +
						"<button type='button' id='save_button" + i + "' value='Save' class='w3-button w3-circle w3-lime' onclick='updateContact(" + i + ")' style='display: none'>" + "<span class='glyphicon glyphicon-saved'></span>" + "Update" + "</button>" +
						"<button type='button' onclick='deleteContact(" + i + ")' class='w3-button w3-circle w3-amber'>" + "<span class='glyphicon glyphicon-trash'></span> " + "Delete" + "</button>" + "</td>";
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
	//save the data
	let id1 = `first_Name${index}`;
	let id2 = `last_Name${index}`;
	let id3 = `phone${index}`;
	let id4 =`first_Name${index}`;
	
	let delFirst = document.getElementById(id1).value;
	let delLast = document.getElementById(id2).value;
	let delPhone = document.getElementById(id3).value;
	let delEmail = document.getElementById(id4).value;
	
	let temp = delFirst + delLast + delPhone + delEmail
	document.getElementById('p1').innerHTML = temp;
	//load a popup confirming delete

	//delete data


}


function editContact(index) {
	//get current row

	document.getElementById("p1").innerHTML = `row ${index}`
	//find userID -> readCookies 
	//open a container or switch the table to be editable -> needs to be adjusted, but it'sthere
	//listen for submit (saveNewContact) or cancel
}


function addContact() {
	//open div to add a contact 
	document.getElementById("addContainer").style.visibility = "visible";
}

function cancelAdd() {
	document.getElementById("addContainer").style.visibility = "collapse";
}

function saveNewContact() {
	let firstName = document.getElementById("addFirstName").value;
	let lastName = document.getElementById("addLastName").value;
	let phoneNumber = document.getElementById("addPhone").value;
	let email = document.getElementById("addEmail").value;


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

}