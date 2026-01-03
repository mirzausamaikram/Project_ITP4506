// track.js
const user = JSON.parse(sessionStorage.getItem('user'));
if (!user) location.href = 'login.html';

// Get orderId from URL query parameter
const urlParams = new URLSearchParams(window.location.search);
const orderId = urlParams.get('orderId');

$(document).ready(async () => {
  try {
    const orders = await window.loadOrders();
    const mine = orders.filter(o => o.customer === user.email);
    const tbody = $('#ordersTable tbody');

    let filteredOrders = mine;
    if (orderId) {
      filteredOrders = mine.filter(o => o.id === orderId); // Show only the specific order
    }

    if (!filteredOrders.length) {
      tbody.html('<tr><td colspan="6">No orders yet</td></tr>');
      return;
    }

    tbody.html(filteredOrders.map(o => {
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
          <td style="text-align:center;">
            <a href="order_invoice.html?id=${o.id}" class="btn btn-small" style="background:#2ec4b6; color:white; padding:5px 10px; text-decoration:none; border-radius:3px; font-size:0.85rem;">
              📄 Invoice
            </a>
            <div class="tracker" style="margin-top:8px;">${tracker}</div>
            <div style="display:flex;justify-content:space-between;font-size:.8rem;color:#666">
              <span>Confirmed</span><span>Processing</span><span>Shipped</span><span>Delivered</span>
            </div>
          </td>
        </tr>`;
    }).join(''));
  } catch (error) {
    console.error('Error loading orders:', error);
    $('#ordersTable tbody').html('<tr><td colspan="6">Error loading orders. Please try again later.</td></tr>');
  }
});