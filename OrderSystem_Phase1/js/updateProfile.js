// Minimal profile update handler
// Shows success message and performs basic validation
document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('profileForm');
  if (!form) return;
  const successEl = form.querySelector('.success');
  successEl.style.display = 'none';

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    let valid = true;
    form.querySelectorAll('input[required]').forEach(inp => {
      const err = inp.parentElement.querySelector('.error');
      if (!inp.value.trim()) {
        valid = false;
        if (err) err.textContent = 'This field is required';
      } else {
        if (err) err.textContent = '';
      }
    });

    if (!valid) return;

    // Fake update: store to sessionStorage (for demo) and show success
    const user = {
      name: document.getElementById('name').value.trim(),
      email: document.getElementById('email').value.trim(),
      phone: document.getElementById('phone').value.trim()
    };
    sessionStorage.setItem('user', JSON.stringify(user));

    successEl.style.display = 'block';
    setTimeout(() => successEl.style.display = 'none', 2500);
  });
});
