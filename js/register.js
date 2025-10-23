import {loadUsers,validEmail,showError,hideError} from './common.js';

const form = $('#regForm');
const email=$('#email');
const pwd =$('#pwd');
const role=$('#role');

form.addEventListener('submit',async e=>{
  e.preventDefault();
  hideError(email); hideError(pwd);

  if(!validEmail(email.value)){showError(email,'Invalid e-mail'); return;}
  if(pwd.value.length<6){showError(pwd,'Min 6 chars'); return;}

  const users=await loadUsers();
  if(users.find(u=>u.email===email.value)){
     showError(email,'Account already exists');
     return;
  }

  /* success – simulate store */
  localStorage.setItem('newUser',
     JSON.stringify({email:email.value,password:pwd.value,role:role.value})
  );
  $('.success').style.display='block';
  form.reset();
  setTimeout(()=>location.href='login.html',1200);
});