(() => {
 'use strict';
 const $=(s,r=document)=>r.querySelector(s),$$=(s,r=document)=>[...r.querySelectorAll(s)];
 const {scenes,features}=window.PHOTO_SHOWCASE;
 const escape=s=>String(s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
 function setComparison(stage,value){stage.style.setProperty('--position',value+'%');const input=$('input',stage);input.value=value;input.setAttribute('aria-valuetext',value+' percent starting image, '+(100-value)+' percent result');}
 $$('.compare-stage').forEach(stage=>{const input=$('input',stage);setComparison(stage,input.value);input.addEventListener('input',()=>setComparison(stage,input.value));});
 let filter='all',expanded=false,filtered=scenes;
 const grid=$('#photo-grid'),more=$('#show-all-photos');
 function renderGallery(){
  filtered=scenes.filter(s=>filter==='all'||s.category===filter);
  const visible=expanded?filtered:filtered.slice(0,8);
  grid.innerHTML=visible.map(s=>`<button class="photo-card" data-scene="${s.id}" aria-label="Compare ${escape(s.title)} before and after"><span class="photo-card-image"><img src="${s.thumb}" alt="Saved edited result: ${escape(s.title)}" width="560" height="374" loading="lazy" decoding="async"><span class="photo-card-open" aria-hidden="true">↗</span><span class="photo-card-tag">${escape(s.room)}</span></span><span class="photo-card-caption"><span>${escape(s.title)}</span><small>${s.id} / 25</small></span></button>`).join('');
  $('#gallery-count').textContent=`Showing ${visible.length} of ${filtered.length} saved results`;
  more.hidden=filtered.length<=8;
  more.setAttribute('aria-expanded',String(expanded));
  more.innerHTML=expanded?'Show selected results <span>↑</span>':`Explore all ${filtered.length} results <span>↗</span>`;
 }
 $$('.gallery-filters button').forEach(button=>button.addEventListener('click',()=>{filter=button.dataset.photoFilter;expanded=false;$$('.gallery-filters button').forEach(b=>b.setAttribute('aria-pressed',String(b===button)));renderGallery();}));
 more.addEventListener('click',()=>{expanded=!expanded;renderGallery();if(!expanded)grid.scrollIntoView({block:'start',behavior:matchMedia('(prefers-reduced-motion: reduce)').matches?'instant':'smooth'});});
 renderGallery();
 const dialog=$('#photo-dialog');let active=0,lastOpener=null;
 function showScene(index){
  active=(index+filtered.length)%filtered.length;const scene=filtered[active];
  $('#photo-dialog-title').textContent=scene.title;$('#photo-dialog-category').textContent=scene.room+' / SAVED PROJECT RESULT';
  $('#photo-dialog-position').textContent=String(active+1).padStart(2,'0')+' / '+String(filtered.length).padStart(2,'0');
  $('#dialog-after').src=scene.after;$('#dialog-after').alt='Saved edited result: '+scene.title;
  $('#dialog-before').src=scene.before;$('#dialog-before').alt='One original exposure: '+scene.title;
  $('#photo-exposure-note').textContent=`One original exposure → saved result from ${scene.exposures} source exposures.`;
  setComparison($('#dialog-comparison'),50);
 }
 grid.addEventListener('click',event=>{const button=event.target.closest('[data-scene]');if(!button)return;lastOpener=button;showScene(filtered.findIndex(s=>s.id===button.dataset.scene));dialog.showModal();document.body.classList.add('modal-open');$('#close-photo').focus({preventScroll:true});});
 $('#photo-prev').addEventListener('click',()=>showScene(active-1));$('#photo-next').addEventListener('click',()=>showScene(active+1));$('#close-photo').addEventListener('click',()=>dialog.close());
 dialog.addEventListener('keydown',event=>{if(event.target.matches('input,select'))return;if(event.key==='ArrowRight'){event.preventDefault();showScene(active+1);}if(event.key==='ArrowLeft'){event.preventDefault();showScene(active-1);}});
 dialog.addEventListener('click',event=>{if(event.target===dialog){const r=dialog.getBoundingClientRect();if(event.clientX<r.left||event.clientX>r.right||event.clientY<r.top||event.clientY>r.bottom)dialog.close();}});
 dialog.addEventListener('close',()=>{document.body.classList.remove('modal-open');lastOpener?.focus({preventScroll:true});});
 $$('.feature-tabs button').forEach(button=>button.addEventListener('click',()=>{
  const feature=features.find(f=>f.id===button.dataset.feature);$$('.feature-tabs button').forEach(b=>b.setAttribute('aria-pressed',String(b===button)));
  $('#feature-after').src=feature.after;$('#feature-after').alt='Generated concept: '+feature.name;
  $('#feature-before').src=feature.before;$('#feature-before').alt='Saved image used as starting point for '+feature.name;
  $('#feature-title').textContent=feature.title;$('#feature-description').textContent=feature.description;$('#feature-number').textContent=feature.number;
  $('#feature-comparison input').setAttribute('aria-label','Reveal '+feature.name.toLowerCase()+' concept');setComparison($('#feature-comparison'),45);
 }));
 // Original browser color-grade explorations, separate from the saved pipeline finishes.
 const styles=[
  ['Original finish','natural','none'],['Bright airy','natural','brightness(1.10) saturate(.9) contrast(.96)'],['Soft daylight','natural','brightness(1.04) saturate(.78) contrast(.92)'],['Clean neutral','natural','saturate(.82) contrast(1.04)'],['Fresh green','natural','hue-rotate(5deg) saturate(1.12) brightness(1.02)'],['Gentle contrast','natural','contrast(.91) brightness(1.03)'],
  ['Warm welcome','warm','sepia(.17) saturate(1.05) brightness(1.04)'],['Golden morning','warm','sepia(.25) saturate(1.12) brightness(1.06)'],['Honey oak','warm','sepia(.32) saturate(.95) contrast(1.05)'],['Soft amber','warm','sepia(.2) saturate(.82) brightness(1.02)'],['Warm minimal','warm','sepia(.13) saturate(.65) brightness(1.06)'],['Sunlit retreat','warm','sepia(.17) saturate(1.15) contrast(1.08) brightness(1.03)'],
  ['Editorial calm','editorial','saturate(.62) contrast(1.09)'],['Film softness','editorial','sepia(.18) contrast(.89) saturate(.76) brightness(1.02)'],['Gallery white','editorial','saturate(.4) brightness(1.09) contrast(.97)'],['Deep contrast','editorial','contrast(1.18) brightness(.95) saturate(.88)'],['Quiet luxury','editorial','sepia(.1) saturate(.58) contrast(1.07)'],['Monochrome','editorial','grayscale(1) contrast(1.08)'],
  ['Cool clarity','cool','sepia(.06) hue-rotate(170deg) saturate(.82) brightness(1.04)'],['Nordic light','cool','saturate(.58) brightness(1.11) contrast(.95)'],['Blue hour mood','cool','sepia(.18) hue-rotate(165deg) saturate(.84) brightness(.9)'],['Crisp architecture','cool','saturate(.71) contrast(1.15)'],['Silver tones','cool','grayscale(.55) brightness(1.04) contrast(1.03)'],['Airy minimal','cool','saturate(.45) brightness(1.14) contrast(.9)']
 ];
 let styleIndex=0;
 function renderStyles(){const family=$('#style-family').value;$('#style-options').innerHTML=styles.map((s,i)=>({s,i})).filter(({s})=>family==='all'||s[1]===family).map(({s,i})=>`<button data-style="${i}" aria-pressed="${i===styleIndex}">${escape(s[0])}</button>`).join('');}
 $('#style-family').addEventListener('change',renderStyles);
 $('#style-options').addEventListener('click',event=>{const button=event.target.closest('[data-style]');if(!button)return;styleIndex=Number(button.dataset.style);const style=styles[styleIndex];$('#style-image').style.filter=style[2];$('#style-active').textContent=style[0];$('#style-image').alt='Kitchen photo with '+style[0].toLowerCase()+' browser color-grade preview';renderStyles();});
 renderStyles();
})();
