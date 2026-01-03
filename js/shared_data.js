// Global shared data store using localStorage
const QUOTATIONS_KEY = 'smile_sunshine_quotations';

window.addQuotation = function(quotation) {
    try {
        let quotations = [];
        const stored = localStorage.getItem(QUOTATIONS_KEY);
        if (stored) {
            quotations = JSON.parse(stored);
        }
        quotations.push(quotation);
        localStorage.setItem(QUOTATIONS_KEY, JSON.stringify(quotations));
        console.log('✓ Quotation saved to localStorage. Total:', quotations.length);
        console.log('Store contents:', localStorage.getItem(QUOTATIONS_KEY));
        return quotations;
    } catch (error) {
        console.error('Error saving quotation:', error);
    }
};

window.getQuotations = function() {
    try {
        const stored = localStorage.getItem(QUOTATIONS_KEY);
        const quotations = stored ? JSON.parse(stored) : [];
        console.log('✓ Fetched from localStorage. Total:', quotations.length);
        return quotations;
    } catch (error) {
        console.error('Error fetching quotations:', error);
        return [];
    }
};

window.getQuotationsByCustomer = function(email) {
    const all = window.getQuotations();
    return all.filter(q => q.customer === email);
};

console.log('[SharedData] Loaded - Using localStorage for quotation store');

