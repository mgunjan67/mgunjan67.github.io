(() => {
 'use strict';
 const menu=document.querySelector('.menu-toggle'),nav=document.querySelector('#navigation');
 const closeMenu=()=>{menu?.setAttribute('aria-expanded','false');menu?.setAttribute('aria-label','Open navigation');nav?.classList.remove('is-open');};
 menu?.addEventListener('click',()=>{const open=menu.getAttribute('aria-expanded')!=='true';menu.setAttribute('aria-expanded',String(open));menu.setAttribute('aria-label',open?'Close navigation':'Open navigation');nav.classList.toggle('is-open',open);});
 nav?.querySelectorAll('a').forEach(a=>a.addEventListener('click',closeMenu));
 document.addEventListener('keydown',e=>{if(e.key==='Escape')closeMenu();});
 document.addEventListener('click',e=>{if(!e.target.closest('.site-header'))closeMenu();});
 matchMedia('(min-width:701px)').addEventListener('change',closeMenu);
 document.querySelectorAll('#year').forEach(e=>e.textContent=new Date().getFullYear());
})();
