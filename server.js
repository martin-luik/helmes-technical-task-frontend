const express = require('express');
const path = require('path');
const app = express();
const { createProxyMiddleware } = require('http-proxy-middleware');
const https = require('https');
const fs = require('fs');

const ROOT_PATH = '/dist/helmes-technical-task-frontend';

app.use(express.static(__dirname + ROOT_PATH));

const options = {
  key: fs.readFileSync('./certificates/private.key'),
  cert: fs.readFileSync('./certificates/certificate.crt'),
};

const apiProxy = createProxyMiddleware('/api', {
  target: 'https://localhost:8080/api',
  changeOrigin: true,
  secure: false,
  pathRewrite: {
    '^/api': '',
  },
});

app.use('/api', apiProxy);

app.get('/*', (req, res) => {
  res.sendFile(path.join(__dirname + `${ROOT_PATH}/index.html`));
});

https.createServer(options, app).listen(3000, () => {
  console.log('Server is running at https://localhost:3000');
});
