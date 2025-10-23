import {loadUsers} from '../common/js/common.js';
const user=JSON.parse(sessionStorage.getItem('user'));
const quoteId=sessionStorage.getItem('quoteId');
if(!quoteId)location.href='../common/login.html';

let list=JSON.parse(localStorage.getItem('quotations')||'[]');
const q=list.find(x=>x.id==quoteId);

/* render details */
$('#detTable').innerHTML=`
  <tr><td>Request ID</td><td>${q.id}</td></tr>
  <tr><td>Customer</td><td>${q.customer}</td></tr>
  <tr><td>Template</td><td>${q.template}</td></tr>
  <tr><td>Dimensions</td><td>${q.dims||'–'}</td></tr>
  <tr><td>Colours</td><td>${q.colors||'–'}</td></tr>
  <tr><td>Materials</td><td>${q.materials||'–'}</td></tr>
  <tr><td>Quantity</td><td>${q.qty}</td></tr>
  <tr><td>Payment Pref.</td><td>${q.payment}</td></tr>`;

/* role-based UI */
const isSales=user.role==='sales';
$('#backLink').href=isSales?'sales_dashboard.html':'../OrderSystem_Phase1/customer_dashboard.html';

if(isSales && q.status==='Pending'){
  $('#salesBox').style.display='block';
  $('#price').value='';
  $('#estDate').value='';
}else{
  $('#custBox').style.display='block';
  $('#stat').textContent=q.status;
  $('#quotedP').textContent=q.price||'–';
  $('#quotedD').textContent=q.estDelivery||'–';
}

window.sendQuote=function(){
  const p=parseFloat($('#price').value);
  const d=$('#estDate').value;
  if(!p||!d){alert('Please fill price and date');return;}
  q.price=p;
  q.estDelivery=d;
  q.status='Replied';
  localStorage.setItem('quotations',JSON.stringify(list));
  location.reload();
};