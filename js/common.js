export async function loadUsers() {
  return JSON.parse(localStorage.getItem('users') || '[]');
}

export function validEmail(email) {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email);
}

export function showError(input, message) {
  const errorDiv = input.nextElementSibling || input.parentElement.querySelector('.error');
  if (errorDiv) {
    errorDiv.textContent = message;
    errorDiv.style.display = 'block';
  }
}

export function hideError(input) {
  const errorDiv = input.nextElementSibling || input.parentElement.querySelector('.error');
  if (errorDiv) {
    errorDiv.textContent = '';
    errorDiv.style.display = 'none';
  }
}