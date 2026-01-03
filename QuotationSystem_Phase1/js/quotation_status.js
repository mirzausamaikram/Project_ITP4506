document.addEventListener('DOMContentLoaded', function() {
  // read current user from session (may be set on login)
  var user = JSON.parse(sessionStorage.getItem('user') || 'null') || {};

  // Accept quoteId from sessionStorage (list -> status uses this),
  // but also accept a query param ?id=... for robustness.
  function readQueryId() {
    try {
      const params = new URLSearchParams(window.location.search);
      return params.get('id');
    } catch (e) {
      return null;
    }
  }

  const quoteId = sessionStorage.getItem('quoteId') || readQueryId();

  // Prefer the shared storage API if available
  var quotations = [];
  if (typeof window.getQuotations === 'function') {
    quotations = window.getQuotations();
  } else {
    // Backwards-compatible fallback: try both keys we have used historically
    quotations = JSON.parse(localStorage.getItem('smile_sunshine_quotations') || localStorage.getItem('quotations') || '[]');
  }

  const q = quotations.find(x => String(x.id) === String(quoteId));

  if (!q) {
    alert('Quotation not found.');
    // link to the quotation list in the same folder (avoid root-level 404)
    location.href = 'quotation_list.html';
    return;
  }

  document.getElementById('detTable').innerHTML = `
    <tr><td>Request ID</td><td>${q.id}</td></tr>
    <tr><td>Customer</td><td>${q.customer}</td></tr>
    <tr><td>Template</td><td>${q.template}</td></tr>
    <tr><td>Dimensions</td><td>${q.dims||'–'}</td></tr>
    <tr><td>Colours</td><td>${q.colors||'–'}</td></tr>
    <tr><td>Materials</td><td>${q.materials||'–'}</td></tr>
    <tr><td>Quantity</td><td>${q.qty}</td></tr>
    <tr><td>Payment Pref.</td><td>${q.payment}</td></tr>
  `;

  const isSales = user.role === 'sales';
  document.getElementById('backLink').href = isSales ? 'sales_dashboard.html' : 'quotation_list.html';

  if (isSales && q.status === 'Pending') {
    document.getElementById('salesBox').style.display = 'block';
    document.getElementById('price').value = '';
    document.getElementById('estDate').value = '';
  } else {
    document.getElementById('custBox').style.display = 'block';
    document.getElementById('stat').textContent = q.status;
    document.getElementById('quotedP').textContent = q.price || '–';
    document.getElementById('quotedD').textContent = q.estDelivery || '–';
  }

  window.sendQuote = function() {
    const p = parseFloat(document.getElementById('price').value);
    const d = document.getElementById('estDate').value;
    if (!p || !d) {
      alert('Please fill price and date');
      return;
    }
    q.price = p;
    q.estDelivery = d;
    q.status = 'Replied';

    // Save via shared API when available, otherwise write the fallback key
    if (typeof window.getQuotations === 'function' && typeof window.addQuotation === 'function') {
      // update the array and write it back using localStorage to keep simple
      // (shared_data.js exposes getQuotations; it writes via localStorage key)
      const all = window.getQuotations();
      const idx = all.findIndex(x => String(x.id) === String(q.id));
      if (idx >= 0) all[idx] = q;
      localStorage.setItem('smile_sunshine_quotations', JSON.stringify(all));
    } else {
      const existing = JSON.parse(localStorage.getItem('smile_sunshine_quotations') || localStorage.getItem('quotations') || '[]');
      const idx = existing.findIndex(x => String(x.id) === String(q.id));
      if (idx >= 0) existing[idx] = q;
      localStorage.setItem('smile_sunshine_quotations', JSON.stringify(existing));
    }

    location.reload();
  };
});