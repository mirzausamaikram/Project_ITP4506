import {loadUsers} from '../common/js/common.js';
const user=JSON.parse(sessionStorage.getItem('user'));
if(!user) location.href='../common/login.html';

const grid=$('#toyGrid');

fetch('data/toys.json')
  .then(r=>r.json())
  .then(toys=>{
     grid.innerHTML=toys.map(t=>`
       <div class="toy-card">
         <img src="${t.img}" alt="${t.name}">
         <h4>${t.name}</h4>
         <p class="price">HK$ ${t.price}</p>
         <p>${t.desc}</p>
         <label>Qty
           <input type="number" class="qty-input" id="qty-${t.id}" value="1" min="1" max="${t.stock}">
         </label>
         <button class="btn btn-small" onclick="addToList(${t.id},'${t.name}',${t.price})">Add to wish-list</button>
       </div>`).join('');
  });

window.addToList=function(id,name,price){
  const qty=parseInt($(`#qty-${id}`).value);
  let list=JSON.parse(localStorage.getItem('wishlist')||'[]');
  const exist=list.find(i=>i.id===id);
  if(exist) exist.qty+=qty;
  else list.push({id,name,price,qty});
  localStorage.setItem('wishlist',JSON.stringify(list));
  $(`#qty-${id}`).value=1;
  /* tiny feedback */
  const card=$(`#qty-${id}`).closest('.toy-card');
  card.style.border='2px solid #2ec4b6';
  setTimeout(()=>card.style.border='',400);
}