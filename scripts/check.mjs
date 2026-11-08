import {readFile,readdir} from 'node:fs/promises';
import {existsSync} from 'node:fs';
import {runInNewContext,Script} from 'node:vm';
import path from 'node:path';
const root=process.cwd(),errors=[],files=['index.html','photo-finisher.html','angelswing.html'];
const pages=new Map(await Promise.all(files.map(async file=>[file,await readFile(file,'utf8')])));
const assets=JSON.parse(await readFile('public-content.json','utf8'));
const allowlist=new Set(assets.assets),context={window:{}};
for(const file of ['app.js','photo-lab.js','showcase.js','projects.js','experience.js'])new Script(await readFile(file,'utf8'),{filename:file});
runInNewContext(await readFile('showcase.js','utf8'),context);
runInNewContext(await readFile('projects.js','utf8'),context);
const {scenes,features}=context.window.PHOTO_SHOWCASE,projects=context.window.PORTFOLIO_PROJECTS;
const pageIds=new Map([...pages].map(([file,html])=>[file,[...html.matchAll(/\bid="([^"]+)"/g)].map(m=>m[1])]));
const refs=[];
for(const [file,html] of pages){
 const ids=pageIds.get(file);
 if(new Set(ids).size!==ids.length)errors.push(`${file}: duplicate id`);
 if((html.match(/<h1\b/g)||[]).length!==1)errors.push(`${file}: expected one main heading`);
 if(/href="#"/.test(html))errors.push(`${file}: empty link`);
 for(const match of html.matchAll(/(?:href|src)="([^"]+)"/g)){
  const ref=match[1];if(/^(https?:|mailto:|data:)/.test(ref))continue;
  const [target,hash]=ref.split('#');
  if(target)refs.push(target);
  if(hash&&!pageIds.get(target||file)?.includes(hash))errors.push(`${file}: broken section link ${ref}`);
 }
 if(/<video|\.pdf(?:["'?]|$)|\.mp4(?:["'?]|$)/i.test(html))errors.push(`${file}: unreviewed video or document`);
}
const css=(await Promise.all(['styles.css','visual.css'].map(f=>readFile(f,'utf8')))).join('\n');
const homeAvatars=[...pages.get('index.html').matchAll(/src="(media\/(?:avatars\/gunjan-[^"]+|gunjan-avatar-3d)\.webp)"/g)].map(m=>m[1]);
if(new Set(homeAvatars).size!==4)errors.push('Homepage must use the original avatar and three distinct pose variants');
refs.push(...[...css.matchAll(/url\(['"]?([^)'"\s]+)['"]?\)/g)].map(m=>m[1]));
for(const scene of scenes)refs.push(scene.before,scene.after,scene.thumb);
for(const feature of features)refs.push(feature.before,feature.after);
if(scenes.length!==25||new Set(scenes.map(s=>s.id)).size!==25)errors.push('Expected 25 unique saved scenes');
if(scenes.reduce((n,s)=>n+s.exposures,0)!==64)errors.push('Exposure count must match the approved collection');
if(features.length!==3)errors.push('Expected three separate feature concepts');
for(const ref of new Set(refs)){
 if(!existsSync(path.join(root,ref)))errors.push(`Missing local reference: ${ref}`);
 if(ref.startsWith('media/')&&!allowlist.has(ref))errors.push(`Unlisted asset: ${ref}`);
}
for(const [id,project] of Object.entries(projects)){
 if(!Object.hasOwn(assets.sources,id))errors.push(`Missing provenance: ${id}`);
 for(const link of project.links||[])if(!assets.sources[id]?.includes(link.url))errors.push(`Unreviewed source: ${id}`);
}
if(!assets.authorization?.photos||!assets.authorization?.employment)errors.push('Missing scoped content authorization');
for(const scene of scenes)if(!/^\d{2}$/.test(scene.id)||!/media\/photos\/scene-\d{2}-/.test(scene.after))errors.push('Scene identifiers must be neutral');
async function inspect(dir){for(const entry of await readdir(dir,{withFileTypes:true})){const file=path.join(dir,entry.name);if(entry.isSymbolicLink())errors.push('Media symlink');else if(entry.isDirectory())await inspect(file);else if(!allowlist.has(path.relative(root,file).split(path.sep).join('/')))errors.push(`Unlisted media: ${file}`);}}
await inspect(path.join(root,'media'));
for(const file of allowlist)if(!existsSync(path.join(root,file)))errors.push(`Missing reviewed asset: ${file}`);
if((await readFile('media/fonts/dm-sans-latin.woff2')).subarray(0,4).toString()!=='wOF2')errors.push('Invalid webfont');
if(errors.length){console.error(errors.join('\n'));process.exitCode=1;}else console.log('Checks passed: 3 linked pages, 25 saved comparisons, separate feature concepts, reviewed assets, provenance, and scripts.');
