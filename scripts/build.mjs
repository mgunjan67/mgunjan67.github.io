import {mkdir, readdir, stat, copyFile,readFile,rm} from 'node:fs/promises';
import path from 'node:path';
const root=process.cwd(), output=path.join(root,'dist');
if(path.relative(root,output)!=='dist')throw new Error('Refusing to clean an unexpected build directory.');
await rm(output,{recursive:true,force:true});
await mkdir(output,{recursive:true});
for(const file of ['index.html','photo-finisher.html','spatial-work.html','styles.css','visual.css','showcase.js','app.js','photo-lab.js','experience.js','.nojekyll','robots.txt','sitemap.xml']) await copyFile(path.join(root,file),path.join(output,file));
const publicContent=JSON.parse(await readFile(path.join(root,'public-content.json'),'utf8'));
for(const asset of publicContent.assets){const target=path.resolve(output,asset);const relative=path.relative(output,target);if(relative.startsWith('..')||path.isAbsolute(relative))throw new Error('Invalid public asset path.');await mkdir(path.dirname(target),{recursive:true});await copyFile(path.join(root,asset),target);}
let bytes=0,count=0;
async function walk(dir){for(const name of await readdir(dir)){const item=path.join(dir,name);const info=await stat(item);if(info.isDirectory())await walk(item);else{count++;bytes+=info.size;}}}
await walk(output);
console.log(`Built ${count} static files (${(bytes/1024/1024).toFixed(2)} MB) in dist/. No runtime dependencies.`);
