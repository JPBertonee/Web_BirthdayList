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
    const pricePerSquareMeter = 0.50;  // Precio por metro cuadrado
    const totalCost = area * pricePerSquareMeter;

    // Mostrar el resultado
    document.getElementById('result').innerHTML = `
        <p>El costo estimado para cortar el césped de un terreno de ${area} m² es de <strong>$${totalCost.toFixed(2)}</strong>.</p>
        <p>Ubicación: ${location}</p>
    `;
});
