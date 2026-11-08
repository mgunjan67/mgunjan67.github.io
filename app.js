(() => {
  'use strict';
  const $ = (selector, root = document) => root.querySelector(selector);
  const $$ = (selector, root = document) => [...root.querySelectorAll(selector)];
  const escape = value => String(value).replace(/[&<>"']/g, char => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[char]));
  const reducedMotion = matchMedia('(prefers-reduced-motion: reduce)');
  const projects = window.PORTFOLIO_PROJECTS;
  let toastTimer;
  function toast(message) {
    const node = $('#toast'); node.textContent = message; node.classList.add('is-visible');
    clearTimeout(toastTimer); toastTimer = setTimeout(() => node.classList.remove('is-visible'), 3000);
  }
  async function copyText(value, success) {
    try {
      if (navigator.clipboard && window.isSecureContext) await navigator.clipboard.writeText(value);
      else {
        const field = document.createElement('textarea'); field.value = value;
        field.style.cssText = 'position:fixed;opacity:0;pointer-events:none';
        const host = $('#project-dialog').open ? $('#project-dialog') : document.body;
        host.append(field); field.select(); const copied = document.execCommand('copy'); field.remove();
        if (!copied) throw new Error('Clipboard unavailable');
      }
      toast(success);
    } catch { toast('Copy unavailable. Select the text to copy it.'); }
  }
  $('#copy-email').addEventListener('click', () => copyText('mgunjan67@gmail.com', 'Email address copied.'));
  $('#year').textContent = new Date().getFullYear();
  function updateClock() { $('#local-time').textContent = new Intl.DateTimeFormat('en-GB', { timeZone:'Asia/Kathmandu', hour:'2-digit', minute:'2-digit', hour12:false }).format(new Date()); }
  updateClock(); setInterval(updateClock, 60000);

  const menu = $('.menu-toggle'), navigation = $('#navigation');
  function closeMenu() { menu.setAttribute('aria-expanded', 'false'); menu.setAttribute('aria-label', 'Open navigation'); navigation.classList.remove('is-open'); }
  menu.addEventListener('click', () => {
    const open = menu.getAttribute('aria-expanded') !== 'true';
    menu.setAttribute('aria-expanded', String(open)); menu.setAttribute('aria-label', open ? 'Close navigation' : 'Open navigation');
    navigation.classList.toggle('is-open', open);
  });
  $$('a', navigation).forEach(link => link.addEventListener('click', closeMenu));
  document.addEventListener('keydown', event => { if (event.key === 'Escape') closeMenu(); });
  document.addEventListener('click', event => { if (!event.target.closest('.site-header')) closeMenu(); });
  matchMedia('(min-width:651px)').addEventListener('change', closeMenu);

  $$('.research-filters button').forEach(button => button.addEventListener('click', () => {
    $$('.research-filters button').forEach(item => item.setAttribute('aria-pressed', String(item === button)));
    $$('.research-row').forEach(row => { row.hidden = button.dataset.filter !== 'all' && !row.dataset.category.split(' ').includes(button.dataset.filter); });
  }));
  if ('IntersectionObserver' in window) {
    const reveals = new IntersectionObserver(entries => entries.forEach(entry => {
      if (entry.isIntersecting) { entry.target.classList.add('is-visible'); reveals.unobserve(entry.target); }
    }), { threshold:0.06 });
    $$('.reveal').forEach(node => reveals.observe(node));
    document.documentElement.classList.add('js-ready');
    const sections = new IntersectionObserver(entries => entries.forEach(entry => {
      if (entry.isIntersecting) $$('.nav-link').forEach(link => link.classList.toggle('is-active', link.hash === '#' + entry.target.id));
    }), { rootMargin:'-15% 0px -55% 0px' });
    $$('main > section[id]').forEach(section => sections.observe(section));
  }

  const dialog = $('#project-dialog'), content = $('#dialog-content');
  let lastOpener = null, lastSection = '#research';
  function renderProject(id) {
    const project = projects[id];
    if (!project) return;
    lastSection = '#' + project.section;
    const links = (project.links || []).map(link => `<a class="button button-dark" href="${escape(link.url)}"${link.url.startsWith('mailto:') ? '' : ' target="_blank" rel="noopener noreferrer"'}>${escape(link.label)} <span aria-hidden="true">↗</span></a>`).join('');
    const image = project.image ? `<figure class="dialog-gallery"><a href="${escape(project.image.src)}" target="_blank" rel="noopener noreferrer" aria-label="Open figure at full size"><img src="${escape(project.image.src)}" alt="${escape(project.image.alt)}"></a><figcaption>${escape(project.image.caption)}</figcaption></figure>` : '';
    const video = project.video ? `<video class="dialog-video" controls playsinline preload="none" poster="${escape(project.video.poster)}" aria-label="Final stabilized construction timelapse"><source src="${escape(project.video.src)}" type="video/mp4"><a href="${escape(project.video.src)}">Download the timelapse video</a></video>` : '';
    content.innerHTML = `<article class="dialog-body"><p class="eyebrow">${escape(project.eyebrow)}</p><h2 id="dialog-title">${escape(project.title)}</h2><p class="dialog-summary">${escape(project.summary)}</p><span class="dialog-status">${escape(project.status)}</span><p>${escape(project.context)}</p><div class="dialog-columns"><div><h3>The approach</h3><ul>${project.approach.map(item => `<li>${escape(item)}</li>`).join('')}</ul></div><div><h3>My contribution</h3><p>${escape(project.role)}</p><div class="tags">${project.stack.map(item => `<span>${escape(item)}</span>`).join('')}</div></div></div><aside class="dialog-boundary"><h3>What the evidence supports</h3><p>${escape(project.boundary)}</p></aside>${image}${video}<div class="dialog-links">${links}</div>${project.citation ? `<details class="citation-block"><summary>Reference & BibTeX</summary><pre>${escape(project.citation)}</pre><button class="citation-copy">Copy citation</button></details>` : ''}</article>`;
    $('.citation-copy', content)?.addEventListener('click', () => copyText(project.citation, 'BibTeX citation copied.'));
    if (!dialog.open) dialog.showModal();
    document.body.classList.add('modal-open'); dialog.scrollTop = 0;
    $('#close-dialog').focus({ preventScroll:true });
  }
  function openProject(id, opener) {
    if (!projects[id]) return;
    lastOpener = opener || document.activeElement;
    history.pushState({ projectNote:true }, '', '#project/' + id);
    renderProject(id);
  }
  function syncProject() {
    const id = location.hash.startsWith('#project/') ? location.hash.slice(9) : null;
    if (id && projects[id]) renderProject(id);
    else if (dialog.open) dialog.close();
  }
  $$('[data-project]').forEach(button => button.addEventListener('click', () => openProject(button.dataset.project, button)));
  $('#close-dialog').addEventListener('click', () => dialog.close());
  dialog.addEventListener('click', event => { if (event.target === dialog) { const rect = dialog.getBoundingClientRect(); if (event.clientX < rect.left || event.clientX > rect.right || event.clientY < rect.top || event.clientY > rect.bottom) dialog.close(); } });
  dialog.addEventListener('close', () => {
    $('video', content)?.pause(); document.body.classList.remove('modal-open');
    if (location.hash.startsWith('#project/')) {
      if (history.state?.projectNote) history.back();
      else history.replaceState(null, '', lastSection);
    }
    if (lastOpener?.isConnected) lastOpener.focus({preventScroll:true});
  });
  window.addEventListener('popstate', syncProject); window.addEventListener('hashchange', syncProject); syncProject();

  // A procedural visual study, not a scientific plot or measured dataset.
  const canvas = $('#signal-canvas'), ctx = canvas.getContext('2d');
  if (!ctx) return;
  let width = 0, height = 0, frame = 0, phase = 0, lastFrame = 0, view = 'terrain';
  let paused = reducedMotion.matches, inView = true, hoverX = 0, hoverY = 0;
  const pauseButton = $('#motion-toggle');
  const titles = {terrain:['01','Finding structure in the noise.'],wavefield:['02','Listening beyond the surface.'],network:['03','Connecting the pieces.']};
  function pauseState() {
    pauseButton.setAttribute('aria-pressed', String(paused));
    pauseButton.setAttribute('aria-label', paused ? 'Play animation' : 'Pause animation');
    $('path', pauseButton).setAttribute('d', paused ? 'M7 4L15 10L7 16Z' : 'M7 5v10M13 5v10');
  }
  function shouldRun() { return !paused && inView && !document.hidden; }
  function schedule() { if (!frame && shouldRun()) frame = requestAnimationFrame(animate); }
  function stop() { cancelAnimationFrame(frame); frame = 0; }
  function resize() {
    const rect = canvas.getBoundingClientRect(), dpr = Math.min(window.devicePixelRatio || 1, 1.8);
    width = rect.width; height = rect.height; canvas.width = Math.round(width*dpr); canvas.height = Math.round(height*dpr);
    ctx.setTransform(dpr,0,0,dpr,0,0); draw();
  }
  function terrain() {
    const rows = 40, cols = 68, scale = width / 590;
    const yaw = -.23 + hoverX*.045 + Math.sin(phase*.13)*.035;
    const c = Math.cos(yaw), s = Math.sin(yaw);
    const project = (x,z,y) => {
      const rx = x*c-z*s, rz=x*s+z*c;
      return [width*.5 + rx*scale, height*.47 + rz*.30*scale-y*scale + hoverY*2];
    };
    for (let row=0;row<rows;row++) {
      const z=(row/(rows-1)-.5)*390;
      for (let col=0;col<cols;col++) {
        const x=(col/(cols-1)-.5)*475;
        const a=Math.exp(-((x+36)**2/10200+(z+16)**2/16500));
        const b=Math.exp(-((x-140)**2/9800+(z-65)**2/10000));
        const y=142*a+65*b+Math.sin(x*.024+z*.018+phase*.4)*7+Math.sin(z*.04)*3;
        const p=project(x,z,y), bright=a*.78+b*.25;
        ctx.fillStyle=bright>.34 ? `rgba(237,${Math.round(126+bright*33)},${Math.round(83+bright*14)},${.48+bright*.44})` : `rgba(174,191,145,${.22+(row/rows)*.35})`;
        ctx.beginPath();ctx.arc(p[0],p[1],(.7+bright*.45)*Math.max(.8,scale),0,Math.PI*2);ctx.fill();
        if (col%4===0 && row%4===0 && bright>.55) {
          ctx.strokeStyle='rgba(235,151,105,.10)';ctx.lineWidth=.6;
          ctx.beginPath();ctx.moveTo(p[0],p[1]);const base=project(x,z,-12);ctx.lineTo(base[0],base[1]);ctx.stroke();
        }
      }
    }
    const summit=project(-28,-10,148);
    ctx.strokeStyle='rgba(238,160,112,.6)';ctx.lineWidth=.7;ctx.beginPath();ctx.arc(summit[0],summit[1],12*scale,0,Math.PI*2);ctx.stroke();
    ctx.beginPath();ctx.moveTo(summit[0],summit[1]-17*scale);ctx.lineTo(summit[0],summit[1]-55*scale);ctx.lineTo(summit[0]+50*scale,summit[1]-55*scale);ctx.stroke();
    ctx.fillStyle='#d4dcca';ctx.font=`${Math.max(6,8*scale)}px monospace`;ctx.fillText('STRUCTURE FOUND',summit[0]+55*scale,summit[1]-52*scale);
  }
  function wavefield() {
    const left=width*.1,right=width*.88,top=height*.2,bottom=height*.65;
    for(let row=0;row<25;row++){
      const y=top+(bottom-top)*row/24;ctx.beginPath();
      for(let i=0;i<=130;i++){
        const t=i/130,env=Math.exp(-((t-.5)**2)/.029),wave=Math.sin(t*53-phase*2+row*.2)*env;
        const x=left+t*(right-left), yy=y+wave*(9+row*.35);
        i===0?ctx.moveTo(x,yy):ctx.lineTo(x,yy);
      }
      ctx.strokeStyle=row%4===0?'rgba(238,151,104,.85)':'rgba(166,190,140,.42)';ctx.lineWidth=.75;ctx.stroke();
    }
    ctx.strokeStyle='rgba(238,151,104,.35)';ctx.setLineDash([3,5]);ctx.beginPath();ctx.moveTo(width*.5,top-17);ctx.lineTo(width*.5,bottom+24);ctx.stroke();ctx.setLineDash([]);
  }
  const nodes=Array.from({length:34},(_,i)=>{const angle=i*2.39996, r=Math.sqrt(i/34);return{x:Math.cos(angle)*r,y:Math.sin(angle)*r,z:i};});
  function network() {
    const scale=Math.min(width*.31,height*.25),cx=width*.5,cy=height*.43;
    const points=nodes.map(n=>({x:cx+n.x*scale+Math.sin(phase*.3+n.z)*5,y:cy+n.y*scale*.85+Math.cos(phase*.2+n.z)*5}));
    points.forEach((p,i)=>{points.forEach((q,j)=>{if(j<=i)return;const distance=Math.hypot(p.x-q.x,p.y-q.y);if(distance<scale*.56){ctx.strokeStyle=`rgba(171,193,146,${.35*(1-distance/(scale*.56))})`;ctx.lineWidth=.8;ctx.beginPath();ctx.moveTo(p.x,p.y);ctx.lineTo(q.x,q.y);ctx.stroke();}});ctx.fillStyle=i%5===0?'#f0a475':'#9daf8b';ctx.beginPath();ctx.arc(p.x,p.y,i%5===0?3.1:1.8,0,Math.PI*2);ctx.fill();if(i%5===0){ctx.strokeStyle='rgba(240,164,117,.25)';ctx.beginPath();ctx.arc(p.x,p.y,10,0,Math.PI*2);ctx.stroke();}});
  }
  function draw() {
    if(!width||!height)return;ctx.clearRect(0,0,width,height);
    if(view==='terrain')terrain();else if(view==='wavefield')wavefield();else network();
    ctx.strokeStyle='rgba(177,195,155,.35)';ctx.lineWidth=.6;
    [[24,height*.67],[width-25,height*.2]].forEach(([x,y])=>{ctx.beginPath();ctx.moveTo(x-4,y);ctx.lineTo(x+4,y);ctx.moveTo(x,y-4);ctx.lineTo(x,y+4);ctx.stroke();});
  }
  function animate(time) {
    frame=0;if(!shouldRun())return;
    if(time-lastFrame>33){phase+=.022;draw();lastFrame=time;}schedule();
  }
  $$('[data-view]').forEach(button=>button.addEventListener('click',()=>{
    view=button.dataset.view;$$('[data-view]').forEach(item=>item.setAttribute('aria-pressed',String(item===button)));
    $('#study-number').textContent=titles[view][0];$('#study-title').textContent=titles[view][1];draw();
  }));
  pauseButton.addEventListener('click',()=>{paused=!paused;pauseState();paused?stop():schedule();});
  reducedMotion.addEventListener('change',event=>{paused=event.matches;pauseState();paused?stop():schedule();draw();});
  canvas.addEventListener('pointermove',event=>{if(reducedMotion.matches)return;const rect=canvas.getBoundingClientRect();hoverX=(event.clientX-rect.left)/width-.5;hoverY=(event.clientY-rect.top)/height-.5;if(paused)draw();});
  canvas.addEventListener('pointerleave',()=>{hoverX=0;hoverY=0;if(paused)draw();});
  document.addEventListener('visibilitychange',()=>{document.hidden?stop():schedule();});
  if('IntersectionObserver' in window)new IntersectionObserver(entries=>{inView=entries[0].isIntersecting;inView?schedule():stop();}).observe(canvas);
  new ResizeObserver(resize).observe(canvas);pauseState();resize();schedule();
})();
