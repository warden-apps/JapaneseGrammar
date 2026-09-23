const http = require('node:http');
const fs = require('node:fs');
const path = require('node:path');
const root = path.resolve(__dirname, '..');
const port = Number(process.argv[2] || 8775);
const types = {'.html':'text/html; charset=utf-8','.js':'text/javascript; charset=utf-8','.css':'text/css; charset=utf-8','.json':'application/json; charset=utf-8','.svg':'image/svg+xml','.png':'image/png','.ico':'image/x-icon','.md':'text/plain; charset=utf-8'};
http.createServer((req, res) => {
  let name;
  try { name = decodeURIComponent(new URL(req.url, 'http://localhost').pathname); }
  catch { res.writeHead(400); res.end(); return; }
  if(name.endsWith('/')) name += 'index.html';
  const file = path.resolve(root, '.' + name);
  if(!file.startsWith(root + path.sep) || path.relative(root,file).split(path.sep).some(p=>p.startsWith('.'))) { res.writeHead(403); res.end(); return; }
  fs.readFile(file, (err, data) => {
    if(err) { res.writeHead(404); res.end('Not found'); return; }
    res.writeHead(200, {'Content-Type':types[path.extname(file)] || 'application/octet-stream', 'Cache-Control':'no-cache'}); res.end(data);
  });
}).listen(port, '127.0.0.1', () => console.log('Sujimichi: http://127.0.0.1:' + port));
