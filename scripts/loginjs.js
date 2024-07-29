// script.js

document.addEventListener('DOMContentLoaded', function() {
    const loginForm = document.getElementById('login-form');
    const passwordInput = document.getElementById('password');
    const adminPassword = 'admin123'; // Güvenlik için daha güçlü bir şifre kullanılmalıdır

    loginForm.addEventListener('submit', function(event) {
        event.preventDefault(); // Formun varsayılan şekilde gönderilmesini engelle

        const enteredPassword = passwordInput.value;

        if (enteredPassword === adminPassword) {
            // Şifre doğruysa admin paneline yönlendir
            window.location.href = 'admin.html';
        } else {
            // Şifre yanlışsa kullanıcıyı bilgilendir
            alert('Şifre yanlış!');
        }
    });
});
    