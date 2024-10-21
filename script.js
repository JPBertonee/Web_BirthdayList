document.getElementById('budgetForm').addEventListener('submit', function(event) {
    event.preventDefault();

    // Obtener los valores ingresados por el usuario
    const area = document.getElementById('area').value;
    const location = document.getElementById('location').value;
    const photo = document.getElementById('photo').files[0];

    // Validar que se haya subido una foto
    if (!photo) {
        alert('Por favor, sube una foto del terreno.');
        return;
    }

    // Calcular el presupuesto
    const pricePerSquareMeter = 65 / 100;  // $65 por cada 100 m²
    const totalCost = area * pricePerSquareMeter;

    // Mostrar el resultado y la opción de reservar
    document.getElementById('result').innerHTML = `
        <p>El costo estimado para cortar el césped de un terreno de ${area} m² es de <strong>$${totalCost.toFixed(2)} AUD</strong>.</p>
        <button type="button" id="bookService">Reservar servicio</button>
    `;

    // Mostrar el formulario de booking al presionar el botón "Reservar servicio"
    document.getElementById('bookService').addEventListener('click', function() {
        document.getElementById('bookingForm').style.display = 'block';
    });
});

// Manejar la confirmación de reserva
document.getElementById('confirmBooking').addEventListener('click', function() {
    const email = document.getElementById('email').value;
    const phone = document.getElementById('phone').value;

    // Validación simple de que los campos estén llenos
    if (!email || !phone) {
        alert('Por favor, completa todos los campos.');
        return;
    }

    // Crear el cuerpo del correo
    const bookingDetails = `Nueva reserva:
    - Correo electrónico: ${email}
    - Teléfono: ${phone}`;

    // Simular el envío del correo (aquí se podría integrar un servicio de backend para enviar emails)
    alert('¡Reserva confirmada! Se enviará un correo a jbertone89@gmail.com con los detalles de la reserva.');

    // Aquí es donde se podría enviar el correo real utilizando un servidor backend
    // fetch('/api/send-email', {
    //     method: 'POST',
    //     headers: { 'Content-Type': 'application/json' },
    //     body: JSON.stringify({ email: 'jbertone89@gmail.com', message: bookingDetails })
    // });
});
