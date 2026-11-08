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
 const motion=matchMedia('(prefers-reduced-motion: reduce)');
 if(matchMedia('(hover:hover) and (pointer:fine)').matches){
  document.querySelectorAll('[data-project-preview]').forEach(surface=>{
   let frame=0,px=0,py=0;
   const reset=()=>{cancelAnimationFrame(frame);frame=0;surface.style.setProperty('--tilt-x','0deg');surface.style.setProperty('--tilt-y','0deg');surface.style.setProperty('--reveal','42%');};
   surface.addEventListener('pointermove',e=>{if(motion.matches)return;const r=surface.getBoundingClientRect();px=(e.clientX-r.left)/r.width;py=(e.clientY-r.top)/r.height;if(!frame)frame=requestAnimationFrame(()=>{frame=0;surface.style.setProperty('--tilt-x',((.5-py)*5).toFixed(2)+'deg');surface.style.setProperty('--tilt-y',((px-.5)*7).toFixed(2)+'deg');surface.style.setProperty('--reveal',(24+px*49).toFixed(1)+'%');});});
   surface.addEventListener('pointerleave',reset);motion.addEventListener('change',reset);
  });
  document.querySelectorAll('[data-depth-scene]').forEach(scene=>{
   let frame=0,px=0,py=0;const reset=()=>{cancelAnimationFrame(frame);frame=0;scene.style.setProperty('--scene-x','0deg');scene.style.setProperty('--scene-y','0deg');};
   scene.addEventListener('pointermove',e=>{if(motion.matches)return;const r=scene.getBoundingClientRect();px=(e.clientX-r.left)/r.width-.5;py=(e.clientY-r.top)/r.height-.5;if(!frame)frame=requestAnimationFrame(()=>{frame=0;scene.style.setProperty('--scene-x',(-py*2).toFixed(2)+'deg');scene.style.setProperty('--scene-y',(px*4).toFixed(2)+'deg');});});scene.addEventListener('pointerleave',reset);motion.addEventListener('change',reset);
  });
 }
})();
