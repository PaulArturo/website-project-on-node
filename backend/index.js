import { createServer } from 'node:http';
import { readFile } from 'node:fs';
import { extname } from 'node:path';

const hostname = '127.0.0.1';
const port = 3000;
const mimeType = {
  '.html': 'text/html',
  '.css': 'text/css',
  '.js': 'application/javascript'  
}

const server = createServer((req, res) => {

  let resource = "."+req.url;
  if(resource=="./"){
    resource = "./frontend/page.html";
  }
  readFile(resource, (err, data) => {
    if (err) {
      res.statusCode = 404;
      res.setHeader('Content-Type', 'text/plain');
      res.end('<h1>Error al leer el archivo</h1>');
    } else {
      res.statusCode = 200;
      let type = extname(resource);
      let contentType = mimeType[type];
      res.setHeader('Content-Type', contentType);
      res.end(data);
    }
  });
});

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});
