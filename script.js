// Inicializar cumpleaños desde LocalStorage
let birthdays = JSON.parse(localStorage.getItem('birthdays')) || [];

// Referencias al DOM
const nameInput = document.getElementById('name');
const dateInput = document.getElementById('date');
const addButton = document.getElementById('addBirthday');
const generateButton = document.getElementById('generateICS');
const uploadButton = document.getElementById('uploadICS');
const fileInput = document.getElementById('fileInput');
const birthdayList = document.getElementById('birthdayList');

// Función para mostrar los cumpleaños cargados
function displayBirthdayList() {
  birthdayList.innerHTML = '';
  birthdays.forEach(({ name, date }) => {
    const listItem = document.createElement('li');
    listItem.textContent = `${name} - ${date}`;
    birthdayList.appendChild(listItem);
  });
}

// Agregar cumpleaños a la lista
addButton.addEventListener('click', () => {
  const name = nameInput.value.trim();
  const date = dateInput.value;

  if (!name || !date) {
    alert('Por favor, completá ambos campos.');
    return;
  }

  // Validar duplicados
  if (birthdays.some(b => b.name === name && b.date === date)) {
    alert('Este cumpleaños ya está en la lista.');
    return;
  }

  birthdays.push({ name, date });
  updateLocalStorage();
  nameInput.value = '';
  dateInput.value = '';
  displayBirthdayList();
});

// Actualizar LocalStorage
function updateLocalStorage() {
  localStorage.setItem('birthdays', JSON.stringify(birthdays));
}

// Generar archivo .ics
generateButton.addEventListener('click', () => {
  if (birthdays.length === 0) {
    alert('No hay cumpleaños para generar.');
    return;
  }

  let calendarData = 'BEGIN:VCALENDAR\nVERSION:2.0\n';
  birthdays.forEach(({ name, date }) => {
    const [year, month, day] = date.split('-');
    calendarData += `
BEGIN:VEVENT
SUMMARY:Cumpleaños de ${name}
DTSTART;VALUE=DATE:${year}${month}${day}
RRULE:FREQ=YEARLY
END:VEVENT
`;
  });
  calendarData += 'END:VCALENDAR';

  const blob = new Blob([calendarData], { type: 'text/calendar' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = 'cumpleaños.ics';
  link.click();

  alert('¡Archivo generado correctamente!');
});

// Subir archivo .ics
uploadButton.addEventListener('click', () => fileInput.click());
fileInput.addEventListener('change', async (event) => {
  const file = event.target.files[0];
  if (!file) return;

  const text = await file.text();
  const existingBirthdays = parseICS(text);

  // Fusionar cumpleaños existentes con los nuevos
  existingBirthdays.forEach(({ name, date }) => {
    if (!birthdays.some(b => b.name === name && b.date === date)) {
      birthdays.push({ name, date });
    }
  });

  updateLocalStorage();
  displayBirthdayList();
  alert('Cumpleaños cargados correctamente.');
});

// Función para leer cumpleaños desde archivo .ics
function parseICS(data) {
  const events = [];
  const lines = data.split('\n');
  let event = {};
  lines.forEach(line => {
    if (line.startsWith('SUMMARY:')) {
      event.name = line.split('SUMMARY:')[1];
    }
    if (line.startsWith('DTSTART;VALUE=DATE:')) {
      event.date = line.split('DTSTART;VALUE=DATE:')[1];
    }
    if (line.startsWith('END:VEVENT')) {
      events.push(event);
      event = {};
    }
  });
  return events;
}

// Mostrar cumpleaños cargados al cargar la página
displayBirthdayList();
