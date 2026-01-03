const user = JSON.parse(sessionStorage.getItem('user'));
if (!user) location.href = 'login.html';

// Embedded toy data for file:// compatibility
const toysData = [
  {
    "id": 1,
    "name": "Tesla Cybertruck Toy",
    "price": 20.00,
    "desc": "Miniature model of the Tesla Cybertruck",
    "img": "images/1.jpg",
    "stock": 50
  },
  {
    "id": 2,
    "name": "Wooden Airplane Toy",
    "price": 15.00,
    "desc": "Handcrafted wooden biplane",
    "img": "images/2.jpg",
    "stock": 30
  },
  {
    "id": 3,
    "name": "EVE Robot Toy",
    "price": 25.00,
    "desc": "Transforming EVE from WALL-E",
    "img": "images/3.jpg",
    "stock": 40
  },
  {
    "id": 4,
    "name": "Flying Orb Drone",
    "price": 30.00,
    "desc": "Hand-controlled flying ball with lights",
    "img": "images/4.jpg",
    "stock": 20
  },
  {
    "id": 5,
    "name": "Gray Cat Plush Toy",
    "price": 18.00,
    "desc": "Soft fluffy gray cat stuffed animal",
    "img": "images/5.jpg",
    "stock": 60
  }
];

let filteredToys = toysData;

function renderToys(toys) {
  const grid = $('#toyGrid');
  grid.html(toys.map((t, idx) => {
    const imgSrc = (t.img || '').replace(/^\/+/, '');
    return `
    <div class="toy-card fade-in stagger-item" style="animation-delay: ${idx * 0.1}s; position: relative;">
      <span class="wishlist-heart" style="position: absolute; top: 10px; right: 10px; font-size: 1.8rem; cursor: pointer; z-index: 10;">🤍</span>
      <img src="${imgSrc}" alt="${t.name}">
      <h4>${t.name}</h4>
      <p class="price">HK$ ${t.price.toFixed(2)}</p>
      <p>${t.desc}</p>
      <label>Qty
        <input type="number" class="qty-input" id="qty-${t.id}" value="1" min="1" max="${t.stock}">
      </label>
      <button class="btn btn-small" onclick="addToList(${t.id}, '${t.name}', ${t.price}, ${t.stock})">Add to Wish-list</button>
    </div>`;
  }).join(''));
}

window.filterToys = function() {
  const searchTerm = document.getElementById('searchInput').value.toLowerCase();
  if (!searchTerm.trim()) {
    document.getElementById('searchResult').textContent = 'Please enter a search term';
    return;
  }
  
  filteredToys = toysData.filter(t => 
    t.name.toLowerCase().includes(searchTerm) || 
    t.desc.toLowerCase().includes(searchTerm)
  );
  
  renderToys(filteredToys);
  document.getElementById('searchResult').textContent = 
    `Found ${filteredToys.length} toy${filteredToys.length !== 1 ? 's' : ''}`;
};

window.resetSearch = function() {
  document.getElementById('searchInput').value = '';
  filteredToys = toysData;
  renderToys(filteredToys);
  document.getElementById('searchResult').textContent = '';
};

// Allow Enter key to search
document.addEventListener('DOMContentLoaded', () => {
  const searchInput = document.getElementById('searchInput');
  if (searchInput) {
    searchInput.addEventListener('keypress', (e) => {
      if (e.key === 'Enter') window.filterToys();
    });
  }
});

$(document).ready(() => {
  renderToys(toysData);
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
  
  /* Show notification */
  showNotification(`${name} added to wishlist!`);
  
  /* Change heart to red */
  const card = qtyInput.closest('.toy-card');
  const heart = card.find('.wishlist-heart');
  heart.text('❤️').css('color', '#d32f2f');
  
  /* feedback animation */
  card.css('border', '2px solid #2ec4b6');
  setTimeout(() => card.css('border', ''), 400);
};

window.showNotification = function(message) {
  const notification = $(`
    <div class="notification" style="
      position: fixed;
      top: 80px;
      right: 20px;
      background: #d32f2f;
      color: white;
      padding: 15px 25px;
      border-radius: 8px;
      box-shadow: 0 4px 12px rgba(0,0,0,0.3);
      z-index: 2000;
      animation: slideInRight 0.4s ease;
      font-weight: 600;
    ">
      ✓ ${message}
    </div>
  `);
  
  $('body').append(notification);
  
  setTimeout(() => {
    notification.fadeOut(300, function() { $(this).remove(); });
  }, 3000);
};