let list = JSON.parse(localStorage.getItem('wishlist') || '[]');
const tbody = $('#wishTable tbody');
const totalEl = $('#total');

function render() {
  if (!list.length) {
    tbody.html('<tr><td colspan="5">No items yet</td></tr>');
    return;
  }
  tbody.html(list.map((i, idx) => `
    <tr>
      <td>${i.name}</td>
      <td>${i.price.toFixed(2)}</td>
      <td><input type="number" min="1" value="${i.qty}" onchange="updateQty(${idx}, this.value)"></td>
      <td>${(i.price * i.qty).toFixed(2)}</td>
      <td><button class="btn-small" onclick="remove(${idx})">Remove</button></td>
    </tr>`).join(''));
  totalEl.text(list.reduce((s, i) => s + i.price * i.qty, 0).toFixed(2));
}

window.updateQty = function(idx, qty) {
  qty = parseInt(qty);
  if (qty < 1) qty = 1;
  list[idx].qty = qty;
  save();
};

window.remove = function(idx) {
  list.splice(idx, 1);
  save();
};

function save() {
  localStorage.setItem('wishlist', JSON.stringify(list));
  render();
}

window.checkout = function() {
  if (!list.length) return;
  location.href = 'order_confirmation.html'; // Ensure this matches your actual page name
};

render();