document.addEventListener('DOMContentLoaded', function() {
    const user = JSON.parse(sessionStorage.getItem('user'));
    if (!user) {
        location.href = '../login.html';
        return;
    }
    document.getElementById('userName').textContent = user.email;

    function fetchQuotations() {
        const quotations = JSON.parse(localStorage.getItem('quotations')) || [];
        const quotationsContainer = document.getElementById('quotationsContainer'); // Ensure this element exists in your HTML
        quotationsContainer.innerHTML = ''; // Clear existing quotations

        quotations.forEach(quotation => {
            const row = document.createElement('div');
            row.className = 'quotation-card';
            row.innerHTML = `
                <h3>${quotation.template} - ${quotation.qty} units</h3>
                <p>Status: <strong>${quotation.status}</strong></p>
                <p>Requested by: ${quotation.customer}</p>
                <p>Date: ${quotation.date}</p>
                <button class="btn btn-edit" onclick="viewQuotation(${quotation.id})">View/Edit</button>
            `;
            quotationsContainer.appendChild(row);
        });
    }

    fetchQuotations();
});

// Delegate event handling to improve maintainability
const viewQuotation = (id) => {
    sessionStorage.setItem('quoteId', id);
    location.href = 'quotation_status.html';
};

// Add event listeners after the DOM is fully loaded
document.getElementById('quotationList').addEventListener('click', function(event) {
    if (event.target.classList.contains('btn-edit')) {
        const quoteId = event.target.getAttribute('onclick').split('(')[1].trim();
        viewQuotation(quoteId);
    }
});