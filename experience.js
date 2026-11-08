/* Original interactive portfolio illustrations. All site geometry is invented. */
(() => {
 'use strict';
 const $=s=>document.querySelector(s),$$=s=>[...document.querySelectorAll(s)];
 const comparison=$('#home-comparison'),reveal=$('#home-reveal');
 if(comparison&&reveal){
  const setReveal=()=>{comparison.style.setProperty('--reveal',reveal.value+'%');reveal.setAttribute('aria-valuetext',reveal.value+' percent original, '+(100-reveal.value)+' percent finished');};
  reveal.addEventListener('input',setReveal);setReveal();
  $$('[data-home-scene]').forEach(button=>button.addEventListener('click',()=>{
   const scene=window.PHOTO_SHOWCASE?.scenes.find(s=>s.id===button.dataset.homeScene);if(!scene)return;
   $('#home-after').src=scene.after;$('#home-after').alt='Saved edited result: '+scene.title;
   $('#home-before').src=scene.before;$('#home-before').alt='One original exposure: '+scene.title;
   $$('[data-home-scene]').forEach(b=>b.setAttribute('aria-pressed',String(b===button)));
   reveal.value='45';setReveal();
  }));
 }
 const canvas=$('#site-canvas');if(!canvas)return;
 const ctx=canvas.getContext('2d');if(!ctx)return;
 const experience=$('#spatial-experience'),rotation=$('#site-rotation'),progress=$('#site-progress');
 experience.classList.add('spatial-ready');
 let width=0,height=0,yaw=-24*Math.PI/180,pitch=.58,mode='space',stage=.75;
 let renderFrame=0,dragging=false,lastX=0,lastY=0;
 const clamp=(n,min,max)=>Math.max(min,Math.min(max,n));
 function project(v){
  const c=Math.cos(yaw),s=Math.sin(yaw),x=v[0]*c-v[1]*s,y=v[0]*s+v[1]*c;
  const scale=Math.min(width/14.2,height/9.9);
  return [width*.52+x*scale,height*.56+y*scale*pitch-v[2]*scale*.91,y+v[2]*pitch/.91];
 }
 function path(points,close=false){ctx.beginPath();points.forEach((v,i)=>{const p=project(v);i?ctx.lineTo(p[0],p[1]):ctx.moveTo(p[0],p[1]);});if(close)ctx.closePath();}
 function line(points,color='#a6d8cd45',thickness=1,dash=[]){path(points);ctx.strokeStyle=color;ctx.lineWidth=thickness;ctx.setLineDash(dash);ctx.stroke();ctx.setLineDash([]);}
 function addBox(faces,x,y,z,w,d,h,colors){
  const a=[x,y,z],b=[x+w,y,z],c=[x+w,y+d,z],e=[x,y+d,z];
  const A=[x,y,z+h],B=[x+w,y,z+h],C=[x+w,y+d,z+h],E=[x,y+d,z+h];
  for(const [points,color] of [[[a,b,B,A],colors[1]],[[b,c,C,B],colors[2]],[[c,e,E,C],colors[1]],[[e,a,A,E],colors[2]],[[A,B,C,E],colors[0]]])faces.push({points,color});
 }
 function draw(){
  renderFrame=0;if(!width||!height)return;ctx.clearRect(0,0,width,height);
  const glow=ctx.createRadialGradient(width*.53,height*.58,10,width*.53,height*.58,width*.44);
  glow.addColorStop(0,'#426d7530');glow.addColorStop(1,'#0c141c00');ctx.fillStyle=glow;ctx.fillRect(0,0,width,height);
  const floor=[[-6,-4,0],[6,-4,0],[6,4,0],[-6,4,0]];
  path(floor,true);const fg=ctx.createLinearGradient(0,height*.3,width,height);fg.addColorStop(0,'#263941');fg.addColorStop(1,'#1a2932');ctx.fillStyle=fg;ctx.fill();ctx.strokeStyle='#789e9b40';ctx.lineWidth=1;ctx.stroke();
  for(let x=-6;x<=6;x++)line([[x,-4,.01],[x,4,.01]],'#9cc6c01b',.7);
  for(let y=-4;y<=4;y++)line([[-6,y,.01],[6,y,.01]],'#9cc6c01b',.7);
  line([[-5.2,2.9,.03],[5.3,2.9,.03]],'#b6c8b264',1.1,[6,7]);
  const amount=mode==='space'?1:stage;
  const buildingHeight=Math.max(.1,3.6*amount),faces=[];
  addBox(faces,-2.25,-1.5,.03,4.5,3,.18,['#9caaa4','#586e70','#728984']);
  addBox(faces,-2.02,-1.28,.21,4.04,2.56,buildingHeight,['#d1e3d9','#75979d','#476973']);
  addBox(faces,-2.14,-1.4,.21+buildingHeight,4.28,2.8,.13,['#dce8dc','#9aada6','#b2c4bc']);
  addBox(faces,2.65,-.65,.03,2.15,2.15,.17,['#a4b6ac','#5e7d79','#7f9a90']);
  addBox(faces,2.78,-.52,.2,1.89,1.89,Math.max(.13,2.1*amount),['#c9e1d2','#638b8d','#41636c']);
  addBox(faces,-4.8,1,.03,1.55,1.6,Math.max(.15,.8*amount),['#a9c5b7','#486b6b','#63877c']);
  for(const face of faces){face.depth=face.points.reduce((n,p)=>n+project(p)[2],0)/face.points.length;}
  faces.sort((a,b)=>a.depth-b.depth);
  for(const face of faces){path(face.points,true);ctx.fillStyle=face.color;ctx.fill();ctx.strokeStyle='#d2e6da38';ctx.lineWidth=.7;ctx.stroke();}
  // Translucent facade lines make the invented model inspectable from every angle.
  for(let floor=1;floor<=3;floor++){
   const z=.21+buildingHeight*floor/3;
   line([[-2.03,-1.29,z],[2.03,-1.29,z],[2.03,1.29,z],[-2.03,1.29,z],[-2.03,-1.29,z]],'#d8f6e25c',.9);
  }
  for(let k=1;k<6;k++){const x=-2.02+4.04*k/6;line([[x,-1.29,.24],[x,-1.29,.19+buildingHeight]],'#dbf5e342',.8);line([[x,1.29,.24],[x,1.29,.19+buildingHeight]],'#dbf5e342',.8);}
  for(let k=1;k<4;k++){const y=-1.28+2.56*k/4;line([[-2.03,y,.24],[-2.03,y,.19+buildingHeight]],'#dbf5e342',.8);line([[2.03,y,.24],[2.03,y,.19+buildingHeight]],'#dbf5e342',.8);}
  const target=[1.6,-.9,buildingHeight+.36],p=project(target);
  if(mode==='space'){
   const corners=[[-2.6,-1.85,.16],[2.6,-1.85,.16],[2.6,1.85,.16],[-2.6,1.85,.16]];
   line([...corners,corners[0]],'#d9fa7770',1,[4,6]);
   for(const c of corners)line([c,[c[0],c[1],buildingHeight+.6]],'#d9fa7740',1,[4,6]);
   line(corners.map(c=>[c[0],c[1],buildingHeight+.6]).concat([[-2.6,-1.85,buildingHeight+.6]]),'#d9fa7755',1,[4,6]);
   ctx.save();ctx.shadowColor='#d9fa77';ctx.shadowBlur=18;ctx.beginPath();ctx.arc(p[0],p[1],6,0,Math.PI*2);ctx.fillStyle='#e5ff99';ctx.fill();ctx.restore();
   ctx.beginPath();ctx.arc(p[0],p[1],17,0,Math.PI*2);ctx.strokeStyle='#e2ff9566';ctx.lineWidth=1;ctx.stroke();
   // A small image plane links a selected image point with the 3D point.
   const imageW=clamp(width*.15,82,170),imageH=imageW*.7,imageX=width*.10,imageY=height*.16;
   ctx.save();ctx.translate(imageX,imageY);ctx.rotate(-.10);
   ctx.shadowColor='#0005';ctx.shadowBlur=20;ctx.fillStyle='#ccdfd3';ctx.beginPath();ctx.roundRect(0,0,imageW,imageH,9);ctx.fill();ctx.shadowBlur=0;
   ctx.fillStyle='#70958d';ctx.beginPath();ctx.roundRect(7,7,imageW-14,imageH-22,4);ctx.fill();
   ctx.fillStyle='#d9e8db';ctx.beginPath();ctx.moveTo(imageW*.29,imageH*.42);ctx.lineTo(imageW*.52,imageH*.24);ctx.lineTo(imageW*.74,imageH*.43);ctx.lineTo(imageW*.51,imageH*.62);ctx.closePath();ctx.fill();
   ctx.fillStyle='#365e60';ctx.beginPath();ctx.moveTo(imageW*.29,imageH*.42);ctx.lineTo(imageW*.51,imageH*.62);ctx.lineTo(imageW*.51,imageH*.79);ctx.lineTo(imageW*.29,imageH*.61);ctx.closePath();ctx.fill();
   ctx.fillStyle='#4c7572';ctx.beginPath();ctx.moveTo(imageW*.51,imageH*.62);ctx.lineTo(imageW*.74,imageH*.43);ctx.lineTo(imageW*.74,imageH*.60);ctx.lineTo(imageW*.51,imageH*.79);ctx.closePath();ctx.fill();
   ctx.fillStyle='#e6ff9a';ctx.beginPath();ctx.arc(imageW*.51,imageH*.5,4,0,Math.PI*2);ctx.fill();ctx.restore();
   ctx.beginPath();ctx.moveTo(imageX+imageW*.5,imageY+imageH*.5);ctx.bezierCurveTo(width*.35,height*.13,width*.36,height*.42,p[0],p[1]);ctx.strokeStyle='#dfff9b88';ctx.lineWidth=1.1;ctx.setLineDash([4,6]);ctx.stroke();ctx.setLineDash([]);
  }else{
   // Progress is an illustrative construction state, not recorded client progress.
   const z=buildingHeight+.25;
   line([[-2.2,-1.5,z],[2.2,-1.5,z],[2.2,1.5,z],[-2.2,1.5,z],[-2.2,-1.5,z]],'#e3ffa5cc',1.5);
   for(let n=0;n<3;n++){
    const x=width*.30+n*width*.20,y=height*.88;
    ctx.beginPath();ctx.arc(x,y,3.5,0,Math.PI*2);ctx.fillStyle=amount>(n+1)/3-.12?'#e4ff9e':'#668378';ctx.fill();
   }
   ctx.beginPath();ctx.moveTo(width*.3,height*.88);ctx.lineTo(width*.7,height*.88);ctx.strokeStyle='#9bb7a94d';ctx.lineWidth=1;ctx.stroke();
  }
  canvas.setAttribute('aria-label',`Original 3D workflow illustration, ${mode==='space'?'spatial mapping':'construction progress'}, rotated ${Math.round(yaw*180/Math.PI)} degrees.`);
 }
 const schedule=()=>{if(!renderFrame)renderFrame=requestAnimationFrame(draw);};
 function resize(){const box=canvas.getBoundingClientRect(),dpr=Math.min(devicePixelRatio||1,2);width=box.width;height=box.height;canvas.width=Math.round(width*dpr);canvas.height=Math.round(height*dpr);ctx.setTransform(dpr,0,0,dpr,0,0);schedule();}
 new ResizeObserver(resize).observe(canvas);resize();
 rotation.addEventListener('input',()=>{yaw=Number(rotation.value)*Math.PI/180;rotation.setAttribute('aria-valuetext',rotation.value+' degrees');schedule();});
 const updateProgress=()=>{stage=Number(progress.value)/100;const phase=stage<.3?'Foundation':stage<.8?'Structure':'Finishing';$('#site-progress-value').textContent=phase;progress.setAttribute('aria-valuetext',phase+', '+progress.value+' percent');schedule();};
 progress.addEventListener('input',updateProgress);updateProgress();
 $$('[data-scene-mode]').forEach(button=>button.addEventListener('click',()=>{mode=button.dataset.sceneMode;$$('[data-scene-mode]').forEach(b=>b.setAttribute('aria-pressed',String(b===button)));$('#progress-control').hidden=mode!=='time';experience.dataset.mode=mode;schedule();}));
 canvas.addEventListener('pointerdown',event=>{if(event.button!==0&&event.pointerType==='mouse')return;dragging=true;lastX=event.clientX;lastY=event.clientY;canvas.setPointerCapture(event.pointerId);canvas.classList.add('is-dragging');});
 canvas.addEventListener('pointermove',event=>{if(!dragging)return;const dx=event.clientX-lastX,dy=event.clientY-lastY;lastX=event.clientX;lastY=event.clientY;yaw+=dx*.008;pitch=clamp(pitch+dy*.001,.35,.85);const degrees=((yaw*180/Math.PI+180)%360+360)%360-180;rotation.value=String(Math.round(degrees));rotation.setAttribute('aria-valuetext',rotation.value+' degrees');schedule();});
 const stop=()=>{dragging=false;canvas.classList.remove('is-dragging');};canvas.addEventListener('pointerup',stop);canvas.addEventListener('pointercancel',stop);canvas.addEventListener('lostpointercapture',stop);
})();
