// Animation Utilities - Add animations to key events
(function() {
  'use strict';

  // Toast Notification System
  window.showNotification = function(message, type = 'success', duration = 3000) {
    const notification = document.createElement('div');
    notification.className = `notification notification-${type} slide-in-top`;
    notification.style.cssText = `
      position: fixed;
      top: 20px;
      right: 20px;
      background: ${type === 'success' ? '#28a745' : type === 'error' ? '#dc3545' : '#007bff'};
      color: white;
      padding: 15px 25px;
      border-radius: 5px;
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
      z-index: 10000;
      font-weight: 500;
      max-width: 400px;
      animation: slideInTop 0.3s ease-out;
    `;
    notification.textContent = message;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
      notification.style.animation = 'slideInRight 0.3s ease-out reverse';
      setTimeout(() => notification.remove(), 300);
    }, duration);
  };

  // Add shine effect to buttons on click
  document.addEventListener('click', function(e) {
    if (e.target.classList.contains('btn')) {
      const ripple = document.createElement('span');
      const rect = e.target.getBoundingClientRect();
      const size = Math.max(rect.width, rect.height);
      const x = e.clientX - rect.left - size / 2;
      const y = e.clientY - rect.top - size / 2;
      
      ripple.style.cssText = `
        position: absolute;
        width: ${size}px;
        height: ${size}px;
        background: rgba(255, 255, 255, 0.5);
        border-radius: 50%;
        left: ${x}px;
        top: ${y}px;
        pointer-events: none;
        animation: ripple 0.6s ease-out;
      `;
      
      e.target.style.position = 'relative';
      e.target.style.overflow = 'hidden';
      e.target.appendChild(ripple);
      
      setTimeout(() => ripple.remove(), 600);
    }
  });

  // Add pulse effect to important elements
  const importantElements = document.querySelectorAll('[data-pulse]');
  importantElements.forEach(el => {
    el.classList.add('pulse');
  });

  // Stagger animation for table rows
  document.addEventListener('DOMContentLoaded', function() {
    const tables = document.querySelectorAll('table tbody tr');
    tables.forEach((row, idx) => {
      row.style.animation = `slideAndFade 0.4s ease-out ${idx * 0.05}s both`;
    });

    // Animate form inputs on focus
    const inputs = document.querySelectorAll('input, textarea, select');
    inputs.forEach(input => {
      input.addEventListener('focus', function() {
        this.parentElement.classList.add('scale-up');
        setTimeout(() => this.parentElement.classList.remove('scale-up'), 400);
      });
    });
  });

  // Success message animation
  window.animateSuccess = function(element) {
    element.classList.add('bounce-in');
    setTimeout(() => element.classList.remove('bounce-in'), 600);
  };

  // Error shake animation
  window.animateError = function(element) {
    element.classList.add('shake-attention');
    setTimeout(() => element.classList.remove('shake-attention'), 500);
  };

  // Hover effect for navigation
  const navItems = document.querySelectorAll('.nav-item');
  navItems.forEach(item => {
    item.style.cursor = 'pointer';
    item.addEventListener('mouseenter', function() {
      this.style.transform = 'scale(1.05)';
      this.style.transition = 'transform 0.2s ease';
    });
    item.addEventListener('mouseleave', function() {
      this.style.transform = 'scale(1)';
    });
  });

  console.log('✨ Animation utilities loaded!');
})();
