import http from 'node:http';
import {stat,readFile} from 'node:fs/promises';
import path from 'node:path';
const root=process.cwd(),port=Number(process.env.PORT||4173);
const types={'.html':'text/html; charset=utf-8','.css':'text/css; charset=utf-8','.js':'text/javascript; charset=utf-8','.svg':'image/svg+xml','.png':'image/png','.webp':'image/webp','.woff2':'font/woff2','.pdf':'application/pdf','.mp4':'video/mp4','.xml':'application/xml','.txt':'text/plain'};
const server=http.createServer(async(req,res)=>{
 try{
  const requested=decodeURIComponent(new URL(req.url,'http://localhost').pathname);
  const file=path.resolve(root,'.'+(requested.endsWith('/')?requested+'index.html':requested));
  const relative=path.relative(root,file);
  if(relative.startsWith('..')||path.isAbsolute(relative)||relative.split(path.sep).some(p=>p.startsWith('.')&&p!=='.nojekyll')){res.writeHead(403);res.end('Forbidden');return;}
  const info=await stat(file);if(!info.isFile())throw new Error('Not a file');
  const headers={'Content-Type':types[path.extname(file)]||'application/octet-stream','Cache-Control':'no-cache','X-Content-Type-Options':'nosniff'};
  if(req.headers.range){const m=req.headers.range.match(/^bytes=(\d+)-(\d*)$/);if(m){const start=Number(m[1]),end=m[2]?Math.min(Number(m[2]),info.size-1):info.size-1;if(start> end||start>=info.size){res.writeHead(416,{'Content-Range':`bytes */${info.size}`});res.end();return;}const data=await readFile(file);res.writeHead(206,{...headers,'Content-Range':`bytes ${start}-${end}/${info.size}`,'Accept-Ranges':'bytes','Content-Length':end-start+1});res.end(req.method==='HEAD'?undefined:data.subarray(start,end+1));return;}}
  res.writeHead(200,{...headers,'Content-Length':info.size,'Accept-Ranges':'bytes'});res.end(req.method==='HEAD'?undefined:await readFile(file));
 }catch{res.writeHead(404,{'Content-Type':'text/plain'});res.end('Not found');}
});
server.listen(port,'127.0.0.1',()=>console.log(`Local: http://127.0.0.1:${port}`));
