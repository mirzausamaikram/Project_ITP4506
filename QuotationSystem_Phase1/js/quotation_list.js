let list=JSON.parse(localStorage.getItem('quotations')||'[]');
const tbody=document.querySelector('#qtTable tbody');

function render(){
  if(!list.length){tbody.innerHTML='<tr><td colspan="6">No requests yet</td></tr>';return;}
  tbody.innerHTML=list.map(q=>`
    <tr>
      <td>${q.id}</td>
      <td>${q.customer}</td>
      <td>${q.template}</td>
      <td>${q.qty}</td>
      <td><span class="status-badge ${q.status.toLowerCase()}">${q.status}</span></td>
      <td><button class="btn-small" onclick="view(${q.id})">View / Quote</button></td>
    </tr>`).join('');
}
window.view=function(id){
  sessionStorage.setItem('quoteId',id);
  location.href='quotation_status.html';
};
render();