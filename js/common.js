/* small reusable helpers */
const $ = sel => document.querySelector(sel);
const $$ = sel => document.querySelectorAll(sel);

/* read USERS.TXT (synchronous – ok for demo) */
function loadUsers(){
  return fetch('../USERS.TXT')
         .then(r=>r.text())
         .then(txt=>txt.split('\n')
                       .filter(Boolean)
                       .map(l=>{
                          const [em,pw,role]=l.split(',');
                          return {email:em,password:pw,role:role};
                        }));
}

/* simple email regex */
function validEmail(em){
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(em);
}

/* show inline error & add shake */
function showError(inputEl,msg){
  const err=inputEl.nextElementSibling;
  err.textContent=msg;
  err.style.display='block';
  inputEl.classList.add('shake');
  setTimeout(()=>inputEl.classList.remove('shake'),300);
}
function hideError(inputEl){
  const err=inputEl.nextElementSibling;
  err.style.display='none';
}