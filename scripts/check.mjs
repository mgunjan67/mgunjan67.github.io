import {readFile,stat} from 'node:fs/promises';
import {existsSync} from 'node:fs';
import {runInNewContext,Script} from 'node:vm';
import path from 'node:path';
const root=process.cwd(),errors=[];
const html=await readFile('index.html','utf8'),css=await readFile('styles.css','utf8');
for(const file of ['app.js','projects.js'])new Script(await readFile(file,'utf8'),{filename:file});
const context={window:{}};runInNewContext(await readFile('projects.js','utf8'),context);
const projects=context.window.PORTFOLIO_PROJECTS;
const ids=[...html.matchAll(/\bid="([^"]+)"/g)].map(m=>m[1]);
if(new Set(ids).size!==ids.length)errors.push('Duplicate HTML id.');
if((html.match(/<h1\b/g)||[]).length!==1)errors.push('Expected a single main heading.');
const refs=[...html.matchAll(/(?:href|src)="([^"#]+)"/g)].map(m=>m[1]);
refs.push(...[...css.matchAll(/url\(['"]?([^)'"\s]+)['"]?\)/g)].map(m=>m[1]));
for(const project of Object.values(projects)){
 if(project.image)refs.push(project.image.src);
 if(project.video)refs.push(project.video.src,project.video.poster);
 for(const link of project.links||[])if(link.local)refs.push(link.url);
}
for(const ref of new Set(refs))if(!/^(https?:|mailto:|data:)/.test(ref)&&!existsSync(path.join(root,ref)))errors.push(`Missing local asset: ${ref}`);
for(const m of html.matchAll(/href="#([^"]+)"/g))if(!ids.includes(m[1]))errors.push(`Broken section link: ${m[1]}`);
for(const m of html.matchAll(/data-project="([^"]+)"/g))if(!projects[m[1]])errors.push(`Missing project note: ${m[1]}`);
if(/href="#"/.test(html))errors.push('Empty placeholder link.');
for(const file of ['media/gunjan-research-cv.pdf','media/gunjan-engineering-resume.pdf'])if(!(await readFile(file)).subarray(0,5).equals(Buffer.from('%PDF-')))errors.push(`Invalid PDF: ${file}`);
for(const file of ['dm-sans-latin.woff2','instrument-serif-latin.woff2','instrument-serif-italic-latin.woff2'])if((await readFile('media/fonts/'+file)).subarray(0,4).toString()!=='wOF2')errors.push(`Invalid webfont: ${file}`);
if((await stat('media/timelapse.mp4')).size>10*1024*1024)errors.push('Timelapse review copy exceeds 10 MB.');
if(errors.length){console.error(errors.join('\n'));process.exitCode=1;}else console.log(`Checks passed: ${Object.keys(projects).length} project notes, all local assets, section targets, font/PDF signatures, script syntax, and video budget.`);
