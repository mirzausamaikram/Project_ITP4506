import { loadOrders, saveOrders, loadUsers } from './common.js';

const user = JSON.parse(sessionStorage.getItem('user'));
if (!user || user.role !== 'sales') location.href = 'login.html';

$(document).ready(async () => {
  $('#userName').text(user.name);
  const orders = await loadOrders();
  const users = await loadUsers();
  const tbody = $('#ordersTable tbody');

  tbody.html(orders.map(o => {
    const customerName = users.find(u => u.email === o.customer)?.name || o.customer;
    return `
      <tr>
        <td>${o.id}</td>
        <td>${customerName}</td>
        <td>HK$ ${o.total.toFixed(2)}</td>
        <td>${o.status}</td>
        <td><input type="text" value="${o.notes || ''}" id="notes-${o.id}"></td>
        <td>
          <select onchange="updateStatus(${o.id}, this.value)">
            <option value="Confirmed" ${o.status === 'Confirmed' ? 'selected' : ''}>Confirmed</option>
            <option value="Processing" ${o.status === 'Processing' ? 'selected' : ''}>Processing</option>
            <option value="Shipped" ${o.status === 'Shipped' ? 'selected' : ''}>Shipped</option>
            <option value="Delivered" ${o.status === 'Delivered' ? 'selected' : ''}>Delivered</option>
          </select>
          <button class="btn-small" onclick="saveNotes(${o.id})">Save Notes</button>
        </td>
      </tr>`;
  }).join(''));
});

window.updateStatus = async function(id, newStatus) {
  const orders = await loadOrders();
  const order = orders.find(o => o.id === id);
  if (order) {
    order.status = newStatus;
    saveOrders(orders);
  }
};

window.saveNotes = async function(id) {
  const notes = $(`#notes-${id}`).val();
  const orders = await loadOrders();
  const order = orders.find(o => o.id === id);
  if (order) {
    order.notes = notes;
    saveOrders(orders);
    alert('Notes saved');
  }
};