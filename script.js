// Función para agregar un cumpleaños al localStorage
function addBirthdayToLocalStorage(name, date) {
  const birthdays = JSON.parse(localStorage.getItem('birthdays')) || [];
  birthdays.push({ name, date });
  localStorage.setItem('birthdays', JSON.stringify(birthdays));
  loadBirthdaysFromLocalStorage(); // Recargar la lista después de agregar
}

// Función para cargar los cumpleaños desde el localStorage
function loadBirthdaysFromLocalStorage() {
  const birthdays = JSON.parse(localStorage.getItem('birthdays')) || [];
  const table = document.getElementById('birthdayTable').getElementsByTagName('tbody')[0];
  table.innerHTML = ''; // Limpiar la tabla antes de agregar los datos

  birthdays.forEach(birthday => {
    const row = table.insertRow();
    const nameCell = row.insertCell(0);
    const dateCell = row.insertCell(1);
    nameCell.textContent = birthday.name;
    dateCell.textContent = birthday.date;
  });
}

// Función para manejar el clic en "Agregar cumpleaños"
document.getElementById('addBirthday').addEventListener('click', function() {
  const name = document.getElementById('name').value;
  const date = document.getElementById('date').value;

  if (name && date) {
    addBirthdayToLocalStorage(name, date);
    document.getElementById('name').value = ''; // Limpiar campo nombre
    document.getElementById('date').value = ''; // Limpiar campo fecha
  }
});

// Función para manejar el clic en "Subir archivo .ics"
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

// Función para parsear un archivo .ics y extraer los cumpleaños
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

// Función para formatear las fechas en formato adecuado
function formatDate(dateStr) {
  return `${dateStr.slice(6, 8)}/${dateStr.slice(4, 6)}/${dateStr.slice(0, 4)}`;
}

// Función para actualizar la lista de cumpleaños en la tabla
function updateBirthdaysList(birthdays) {
  const table = document.getElementById('birthdayTable').getElementsByTagName('tbody')[0];
  table.innerHTML = ''; // Limpiar la tabla antes de mostrar nuevos datos

  birthdays.forEach(birthday => {
    const row = table.insertRow();
    const nameCell = row.insertCell(0);
    const dateCell = row.insertCell(1);
    nameCell.textContent = birthday.name;
    dateCell.textContent = birthday.date;
  });

  // Guardar los cumpleaños cargados en el localStorage
  localStorage.setItem('birthdays', JSON.stringify(birthdays));
}

// Cargar los cumpleaños almacenados al cargar la página
window.onload = function() {
  loadBirthdaysFromLocalStorage();
};
