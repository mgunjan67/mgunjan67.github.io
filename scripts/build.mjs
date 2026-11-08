import {cp, mkdir, readdir, stat, copyFile} from 'node:fs/promises';
import path from 'node:path';
const root=process.cwd(), output=path.join(root,'dist');
await mkdir(output,{recursive:true});
for(const file of ['index.html','styles.css','projects.js','app.js','.nojekyll','robots.txt','sitemap.xml']) await copyFile(path.join(root,file),path.join(output,file));
await cp(path.join(root,'media'),path.join(output,'media'),{recursive:true});
let bytes=0,count=0;
async function walk(dir){for(const name of await readdir(dir)){const item=path.join(dir,name);const info=await stat(item);if(info.isDirectory())await walk(item);else{count++;bytes+=info.size;}}}
await walk(output);
console.log(`Built ${count} static files (${(bytes/1024/1024).toFixed(2)} MB) in dist/. No runtime dependencies.`);
