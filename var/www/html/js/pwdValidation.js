
let passwordChecklist = document.querySelectorAll('.criteria-listed')

function togglePwd() {

    let showPasswordEye = document.querySelector('.show-password');
    let passwordInput = document.querySelector('.password');


    showPasswordEye.addEventListener('click', () => {
        showPasswordEye.classList.toggle('fa-eye');

        showPasswordEye.classList.toggle('fa-eye-slash');

        passwordInput.type = passwordInput.type === 'password' ? 'text' : 'password';
    })
}

let validRegex = [
    // regex must contain a minimum of 8 letters.
    { regex: /.{8,}/ },
    // regex must contain a number through 0-9.
    { regex: /[0-9]/ },
    // regex must contain a lower-case letter: a-z.
    { regex: /[a-z]/ },
    // regex must contain an upper-case letter: A-Z.
    { regex: /[A-Z]/ },
    // regex must contain a special character.
    { regex: /[^A-Za-z0-9]/ }
]


function pwdValidation(passwordInput) {
    passwordInput.addEventListener('keyup', () => {
        validRegex.forEach((item, i) => {

            let isValid = item.regex.test(passwordInput.value)

            if (isValid) {
                passwordChecklist[i].classList.add('checked');
            } else {
                passwordChecklist[i].classList.remove('checked');
            }
        })
    })
}