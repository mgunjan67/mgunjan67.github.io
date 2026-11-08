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

  let labCleanup = () => {};
  function mountSignalLab(host) {
    const plot = $('#lab-canvas',host), frequency = $('#lab-frequency',host), noise = $('#lab-noise',host);
    const smoothing = $('#lab-smooth',host), reset = $('#lab-reset',host), drawing = plot.getContext('2d');
    if (!drawing) return;
    let showAverage = false;
    function redraw() {
      const box = plot.getBoundingClientRect(), ratio = Math.min(devicePixelRatio || 1,2);
      const width = box.width, height = box.height;
      plot.width = Math.round(width * ratio); plot.height = Math.round(height * ratio);
      drawing.setTransform(ratio,0,0,ratio,0,0); drawing.clearRect(0,0,width,height);
      const cycles = Number(frequency.value), amplitude = Number(noise.value)/100;
      $('#lab-frequency-value',host).textContent = cycles + ' Hz';
      $('#lab-noise-value',host).textContent = noise.value + '%';
      const count = 500, left = 27, right = width - 15, middle = height*.49, scale = height*.29;
      drawing.strokeStyle = '#d5d9cd'; drawing.lineWidth = .7;
      for(let i=0;i<=10;i++){const x=left+(right-left)*i/10;drawing.beginPath();drawing.moveTo(x,15);drawing.lineTo(x,height-25);drawing.stroke();}
      for(let i=-1;i<=1;i++){const y=middle+i*scale;drawing.beginPath();drawing.moveTo(left,y);drawing.lineTo(right,y);drawing.stroke();}
      const clean = Array.from({length:count},(_,i)=>Math.sin(2*Math.PI*cycles*i/(count-1)));
      const observed = clean.map((value,i)=>value+amplitude*(Math.sin(i*2.73)*.58+Math.sin(i*8.13)*.27+Math.cos(i*1.17)*.28));
      function line(values,color,thickness){drawing.strokeStyle=color;drawing.lineWidth=thickness;drawing.beginPath();values.forEach((value,i)=>{const x=left+(right-left)*i/(count-1),y=middle-value*scale;i?drawing.lineTo(x,y):drawing.moveTo(x,y);});drawing.stroke();}
      line(clean,'#9ba28e',1.4);line(observed,'#c8512c',1.1);
      if(showAverage){const averaged=observed.map((_,i)=>{let sum=0,n=0;for(let j=Math.max(0,i-5);j<=Math.min(count-1,i+5);j++){sum+=observed[j];n++;}return sum/n;});line(averaged,'#263024',2.2);}
      drawing.font='9px monospace';drawing.fillStyle='#697062';drawing.fillText('0 s',left,height-7);drawing.fillText('1 s',right-18,height-7);
      plot.setAttribute('aria-label','Synthetic '+cycles+' Hz signal with '+noise.value+' percent noise amplitude'+(showAverage?' and an eleven-sample moving average.':'.'));
      smoothing.setAttribute('aria-pressed',String(showAverage));
      smoothing.textContent=showAverage?'Hide moving average':'Show moving average';
    }
    frequency.addEventListener('input',redraw);noise.addEventListener('input',redraw);
    smoothing.addEventListener('click',()=>{showAverage=!showAverage;redraw();});
    reset.addEventListener('click',()=>{frequency.value='3';noise.value='25';showAverage=false;redraw();});
    const sizing=new ResizeObserver(redraw);sizing.observe(plot);redraw();
    labCleanup=()=>sizing.disconnect();
  }

  const dialog = $('#project-dialog'), content = $('#dialog-content');
  let lastOpener = null, lastSection = '#research';
  function renderProject(id) {
    labCleanup();
    const project = projects[id];
    if (!project) return;
    lastSection = '#' + project.section;
    const links = (project.links || []).map(link => `<a class="button button-dark" href="${escape(link.url)}"${link.url.startsWith('mailto:') ? '' : ' target="_blank" rel="noopener noreferrer"'}>${escape(link.label)} <span aria-hidden="true">↗</span></a>`).join('');
    const lab = project.demo === 'signal' ? '<section class="signal-lab" aria-labelledby="lab-title"><div class="lab-header"><h3 id="lab-title">Play with the signal</h3><span>ONE SECOND · SYNTHETIC DATA</span></div><canvas id="lab-canvas" width="800" height="270" aria-label="Synthetic signal with adjustable frequency and noise"></canvas><div class="lab-legend"><span class="legend-clean">Clean reference</span><span class="legend-noisy">With noise</span><span class="legend-smooth">Moving average</span></div><div class="lab-controls"><label for="lab-frequency">Frequency <output id="lab-frequency-value">3 Hz</output><input type="range" id="lab-frequency" aria-label="Frequency" min="1" max="12" step="1" value="3"></label><label for="lab-noise">Noise amplitude <output id="lab-noise-value">25%</output><input type="range" id="lab-noise" aria-label="Noise amplitude" min="0" max="75" step="5" value="25"></label></div><div class="lab-actions"><button id="lab-smooth" aria-pressed="false">Show moving average</button><button id="lab-reset">Reset experiment ↺</button></div><p class="lab-note">All data is generated in your browser. Smoothing can also remove useful signal detail.</p></section>' : '';
    content.innerHTML = `<article class="dialog-body"><p class="eyebrow">${escape(project.eyebrow)}</p><h2 id="dialog-title">${escape(project.title)}</h2><p class="dialog-summary">${escape(project.summary)}</p><span class="dialog-status">${escape(project.status)}</span>${lab}<p>${escape(project.context)}</p><div class="dialog-columns"><div><h3>The approach</h3><ul>${project.approach.map(item => `<li>${escape(item)}</li>`).join('')}</ul></div><div><h3>My contribution</h3><p>${escape(project.role)}</p><div class="tags">${project.stack.map(item => `<span>${escape(item)}</span>`).join('')}</div></div></div><aside class="dialog-boundary"><h3>What the evidence supports</h3><p>${escape(project.boundary)}</p></aside><div class="dialog-links">${links}</div>${project.citation ? `<details class="citation-block"><summary>Reference & BibTeX</summary><pre>${escape(project.citation)}</pre><button class="citation-copy">Copy citation</button></details>` : ''}</article>`;
    $('.citation-copy', content)?.addEventListener('click', () => copyText(project.citation, 'BibTeX citation copied.'));
    if (!dialog.open) dialog.showModal();
    document.body.classList.add('modal-open'); dialog.scrollTop = 0;
    if (project.demo === 'signal') mountSignalLab(content);
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
    labCleanup(); document.body.classList.remove('modal-open');
    if (location.hash.startsWith('#project/')) {
      if (history.state?.projectNote) history.back();
      else history.replaceState(null, '', lastSection);
    }
    if (lastOpener?.isConnected) lastOpener.focus({preventScroll:true});
  });
  window.addEventListener('popstate', syncProject); window.addEventListener('hashchange', syncProject); syncProject();

  // Subtle depth response for the original avatar; no motion is needed to use the site.
  const avatarStage=$('[data-avatar-stage]');
  if(avatarStage&&matchMedia('(hover: hover)').matches){
    let tiltFrame=0,lastX=0,lastY=0;
    const resetTilt=()=>{cancelAnimationFrame(tiltFrame);tiltFrame=0;avatarStage.style.setProperty('--avatar-x','0deg');avatarStage.style.setProperty('--avatar-y','0deg');};
    avatarStage.addEventListener('pointermove',event=>{
      if(reducedMotion.matches)return;const box=avatarStage.getBoundingClientRect();lastX=(event.clientX-box.left)/box.width-.5;lastY=(event.clientY-box.top)/box.height-.5;
      if(!tiltFrame)tiltFrame=requestAnimationFrame(()=>{tiltFrame=0;avatarStage.style.setProperty('--avatar-x',(-lastY*2).toFixed(2)+'deg');avatarStage.style.setProperty('--avatar-y',(lastX*5).toFixed(2)+'deg');});
    });
    avatarStage.addEventListener('pointerleave',resetTilt);reducedMotion.addEventListener('change',resetTilt);
  }
})();
