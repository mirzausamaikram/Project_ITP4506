const form = document.querySelector('#regForm');
const nameInput = document.querySelector('#name');
const email = document.querySelector('#email');
const phone = document.querySelector('#phone');
const pwd = document.querySelector('#pwd');
const role = document.querySelector('#role');
const staffNumber = document.querySelector('#staffNumber');
const terms = document.querySelector('#terms');
const staffNumberGroup = document.querySelector('#staff-number-group');
const termsGroup = document.querySelector('#terms-group');
const success = document.querySelector('.success');

// Toggle fields based on role
role.addEventListener('change', () => {
  if (role.value === 'sales') {
    staffNumberGroup.style.display = 'block';
    termsGroup.style.display = 'none';
    staffNumber.required = true;
    terms.required = false;
  } else {
    staffNumberGroup.style.display = 'none';
    termsGroup.style.display = 'block';
    staffNumber.required = false;
    terms.required = true;
  }
});

// Trigger initial toggle in case default role is selected
role.dispatchEvent(new Event('change'));

form.addEventListener('submit', async e => {
  e.preventDefault();
  hideError(nameInput);
  hideError(email);
  hideError(phone);
  hideError(pwd);
  hideError(staffNumber);
  hideError(terms);

  if (!nameInput.value.trim()) {
    showError(nameInput, 'Name is required');
    return;
  }
  if (!validEmail(email.value)) {
    showError(email, 'Invalid e-mail');
    return;
  }
  if (!/^\d{10}$/.test(phone.value)) {
    showError(phone, 'Enter a valid 10-digit phone number');
    return;
  }
  if (pwd.value.length < 6) {
    showError(pwd, 'Min 6 chars');
    return;
  }
  if (role.value === 'sales' && !staffNumber.value.trim()) {
    showError(staffNumber, 'Staff number is required');
    return;
  }
  if (role.value === 'customer' && !terms.checked) {
    showError(terms.parentElement, 'You must agree to the terms'); // Show error next to checkbox label
    return;
  }

  const users = await window.loadUsers();
  if (users.find(u => u.email === email.value)) {
    showError(email, 'Account already exists');
    return;
  }

  const newUser = {
    name: nameInput.value,
    email: email.value,
    phone: phone.value,
    password: pwd.value,
    role: role.value,
    staffNumber: role.value === 'sales' ? staffNumber.value : null
  };

  const existingUsers = JSON.parse(localStorage.getItem('users') || '[]');
  localStorage.setItem('users', JSON.stringify([...existingUsers, newUser]));
  // Persist new user and auto-login so they can use the account immediately
  sessionStorage.setItem('user', JSON.stringify(newUser));

  // Use toast notification if available, otherwise fall back to inline success
  if (window.showNotification) {
    window.showNotification('Account created — signing you in', 'success', 1800);
  } else {
    success.style.display = 'block';
  }

  form.reset();

  // Redirect to appropriate dashboard for the new user
  setTimeout(() => {
    if (newUser.role === 'sales') {
      location.href = './QuotationSystem_Phase1/sales_dashboard.html';
    } else {
      location.href = './OrderSystem_Phase1/customer_dashboard.html';
    }
  }, 1200);
});