document.addEventListener('DOMContentLoaded', function() {
    let birthdays = []; // Here we will store the birthdays
  
    // Function to display birthdays on the screen
    function displayBirthdays() {
        let list = document.getElementById('birthdays-list');
        list.innerHTML = ''; // Clear the list before adding new items
        birthdays.forEach((birthday, index) => {
            let item = document.createElement('li');
            item.classList.add('birthday-item');
            item.innerHTML = `${birthday.name} - ${birthday.date} <button class="delete-btn" data-index="${index}">Delete ❌</button>`;
            list.appendChild(item);
        });
  
        // Add deletion functionality
        document.querySelectorAll('.delete-btn').forEach(button => {
            button.addEventListener('click', function() {
                let index = button.getAttribute('data-index');
                birthdays.splice(index, 1);
                displayBirthdays();
            });
        });
    }
  
    // Add birthday from the form
    document.getElementById('add-birthday-form').addEventListener('submit', function(e) {
        e.preventDefault();
        let name = document.getElementById('name').value;
        let date = document.getElementById('date').value;
        if (name && date) {
            birthdays.push({ name, date });
            displayBirthdays();
            document.getElementById('name').value = '';
            document.getElementById('date').value = '';
            showConfirmationMessage('Birthday added successfully!');
        }
    });
  
    // Generate .ics file
    document.getElementById('generate-ics').addEventListener('click', function() {
        let icsContent = "BEGIN:VCALENDAR\nVERSION:2.0\nCALSCALE:GREGORIAN\n";
        let currentYear = new Date().getFullYear();
        let yearsToRepeat = 1;  // How many years in advance you want the birthdays to repeat (adjustable)
    
        birthdays.forEach(birthday => {
            let [year, month, day] = birthday.date.split('-');
    
            // Replace the birth year with the current year, but it will repeat in the following years
            for (let i = 0; i < yearsToRepeat; i++) {
                let repeatYear = currentYear + i;
    
                // Modify the name with "Birthday of"
                let summary = `Birthday of ${birthday.name}`;
                let description = `Birthday of ${birthday.name}`;
    
                // Add event to the .ics file with the recurrence rule
                icsContent += `BEGIN:VEVENT\nDTSTART;VALUE=DATE:${repeatYear}${month}${day}\nSUMMARY:${summary}\nDESCRIPTION:${description}\nRRULE:FREQ=YEARLY;BYMONTH=${month};BYMONTHDAY=${day}\nEND:VEVENT\n`;
            }
        });
    
        icsContent += "END:VCALENDAR";
        let blob = new Blob([icsContent], { type: 'text/calendar;charset=utf-8' });
        let link = document.createElement('a');
        link.href = URL.createObjectURL(blob);
        link.download = 'birthdays.ics';
        link.click();
    });
s    
  
    // Load .ics file and delete manual records
    document.getElementById('upload-btn').addEventListener('click', function() {
        let file = document.getElementById('upload-ics').files[0];
        if (file) {
            birthdays = []; // Clear all current records before loading the new ones
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
                            
                            // Remove the "Birthday of" part from the name
                            let cleanName = name[1].replace('Birthday of ', '').trim();

                            birthdays.push({ name: cleanName, date: formattedDate });
                        }
                    });
                    displayBirthdays(); // Display birthdays loaded from the file
                    showConfirmationMessage('Birthdays loaded from the file!');
                }
            };
            reader.readAsText(file);
        }
    });
  
    // Function to show a confirmation message
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
