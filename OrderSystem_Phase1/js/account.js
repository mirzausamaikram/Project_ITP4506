document.getElementById('profileForm').addEventListener('submit', function(event) {
  event.preventDefault();

  const name = document.getElementById('name').value.trim();
  const email = document.getElementById('email').value.trim();
  const phone = document.getElementById('phone').value.trim();
  const password = document.getElementById('pwd').value.trim();

  // Basic form validation
  if (!name || !email || !phone || !password) {
    document.querySelector('.error').innerText = 'Please fill in all fields';
    return;
  }

  // Assuming you have a function to update user data in your USERS.TXT file
  updateUserInFile(name, email, phone, password).then(() => {
    document.querySelector('.success').style.display = 'block';
    document.querySelector('.error').style.display = 'none';
    setTimeout(() => {
      window.location.href = 'customer_dashboard.html'; // Redirect after update
    }, 2000);
  }).catch(error => {
    document.querySelector('.error').innerText = 'Error updating profile: ' + error.message;
    document.querySelector('.success').style.display = 'none';
  });
});

function updateUserInFile(name, email, phone, password) {
  return new Promise((resolve, reject) => {
    // Read the USERS.TXT file
    const fs = require('fs');
    fs.readFile('USERS.TXT', 'utf8', (err, data) => {
      if (err) {
        return reject(err);
      }

      // Split the file content into lines
      const lines = data.split('\n');

      // Find and update the user's data
      let updated = false;
      for (let i = 0; i < lines.length; i++) {
        const [username, userEmail, userPhone, userPassword, role] = lines[i].split(',');
        if (userEmail === email) {
          lines[i] = `${name},${email},${phone},${password},${role}`;
          updated = true;
          break;
        }
      }

      // If the user was not found, reject the promise
      if (!updated) {
        return reject(new Error('User not found'));
      }

      // Write the updated data back to the USERS.TXT file
      fs.writeFile('USERS.TXT', lines.join('\n'), 'utf8', (err) => {
        if (err) {
          return reject(err);
        }
        resolve();
      });
    });
  });
}