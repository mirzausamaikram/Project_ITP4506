let list=JSON.parse(localStorage.getItem('wishlist')||'[]');
if(!list.length) location.href='wishlist.html';
const user=JSON.parse(sessionStorage.getItem('user'));

$('#sumTable tbody').innerHTML=list.map(i=>`
  <tr><td>${i.name}</td><td>${i.qty}</td><td>${(i.price*i.qty).toFixed(2)}</td></tr>`).join('');
$('#sumTotal').textContent=list.reduce((s,i)=>s+i.price*i.qty,0).toFixed(2);

window.submitOrder=function(){
  const addr=$('#address').value.trim();
  if(!addr){alert('Please enter address');return;}
  const order={
    id:Date.now(),
    customer:user.email,
    items:list,
    total:parseFloat($('#sumTotal').textContent),
    address:addr,
    payment:$('#payment').value,
    status:'Confirmed',
    estDelivery:new Date(Date.now()+3*86400000).toLocaleDateString()
  };
  /* store order */
  fetch('data/orders.json')
    .then(r=>r.json())
    .then(arr=>{
      arr.push(order);
      localStorage.setItem('lastOrder',JSON.stringify(order));
      localStorage.removeItem('wishlist');
      location.href='track_order.html';
    });
};