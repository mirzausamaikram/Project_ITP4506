const user=JSON.parse(sessionStorage.getItem('user'));
if(!user)location.href='../login.html';

/* Embedded toy template data for file:// compatibility */
const templatesList = [
  {"id": 1, "name":"Custom Teddy","base":150,"material":"Cotton","note":"Embroidery available"},
  {"id": 2, "name":"Robot Kit","base":200,"material":"Plastic","note":"Arduino compatible"}
];

/* load templates */
const s=$('#template');
templatesList.forEach(t=>{
   const o=document.createElement('option');
   o.value=t.id; o.textContent=`${t.name} (base HK$ ${t.base})`;
   s.appendChild(o);
});

$('#quoteForm').addEventListener('submit',async e=>{
  e.preventDefault();
  const file=$('#sketch').files[0];
  const req={
    id:Date.now(),
    customer:user.email,
    template:$('#template').value||'Custom',
    dims:$('#dims').value,
    colors:$('#colors').value,
    materials:$('#materials').value,
    qty:parseInt($('#qty').value),
    payment:$('#payment').value,
    status:'Pending',
    price:null,
    estDelivery:null,
    date:new Date().toLocaleDateString()
  };
  /* store */
  const arr=JSON.parse(localStorage.getItem('quotations')||'[]');
  arr.push(req);
  localStorage.setItem('quotations',JSON.stringify(arr));
  $('.success').style.display='block';
  setTimeout(()=>location.href='quotation_status.html',1200);
});