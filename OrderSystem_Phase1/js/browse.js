const user = JSON.parse(sessionStorage.getItem('user'));
if (!user) location.href = 'login.html';

$(document).ready(() => {
  const grid = $('#toyGrid');

  fetch('data/toys.json')
    .then(r => r.json())
    .then(toys => {
      grid.html(toys.map(t => `
        <div class="toy-card fade-in">
          <img src="${t.img}" alt="${t.name}">
          <h4>${t.name}</h4>
          <p class="price">HK$ ${t.price.toFixed(2)}</p>
          <p>${t.desc}</p>
          <label>Qty
            <input type="number" class="qty-input" id="qty-${t.id}" value="1" min="1" max="${t.stock}">
          </label>
          <button class="btn btn-small" onclick="addToList(${t.id}, '${t.name}', ${t.price}, ${t.stock})">Add to Wish-list</button>
        </div>`).join(''));
    });
});

window.addToList = function(id, name, price, stock) {
  const qtyInput = $(`#qty-${id}`);
  const qty = parseInt(qtyInput.val());
  if (qty > stock) {
    alert('Quantity exceeds stock');
    return;
  }
  let list = JSON.parse(localStorage.getItem('wishlist') || '[]');
  const exist = list.find(i => i.id === id);
  if (exist) exist.qty += qty;
  else list.push({id, name, price, qty});
  localStorage.setItem('wishlist', JSON.stringify(list));
  qtyInput.val(1);
  /* feedback animation */
  const card = qtyInput.closest('.toy-card');
  card.css('border', '2px solid #2ec4b6');
  setTimeout(() => card.css('border', ''), 400);
};