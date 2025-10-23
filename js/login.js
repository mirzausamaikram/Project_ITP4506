/* ========== login.js  (plain JS – no modules)  ========== */

document.addEventListener('DOMContentLoaded', () => {

  /* ---- grab elements ---- */
  const form  = document.querySelector('#loginForm');
  const email = document.querySelector('#email');
  const pwd   = document.querySelector('#pwd');

  /* ---- submit handler ---- */
  form.addEventListener('submit', async e => {
    e.preventDefault();                       // stop page reload
    hideError(email); hideError(pwd);         // clear old messages

    /* basic validation */
    if (!validEmail(email.value)) {
      showError(email, 'Invalid e-mail address');
      return;
    }

    /* load user file */
    const users = await loadUsers();
    const match = users.find(u => u.email === email.value &&
                                  u.password === pwd.value);

    if (!match) {
      showError(pwd, 'Wrong e-mail or password');
      return;
    }

    /* ---- success ---- */
    sessionStorage.setItem('user', JSON.stringify(match));

    /* ---- role-based redirect ---- */
    if (match.role === 'sales')
      location.href = './QuotationSystem_Phase1/sales_dashboard.html';
    else
      location.href = './OrderSystem_Phase1/customer_dashboard.html';
  });
});