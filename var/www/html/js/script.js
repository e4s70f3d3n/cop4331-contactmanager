const urlBase = 'http://cop4331-15.xyz/LAMPAPI';
const extension = 'php';

let userId = 0;
let firstName = "";
let lastName = "";

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

				window.location.href = "landing.html";
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

				//if there is an error, change register result and return 
				if (jsonObject.error) {
					document.getElementById("registerResult").innerHTML = `Error: ${xhr.responseText}`;
					return;
				}

				userId = body.id;
				firstName = body.firstName;
				lastName = body.lastName;
				saveCookie();
				document.getElementById("registerResult").innerHTML = `Complete`;


				window.location.href = "landing.html";
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
					alert(jsonObject.error);
					return;
				}

				document.getElementById("p1").innerHTML = "Success" + jsonObject.results;

				//add to table
				let text = "<table border='1'>"
				for (let i = 0; i < jsonObject.results.length; i++) {
					ids[i] = jsonObject.results[i].ID
					text += "<tr id='row" + i + "'>"
					text += "<td id='first_Name" + i + "'><span>" + jsonObject.results[i].FirstName + "</span></td>";
					text += "<td id='last_Name" + i + "'><span>" + jsonObject.results[i].LastName + "</span></td>";
					text += "<td id='email" + i + "'><span>" + jsonObject.results[i].EmailAddress + "</span></td>";
					text += "<td id='phone" + i + "'><span>" + jsonObject.results[i].PhoneNumber + "</span></td>";
					text += "<td>" +
						"<button type='button' id='edit_button" + i + "' class='w3-button w3-circle w3-lime' onclick='editContact(" + i + ")'>" + "<span class='glyphicon glyphicon-edit'></span>" + "</button>" +
						"<button type='button' id='save_button" + i + "' value='Save' class='w3-button w3-circle w3-lime' onclick='updateContact(" + i + ")' style='display: none'>" + "<span class='glyphicon glyphicon-saved'></span>" + "</button>" +
						"<button type='button' onclick='deleteContact(" + i + ")' class='w3-button w3-circle w3-amber'>" + "<span class='glyphicon glyphicon-trash'></span> " + "</button>" + "</td>";
					text += "<tr/>"
				}
			}
		};
	}
	catch (err) {
		return;
	}
}

function deleteContact(index) {

}


function editContact(index) {
	//get current row

	document.getElementById("p1").innerHTML = `row ${index}`
	//find userID
	//open a container or switch the table to be editable
	//listen for submit or cancel
}

function addContact() {
	//open div to add a contact 
	document.getElementById("addContainer").style.visibility = "visible";
	//open 
}

function cancelAdd() {
	document.getElementById("addContainer").style.visibility = "collapse";
}

function saveNewContact() {
	document.getElementById("p1").innerHTML = "Hey there"
}
