import { loadOrders, saveOrders } from './common.js';

let list = JSON.parse(localStorage.getItem('wishlist') || '[]');
if (!list.length) location.href = 'wishlist.html';
const user = JSON.parse(sessionStorage.getItem('user'));

$(document).ready(() => {
  $('#sumTable tbody').html(list.map(i => `
    <tr><td>${i.name}</td><td>${i.qty}</td><td>${(i.price * i.qty).toFixed(2)}</td></tr>`).join(''));
  $('#sumTotal').text(list.reduce((s, i) => s + i.price * i.qty, 0).toFixed(2));
});

window.submitOrder = async function() {
  const addr = $('#address').val().trim();
  if (!addr) {
    $('#address').next('.error').text('Please enter address').show();
    return;
  }
  const order = {
    id: Date.now(),
    customer: user.email,
    items: list,
    total: parseFloat($('#sumTotal').text()),
    address: addr,
    payment: $('#payment').val(),
    status: 'Confirmed',
    estDelivery: new Date(Date.now() + 3 * 86400000).toLocaleDateString(),
    notes: '' // For sales communication
  };
  const orders = await loadOrders();
  orders.push(order);
  saveOrders(orders);
  localStorage.setItem('lastOrder', JSON.stringify(order)); // For compatibility
  localStorage.removeItem('wishlist');
  location.href = 'track_order.html';
};