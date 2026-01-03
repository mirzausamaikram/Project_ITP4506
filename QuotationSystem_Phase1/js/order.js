// order.js
document.addEventListener('DOMContentLoaded', function() {
    const user = JSON.parse(sessionStorage.getItem('user'));
    if (!user) {
        location.href = '../login.html';
        return;
    }

    function fetchOrders() {
        const orders = JSON.parse(localStorage.getItem('orders')) || [];
        const ordersContainer = document.getElementById('ordersTable').getElementsByTagName('tbody')[0];
        ordersContainer.innerHTML = ''; // Clear existing orders

        orders.forEach(order => {
            const row = ordersContainer.insertRow();
            row.insertCell(0).textContent = order.id;
            row.insertCell(1).textContent = order.total;
            row.insertCell(2).textContent = order.status;
            row.insertCell(3).textContent = order.estDelivery;
            row.insertCell(4).textContent = order.notes;
            const actionCell = row.insertCell(5);

            // Create dropdown for status update
            const statusSelect = document.createElement('select');
            statusSelect.className = 'status-select';
            statusSelect.appendChild(new Option('Confirmed', 'Confirmed'));
            statusSelect.appendChild(new Option('Processing', 'Processing'));
            statusSelect.appendChild(new Option('Shipped', 'Shipped'));
            statusSelect.appendChild(new Option('Delivered', 'Delivered'));
            statusSelect.value = order.status;
            statusSelect.onchange = function() { updateStatus(order.id, this.value); };
            actionCell.appendChild(statusSelect);

            // Create delete button
            const deleteButton = document.createElement('button');
            deleteButton.textContent = 'Delete';
            deleteButton.onclick = function() { deleteOrder(order.id); };
            actionCell.appendChild(deleteButton);
        });
    }

    function updateStatus(orderId, newStatus) {
        const orders = JSON.parse(localStorage.getItem('orders'));
        const order = orders.find(o => o.id === orderId);
        if (!order) return;
        order.status = newStatus;
        localStorage.setItem('orders', JSON.stringify(orders));
        alert('Status updated to ' + newStatus);
        fetchOrders(); // Refresh the list
    }

    function deleteOrder(orderId) {
        const orders = JSON.parse(localStorage.getItem('orders'));
        const order = orders.find(o => o.id === orderId);
        if (!order) return;
        orders.splice(orders.indexOf(order), 1);
        localStorage.setItem('orders', JSON.stringify(orders));
        alert('Order deleted');
        fetchOrders(); // Refresh the list
    }

    fetchOrders();
});