import http from 'http';
import fs from 'fs/promises';
import path from 'path';

const hostname = 'localhost';
const port = 1234;
const distPath = path.join(process.cwd(), './dist');

const server = http.createServer((req, res) => {
  const uri = req.url === '/' ? '/index.html' : req.url;
  console.log(`${req.method} ${uri}`);
  const filePath = path.join(distPath, uri);
  const extname = String(path.extname(filePath)).toLowerCase();
  const mimeTypes = {
    '.html': 'text/html',
    '.js': 'text/javascript',
    '.css': 'text/css',
    '.map': 'application/json',
    '.json': 'application/json',
    '.png': 'image/png',
    '.jpg': 'image/jpg',
    '.ico': 'image/x-icon',
    '.gif': 'image/gif',
    '.svg': 'image/svg+xml',
    '.wav': 'audio/wav',
    '.mp4': 'video/mp4',
    '.woff': 'application/font-woff',
    '.ttf': 'application/font-ttf',
    '.eot': 'application/vnd.ms-fontobject',
    '.otf': 'application/font-otf',
    '.wasm': 'application/wasm',
  };
  const contentType = mimeTypes[extname] || 'application/octet-stream';
  // Validate mime type exists
  const invalidMimeType = !mimeTypes[extname];
  // Validate URL
  // Allows: alphanumeric characters, hyphens, underscores, and exactly one dot in the extension
  const isValidUri = /^\/?[a-zA-Z0-9_-]+(\.[a-zA-Z0-9]+)+$/.test(uri);
  const badRequest = !isValidUri || invalidMimeType;
  if (badRequest) {
    res.writeHead(400);
    res.end('B4d r3qu357');
    return;
  }

  // Prevent Content Type Sniffing
  res.setHeader('X-Content-Type-Options', 'nosniff');
  // Clickjacking Protection
  res.setHeader('X-Frame-Options', 'SAMEORIGIN');

  fs.readFile(filePath)
    .then((content) => {
      res.writeHead(200, { 'Content-Type': contentType });
      res.end(content, 'utf-8');
    })
    .catch((error) => {
      if (error.code === 'ENOENT') {
        return fs.readFile(path.join(distPath, '404.html'));
      } else {
        res.writeHead(500);
        res.end(`Server error: ${error.code}`);
        throw error; // Re-throw the error for logging purposes
      }
    })
    .then((content) => {
      if (content) {
        res.writeHead(404, { 'Content-Type': 'text/html' });
        res.end(content, 'utf-8');
      }
    })
    .catch((error) => {
      console.error(`Failed to read file: ${error}`);
    });
});

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});
