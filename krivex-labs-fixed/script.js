const menuBtn = document.getElementById('menuBtn');
const navMenu = document.getElementById('navMenu');
if (menuBtn && navMenu) {
  menuBtn.addEventListener('click', () => {
    navMenu.classList.toggle('open');
    menuBtn.classList.toggle('active');
  });
  document.addEventListener('click', (event) => {
    if (!navMenu.contains(event.target) && !menuBtn.contains(event.target)) {
      navMenu.classList.remove('open');
      menuBtn.classList.remove('active');
    }
  });
}
function setActiveMenu(){
  const current = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav a').forEach(link=>{
    link.classList.remove('active');
    const href = link.getAttribute('href');
    if (href === current || (current === '' && href === 'index.html')) link.classList.add('active');
  });
}
setActiveMenu();
function copyText(text){
  if(navigator.clipboard){navigator.clipboard.writeText(text).then(()=>showToast('Command copied!')).catch(()=>fallbackCopy(text));}
  else fallbackCopy(text);
}
function fallbackCopy(text){
  const t=document.createElement('textarea');t.value=text;document.body.appendChild(t);t.select();
  try{document.execCommand('copy');showToast('Command copied!');}catch(e){alert('Copy failed. Please copy manually.');}
  document.body.removeChild(t);
}
function showToast(message){
  const old=document.querySelector('.toast-message'); if(old) old.remove();
  const toast=document.createElement('div'); toast.className='toast-message'; toast.innerText=message;
  toast.style.cssText='position:fixed;left:50%;bottom:22px;transform:translateX(-50%);background:#2563eb;color:#fff;padding:12px 18px;border-radius:12px;font-weight:800;z-index:9999;box-shadow:0 16px 35px rgba(37,99,235,.25)';
  document.body.appendChild(toast); setTimeout(()=>toast.remove(),1800);
}
