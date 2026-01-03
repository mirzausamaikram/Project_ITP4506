document.addEventListener('DOMContentLoaded', () => {
  const form = document.querySelector('#loginForm');
  const email = document.querySelector('#email');
  const pwd = document.querySelector('#pwd');

  form.addEventListener('submit', async e => {
    e.preventDefault();
    hideError(email);
    hideError(pwd);

    if (!validEmail(email.value)) {
      showError(email, 'Invalid e-mail address');
      return;
    }

    const users = await window.loadUsers();
    const user = users.find(u => u.email === email.value);

    if (!user) {
      showError(email, 'No account found with this e-mail');
      return;
    }

    if (user.password !== pwd.value) {
      showError(pwd, 'Incorrect password');
      return;
    }

    sessionStorage.setItem('user', JSON.stringify(user));

    if (user.role === 'sales') {
      location.href = './QuotationSystem_Phase1/sales_dashboard.html';
    } else {
      location.href = './OrderSystem_Phase1/customer_dashboard.html';
    }
  });
});