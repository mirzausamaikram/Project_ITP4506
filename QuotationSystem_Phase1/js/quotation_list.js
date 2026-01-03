// quotation_list.js

var user = JSON.parse(sessionStorage.getItem('user')) || {};

if (!user || !user.email) {
    location.href = '../login.html';
} else {
    function fetchQuotations() {
        if (typeof window.getQuotations !== 'function') {
            console.error('getQuotations unavailable');
            return;
        }
        
        var quotations = window.getQuotations();
        
        var qtTable = document.getElementById('qtTable');
        if (!qtTable) return;
        
        var tbody = qtTable.getElementsByTagName('tbody')[0];
        tbody.innerHTML = '';

        // Show ALL quotations (sales dashboard should see everything)
        var quotationsToShow = quotations;

        if (quotationsToShow.length === 0) {
            var row = tbody.insertRow();
            row.innerHTML = '<td colspan="6">No quotation requests yet.</td>';
            return;
        }

        quotationsToShow.forEach(function(q) {
            var row = tbody.insertRow();
            row.insertCell(0).textContent = q.id;
            row.insertCell(1).textContent = q.customer;
            row.insertCell(2).textContent = q.template || 'Custom';
            row.insertCell(3).textContent = q.qty;
            row.insertCell(4).textContent = q.status;
            row.insertCell(5).innerHTML = '<button onclick="window.viewQuotation(' + q.id + ')">View</button>';
        });
    }

    window.viewQuotation = function(id) {
        sessionStorage.setItem('quoteId', id);
        location.href = 'quotation_status.html';
    };

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', function() {
            fetchQuotations();
            setInterval(fetchQuotations, 2000);
        });
    } else {
        fetchQuotations();
        setInterval(fetchQuotations, 2000);
    }
}