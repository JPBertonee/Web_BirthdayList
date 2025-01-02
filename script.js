// Almacenar un cumpleaños en el localStorage
function addBirthdayToLocalStorage(name, date) {
  const birthdays = JSON.parse(localStorage.getItem('birthdays')) || [];
  birthdays.push({ name, date });
  localStorage.setItem('birthdays', JSON.stringify(birthdays));
}

// Obtener los cumpleaños desde el localStorage
function loadBirthdaysFromLocalStorage() {
  const birthdays = JSON.parse(localStorage.getItem('birthdays')) || [];
  const table = document.getElementById('birthdayTable');
  table.innerHTML = ''; // Limpiar tabla antes de mostrar los nuevos datos

  birthdays.forEach(birthday => {
    const row = table.insertRow();
    const nameCell = row.insertCell(0);
    const dateCell = row.insertCell(1);
    nameCell.textContent = birthday.name;
    dateCell.textContent = birthday.date;
  });
}

// Manejo del formulario y agregar cumpleaños
document.getElementById('addBirthday').addEventListener('click', function() {
  const name = document.getElementById('name').value;
  const date = document.getElementById('date').value;

  if (name && date) {
    addBirthdayToLocalStorage(name, date);
    loadBirthdaysFromLocalStorage(); // Recargar los cumpleaños mostrados
    document.getElementById('name').value = ''; // Limpiar campo de nombre
    document.getElementById('date').value = ''; // Limpiar campo de fecha
  }
});

// Cargar los cumpleaños desde un archivo .ics
document.getElementById('fileInput').addEventListener('change', function(event) {
  const file = event.target.files[0];
  if (file && file.name.endsWith('.ics')) {
    const reader = new FileReader();
    reader.onload = function(e) {
      const icsData = e.target.result;
      const birthdays = parseICS(icsData);
      updateBirthdaysList(birthdays);
    };
    reader.readAsText(file);
  }
});

// Parsear el archivo .ics y extraer los cumpleaños
function parseICS(data) {
  const birthdays = [];
  const regex = /BEGIN:VEVENT[\s\S]*?SUMMARY:(.*?)\s*DTSTART;VALUE=DATE:(\d{8})/g;
  let match;

  while ((match = regex.exec(data)) !== null) {
    const name = match[1].trim();
    const date = match[2];
    birthdays.push({ name, date: formatDate(date) });
  }

  return birthdays;
}

// Formatear la fecha de cumpleaños en formato adecuado
function formatDate(dateStr) {
  return `${dateStr.slice(6, 8)}/${dateStr.slice(4, 6)}/${dateStr.slice(0, 4)}`;
}

// Actualizar la lista de cumpleaños mostrada
function updateBirthdaysList(birthdays) {
  const table = document.getElementById('birthdayTable');
  table.innerHTML = ''; // Limpiar tabla antes de mostrar los nuevos datos

  birthdays.forEach(birthday => {
    const row = table.insertRow();
    const nameCell = row.insertCell(0);
    const dateCell = row.insertCell(1);
    nameCell.textContent = birthday.name;
    dateCell.textContent = birthday.date;
  });

  // Guardar los cumpleaños cargados en localStorage para persistirlos
  localStorage.setItem('birthdays', JSON.stringify(birthdays));
}

// Cargar los cumpleaños almacenados en el localStorage cuando la página se carga
loadBirthdaysFromLocalStorage();
