const urlBase = 'http://cop4331-15.xyz/LAMPAPI';
const extension = 'php';

let userId = 0;
let firstName = "";
let lastName = "";

function useLogin() {
    userId = 0;
    firstName = "";
    lastName = "";

    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;
    //	var hash = md5( password );

    if (username == "") {
        alert("No username entered")
    } else if (password == "") {
            alert("No password entered")
        } else {
            sendLoginDetails(username, password);
        }
    }

    function sendLoginDetails(username, password) {
        const xmlhttp = new XMLHttpRequest();
        const url = "login.php?username=" + username + "&password=" + password;
        xmlhttp.onreadystatechange = function() {
            if (this.readyState == 4 && this.status == 200) {
                if (this.responseText.trim() != "") {
                    let response = this.responseText;
                    alert(response);
                }
            }
        }
        xmlhttp.open("GET",url,true);
        xmlhttp.send();
    }

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
                    document.getElementById("loginResult").style.visibility = "visble";

                    return;
                }

                firstName = jsonObject.firstName;
                lastName = jsonObject.lastName;

                saveCookie();

                window.location.href = "landing.html";
            }
        };
        xhr.send(jsonPayload);
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