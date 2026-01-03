// Provide the same helpers as globals so pages can load from file://
window.loadUsers = async function() {
  return JSON.parse(localStorage.getItem('users') || '[]');
};

window.loadOrders = async function() {
  return JSON.parse(localStorage.getItem('orders') || '[]');
};

window.validEmail = function(email) {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email);
};

window.showError = function(input, message) {
  const errorDiv = input.nextElementSibling || input.parentElement.querySelector('.error');
  if (errorDiv) {
    errorDiv.textContent = message;
    errorDiv.style.display = 'block';
  }
};

window.hideError = function(input) {
  const errorDiv = input.nextElementSibling || input.parentElement.querySelector('.error');
  if (errorDiv) {
    errorDiv.textContent = '';
    errorDiv.style.display = 'none';
  }
};

// Seed demo users for local/offline testing if none exist.
(function seedDefaultUsers() {
  try {
    const key = 'users';
    const existing = JSON.parse(localStorage.getItem(key) || '[]');
    if (!existing.length) {
      const defaults = [
        { name: 'Demo Customer', email: 'customer@demo.com', phone: '', password: '123456', role: 'customer', staffNumber: null },
        { name: 'Demo Sales', email: 'sales@demo.com', phone: '', password: '123456', role: 'sales', staffNumber: 'S001' }
      ];
      localStorage.setItem(key, JSON.stringify(defaults));
      console.log('[Init] Seeded default users for local testing.');
    }
  } catch (e) {
    console.error('Error seeding default users', e);
  }
})();