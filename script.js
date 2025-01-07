document.addEventListener('DOMContentLoaded', function() {
  let birthdays = []; // Aquí almacenaremos los cumpleaños

  // Función para mostrar cumpleaños en la pantalla
  function displayBirthdays() {
      let list = document.getElementById('birthdays-list');
      list.innerHTML = ''; // Limpiamos la lista antes de añadir nuevos elementos
      birthdays.forEach((birthday, index) => {
          let item = document.createElement('li');
          item.classList.add('birthday-item');
          item.innerHTML = `${birthday.name} - ${birthday.date} <button class="delete-btn" data-index="${index}">Eliminar ❌</button>`;
          list.appendChild(item);
      });

      // Añadir funcionalidad de eliminación
      document.querySelectorAll('.delete-btn').forEach(button => {
          button.addEventListener('click', function() {
              let index = button.getAttribute('data-index');
              birthdays.splice(index, 1);
              displayBirthdays();
          });
      });
  }

  // Añadir cumpleaños desde el formulario
  document.getElementById('add-birthday-form').addEventListener('submit', function(e) {
      e.preventDefault();
      let name = document.getElementById('name').value;
      let date = document.getElementById('date').value;
      if (name && date) {
          birthdays.push({ name, date });
          displayBirthdays();
          document.getElementById('name').value = '';
          document.getElementById('date').value = '';
          showConfirmationMessage('Cumpleaños añadido correctamente!');
      }
  });

  // Generar archivo .ics
  document.getElementById('generate-ics').addEventListener('click', function() {
      let icsContent = "BEGIN:VCALENDAR\nVERSION:2.0\n";
      birthdays.forEach(birthday => {
          let [year, month, day] = birthday.date.split('-');
          icsContent += `BEGIN:VEVENT\nDTSTART;VALUE=DATE:${year}${month}${day}\nSUMMARY:${birthday.name}\nEND:VEVENT\n`;
      });
      icsContent += "END:VCALENDAR";
      let blob = new Blob([icsContent], { type: 'text/calendar;charset=utf-8' });
      let link = document.createElement('a');
      link.href = URL.createObjectURL(blob);
      link.download = 'birthdays.ics';
      link.click();
  });

  // Cargar archivo .ics y borrar registros manuales
  document.getElementById('upload-btn').addEventListener('click', function() {
      let file = document.getElementById('upload-ics').files[0];
      if (file) {
          birthdays = []; // Borramos todos los registros actuales antes de cargar los nuevos
          let reader = new FileReader();
          reader.onload = function(e) {
              let content = e.target.result;
              let events = content.match(/BEGIN:VEVENT[\s\S]*?END:VEVENT/g);
              if (events) {
                  events.forEach(event => {
                      let name = event.match(/SUMMARY:(.*)/);
                      let date = event.match(/DTSTART;VALUE=DATE:(\d{8})/);
                      if (name && date) {
                          let formattedDate = date[1].replace(/(\d{4})(\d{2})(\d{2})/, '$1-$2-$3');
                          birthdays.push({ name: name[1].trim(), date: formattedDate });
                      }
                  });
                  displayBirthdays(); // Mostrar los cumpleaños cargados del archivo
                  showConfirmationMessage('Cumpleaños cargados desde el archivo!');
              }
          };
          reader.readAsText(file);
      }
  });

  // Función para mostrar un mensaje de confirmación
  function showConfirmationMessage(message) {
      let confirmationMessage = document.createElement('div');
      confirmationMessage.classList.add('confirmation-message');
      confirmationMessage.textContent = message;
      document.body.appendChild(confirmationMessage);
      setTimeout(() => {
          confirmationMessage.style.display = 'none';
      }, 3000);
  }
});
