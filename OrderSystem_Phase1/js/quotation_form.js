document.addEventListener('DOMContentLoaded', function() {
    // Load templates into the dropdown
    const templatesList = [
        {"id": 1, "name":"Custom Teddy","base":150,"material":"Cotton","note":"Embroidery available"},
        {"id": 2, "name":"Robot Kit","base":200,"material":"Plastic","note":"Arduino compatible"}
    ];
    const templateSelect = document.getElementById('template');
    if (templateSelect) {
        templatesList.forEach(t => {
            const option = document.createElement('option');
            option.value = t.id;
            option.textContent = `${t.name} (base HK$ ${t.base})`;
            templateSelect.appendChild(option);
        });
    }

    const form = document.getElementById('quoteForm');
    if (!form) return;
    
    form.addEventListener('submit', async (e) => {
        e.preventDefault();
        const formData = {
            id: Date.now(),
            template: document.getElementById('template').value,
            sketch: document.getElementById('sketch').files.length > 0 ? URL.createObjectURL(document.getElementById('sketch').files[0]) : null,
            dimensions: document.getElementById('dims').value,
            colors: document.getElementById('colors').value,
            materials: document.getElementById('materials').value,
            quantity: parseInt(document.getElementById('qty').value, 10),
            qty: parseInt(document.getElementById('qty').value, 10),
            payment: document.getElementById('payment').value,
            customer: JSON.parse(sessionStorage.getItem('user')).email,
            status: 'Pending',
            date: new Date().toISOString().slice(0, 10)
        };

        try {
            await saveQuotationRequest(formData);
            alert('Your request has been submitted successfully!');
            location.href = 'quotation_form.html';
        } catch (error) {
            console.error('Error submitting quotation:', error);
            alert('Failed to submit quotation. Please try again.');
        }
    });
});

async function saveQuotationRequest(data) {
    // Use global shared data store (from shared_data.js)
    if (typeof window.addQuotation !== 'function') {
        console.error('window.addQuotation is not available');
        throw new Error('Quotation store not initialized');
    }
    window.addQuotation(data);
}

// Test helper removed in cleanup