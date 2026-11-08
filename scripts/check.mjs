import {readFile,readdir} from 'node:fs/promises';
import {existsSync} from 'node:fs';
import {runInNewContext,Script} from 'node:vm';
import path from 'node:path';
const root=process.cwd(),errors=[];
const html=await readFile('index.html','utf8'),css=await readFile('styles.css','utf8');
for(const file of ['app.js','projects.js','showcase.js','photo-lab.js'])new Script(await readFile(file,'utf8'),{filename:file});
const context={window:{}};runInNewContext(await readFile('projects.js','utf8'),context);
const projects=context.window.PORTFOLIO_PROJECTS;
runInNewContext(await readFile('showcase.js','utf8'),context);
const showcase=context.window.PHOTO_SHOWCASE;
if(showcase.scenes.length!==25||new Set(showcase.scenes.map(s=>s.id)).size!==25)errors.push('Expected 25 unique saved showcase scenes.');
if(showcase.scenes.reduce((n,s)=>n+s.exposures,0)!==64)errors.push('Source exposure count does not match approved collection.');
if(showcase.features.length!==3)errors.push('Expected three separately labeled feature concepts.');
const ids=[...html.matchAll(/\bid="([^"]+)"/g)].map(m=>m[1]);
if(new Set(ids).size!==ids.length)errors.push('Duplicate HTML id.');
if((html.match(/<h1\b/g)||[]).length!==1)errors.push('Expected a single main heading.');
const refs=[...html.matchAll(/(?:href|src)="([^"#]+)"/g)].map(m=>m[1]);
refs.push(...[...css.matchAll(/url\(['"]?([^)'"\s]+)['"]?\)/g)].map(m=>m[1]));
for(const scene of showcase.scenes)refs.push(scene.before,scene.after,scene.thumb);
for(const feature of showcase.features)refs.push(feature.before,feature.after);
for(const project of Object.values(projects)){
 if(project.image)refs.push(project.image.src);
 if(project.video)refs.push(project.video.src,project.video.poster);
 for(const link of project.links||[])if(link.local)refs.push(link.url);
}
for(const ref of new Set(refs))if(!/^(https?:|mailto:|data:)/.test(ref)&&!existsSync(path.join(root,ref)))errors.push(`Missing local asset: ${ref}`);
for(const m of html.matchAll(/href="#([^"]+)"/g))if(!ids.includes(m[1]))errors.push(`Broken section link: ${m[1]}`);
for(const m of html.matchAll(/data-project="([^"]+)"/g))if(!projects[m[1]])errors.push(`Missing project note: ${m[1]}`);
if(/href="#"/.test(html))errors.push('Empty placeholder link.');
const publicContent=JSON.parse(await readFile('public-content.json','utf8'));
for(const [id,project] of Object.entries(projects)){
 if(!Object.hasOwn(publicContent.sources,id))errors.push(`Project has no public provenance entry: ${id}`);
 for(const link of project.links||[])if(!publicContent.sources[id]?.includes(link.url))errors.push(`Unreviewed project source: ${id}`);
 if(project.image||project.video)errors.push(`Project media must be independently reviewed: ${id}`);
}
const publicAssets=new Set(publicContent.assets);
for(const ref of refs)if(ref.startsWith('media/')&&!publicAssets.has(ref))errors.push(`Reference missing from deployment allowlist: ${ref}`);
for(const scene of showcase.scenes)if(!/^\d{2}$/.test(scene.id)||!/media\/photos\/scene-\d{2}-/.test(scene.after))errors.push('Showcase identifiers must use neutral scene names.');
if(!publicContent.authorization?.photos||!publicContent.authorization?.employment)errors.push('Missing explicit content authorization record.');
async function inspectMedia(dir){for(const entry of await readdir(dir,{withFileTypes:true})){const file=path.join(dir,entry.name);if(entry.isSymbolicLink())errors.push('Media symlinks are not allowed.');else if(entry.isDirectory())await inspectMedia(file);else if(!publicAssets.has(path.relative(root,file).split(path.sep).join('/')))errors.push(`Asset outside the deployment list: ${entry.name}`);}}
await inspectMedia(path.join(root,'media'));
for(const file of publicAssets)if(!existsSync(path.join(root,file)))errors.push(`Missing reviewed asset: ${file}`);
for(const file of ['dm-sans-latin.woff2','instrument-serif-latin.woff2','instrument-serif-italic-latin.woff2'])if((await readFile('media/fonts/'+file)).subarray(0,4).toString()!=='wOF2')errors.push(`Invalid webfont: ${file}`);
if(/<video|\.pdf(?:["'?]|$)|\.mp4(?:["'?]|$)/i.test(html))errors.push('Unreviewed document or video reference.');
if(errors.length){console.error(errors.join('\n'));process.exitCode=1;}else console.log(`Checks passed: ${Object.keys(projects).length} reviewed project notes, 25 photo scenes, 3 feature concepts, explicit assets, section targets, fonts, and script syntax.`);
