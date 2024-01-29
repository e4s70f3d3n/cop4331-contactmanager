
function togglePwd() {

    let showPasswordEye = document.querySelector('.show-password');
    let passwordInput = document.querySelector('.password');

    showPasswordEye.addEventListener('click', () => {
        showPasswordEye.classList.toggle('fa-eye');

        showPasswordEye.classList.toggle('fa-eye-slash');

        passwordInput.type = passwordInput.type === 'password' ? 'text' : 'password';
    })
}