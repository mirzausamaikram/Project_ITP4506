let list=JSON.parse(localStorage.getItem('wishlist')||'[]');
const tbody=document.querySelector('#wishTable tbody');
const totalEl=$('#total');

function render(){
  if(!list.length){tbody.innerHTML='<tr><td colspan="5">No items yet</td></tr>';return;}
  tbody.innerHTML=list.map((i,idx)=>`
    <tr>
      <td>${i.name}</td>
      <td>${i.price}</td>
      <td><input type="number" min="1" value="${i.qty}" onchange="updateQty(${idx},this.value)"></td>
      <td>${(i.price*i.qty).toFixed(2)}</td>
      <td><button class="btn-small" onclick="remove(${idx})">Remove</button></td>
    </tr>`).join('');
  totalEl.textContent=list.reduce((s,i)=>s+i.price*i.qty,0).toFixed(2);
}
window.updateQty=function(idx,qty){list[idx].qty=parseInt(qty);save();};
window.remove=function(idx){list.splice(idx,1);save();};
function save(){localStorage.setItem('wishlist',JSON.stringify(list));render();}

window.checkout=function(){
  if(!list.length)return;
  location.href='order_confirmation.html';
};
render();