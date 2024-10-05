$(document).ready(function() {
    // Efecto Typed.js para los estudios
    var options = {
        strings: ["Máster en Ciencia de Datos", "Licenciatura en Matemáticas"],
        typeSpeed: 40,
        backSpeed: 50,
        loop: true
    };
    var typed = new Typed(".typed", options);

    // Inicializa Particles.js
    particlesJS.load('particles-js', 'particles.json', function() {
        console.log('callback - particles.js config loaded');
    });

    // Envío del formulario de contacto
    $('#contact-form').submit(function(e) {
        e.preventDefault();
        alert("Tu mensaje ha sido enviado.");
    });
});
