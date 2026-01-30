const http = require('http');
const fs = require('fs');
const path = require('path');

const port = process.env.PORT || 3000;

const mime = (ext) => {
  switch (ext) {
    case '.html': return 'text/html';
    case '.css': return 'text/css';
    case '.js': return 'application/javascript';
    case '.json': return 'application/json';
    case '.png': return 'image/png';
    case '.jpg': case '.jpeg': return 'image/jpeg';
    default: return 'text/plain';
  }
};

const server = http.createServer((req, res) => {
  let urlPath = req.url.split('?')[0];
  if (urlPath === '/') urlPath = '/index.html';
  const filePath = path.join(__dirname, urlPath);

  fs.stat(filePath, (err, stats) => {
    if (err) {
      res.statusCode = 404;
      res.end('Not found');
      return;
    }

    if (stats.isDirectory()) {
      res.statusCode = 403;
      res.end('Directory access denied');
      return;
    }

    fs.readFile(filePath, (err, data) => {
      if (err) { res.statusCode = 500; res.end('Server error'); return; }
      res.setHeader('Content-Type', mime(path.extname(filePath)));
      res.end(data);
    });
  });
});

server.listen(port, () => console.log(`Server running at http://localhost:${port}/`));