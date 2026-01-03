// checkout.js
let list = JSON.parse(localStorage.getItem('wishlist') || []);

// Function to load orders from localStorage
async function loadOrders() {
  const orders = JSON.parse(localStorage.getItem('orders') || '[]');
  return orders;
}

// Function to save orders to localStorage
function saveOrders(orders) {
  localStorage.setItem('orders', JSON.stringify(orders));
}

// Function to generate a random order number
function generateOrderNumber() {
  const prefix = 'ORD';
  const randomNum = Math.floor(1000 + Math.random() * 9000); // Generates 4-digit random number
  const timestamp = Date.now().toString().slice(-6); // Last 6 digits of timestamp
  return `${prefix}-${timestamp}-${randomNum}`;
}

$(document).ready(() => {

  if (!list.length) {
    $('#sumTable tbody').html('<tr><td colspan="4">No items in wishlist</td></tr>');
    $('#sumTotal').text('0.00');
    $('.btn').prop('disabled', true); // Disable button if no items
    return;
  }

  // Render the items in the table
  $('#sumTable tbody').html(list.map(i => `
    <tr>
      <td>${i.name}</td>
      <td>${i.price.toFixed(2)}</td>
      <td>${i.qty}</td>
      <td>HK$ ${(i.price * i.qty).toFixed(2)}</td>
    </tr>`).join(''));

  // Calculate and display the total
  const total = list.reduce((s, i) => s + i.price * i.qty, 0).toFixed(2);
  $('#sumTotal').text(total);
});

window.submitOrder = async function() {
  

  const addr = $('#address').val().trim();
  if (!addr) {
    $('#address').next('.error').text('Please enter address').show();
    return;
  }
  $('#address').next('.error').hide();

  const total = parseFloat($('#sumTotal').text());
  if (isNaN(total) || total <= 0) {
    alert('Invalid total amount. Please check your wishlist.');
    return;
  }

  const paymentMethod = $('#payment').val();
  let paymentDetails = {};

  if (paymentMethod === 'credit') {
    paymentDetails = {
      name: $('#creditName').val().trim(),
      cardNumber: $('#creditCardNumber').val().trim(),
      expiry: $('#creditExpiry').val().trim(),
      cvv: $('#creditCV').val().trim()
    };
  } else if (paymentMethod === 'fps') {
    paymentDetails = {
      fpsNumber: $('#fpsNumber').val().trim()
    };
  }

  const user = JSON.parse(sessionStorage.getItem('user'));
  if (!user) {
    alert('User session not found. Please log in.');
    return;
  }

  const orderNumber = generateOrderNumber(); // Generate random order number

  const order = {
    id: orderNumber, // Use the generated order number as the ID
    customer: user.email,
    items: list,
    total: total,
    address: addr,
    payment: paymentMethod,
    paymentDetails: paymentDetails,
    status: 'Confirmed',
    estDelivery: new Date(Date.now() + 3 * 86400000).toLocaleDateString(),
    notes: ''
  };

  

  try {
    const orders = await loadOrders();
    orders.push(order);
    saveOrders(orders);
    localStorage.setItem('lastOrder', JSON.stringify(order));
    localStorage.removeItem('wishlist');

    // Show success notification
    if (window.showNotification) {
      window.showNotification('✅ Order placed successfully!', 'success', 2000);
    }
    
    // Add animation before redirect
    setTimeout(() => {
      location.href = `track_order.html?orderId=${orderNumber}`;
    }, 1000);
  } catch (error) {
    console.error('Error processing order:', error);
    if (window.showNotification) {
      window.showNotification('❌ Failed to process order. Please try again.', 'error', 3000);
    } else {
      alert('Failed to process order. Please try again.');
    }
  }
};

// Link the submitOrder function to the "Place Order" button
$('button.btn').on('click', function(event) {
  event.preventDefault(); // Prevent the default form submission behavior
  submitOrder(); // Call the submitOrder function
});