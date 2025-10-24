import { loadOrders } from './common.js';

const user = JSON.parse(sessionStorage.getItem('user'));
if (!user) location.href = 'login.html';

$(document).ready(async () => {
  const orders = await loadOrders();
  const mine = orders.filter(o => o.customer === user.email);
  const tbody = $('#ordersTable tbody');

  if (!mine.length) {
    tbody.html('<tr><td colspan="6">No orders yet</td></tr>');
    return;
  }

  tbody.html(mine.map(o => {
    const steps = ['Confirmed', 'Processing', 'Shipped', 'Delivered'];
    const currentIndex = steps.indexOf(o.status);
    const tracker = steps.map((step, idx) => {
      let className = '';
      if (idx < currentIndex) className = 'done';
      else if (idx === currentIndex) className = 'active';
      return `<div class="tracker-step ${className}">${idx + 1}</div>`;
    }).join('');

    return `
      <tr>
        <td>${o.id}</td>
        <td>HK$ ${o.total.toFixed(2)}</td>
        <td>${o.status}</td>
        <td>${o.estDelivery}</td>
        <td>${o.notes || 'No notes'}</td>
        <td>
          <div class="tracker">${tracker}</div>
          <div style="display:flex;justify-content:space-between;font-size:.8rem;color:#666">
            <span>Confirmed</span><span>Processing</span><span>Shipped</span><span>Delivered</span>
          </div>
        </td>
      </tr>`;
  }).join(''));
});