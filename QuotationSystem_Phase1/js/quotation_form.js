import {loadUsers} from '../common/js/common.js';
const user=JSON.parse(sessionStorage.getItem('user'));
if(!user)location.href='../common/login.html';

/* load templates */
fetch('data/toy_templates.json')
  .then(r=>r.json())
  .then(list=>{
     const s=$('#template');
     list.forEach(t=>{
       const o=document.createElement('option');
       o.value=t.id; o.textContent=`${t.name} (base HK$ ${t.base})`;
       s.appendChild(o);
     });
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
  const arr=await fetch('data/quotations.json').then(r=>r.json());
  arr.push(req);
  localStorage.setItem('quotations',JSON.stringify(arr));
  $('.success').style.display='block';
  setTimeout(()=>location.href='quotation_status.html',1200);
});