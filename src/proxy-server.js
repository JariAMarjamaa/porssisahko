//Start: \porssisahko\src>node proxy-server.js
/*
  npm install http-proxy-middleware –save
	asentaa proxyn serverin
*/
const express = require('express');
const { createProxyMiddleware } = require('http-proxy-middleware');

const app = express();

const apiProxy = createProxyMiddleware(/*'/api'*/'/v1', { //PorssisahkoNet versio
  //target: 'https://www.sahkohinta-api.fi',
  target: 'https://api.porssisahko.net/', //PorssisahkoNet versio
  changeOrigin: true,
  pathRewrite: {
   '^/api': '/api/v1',
  },
  onProxyRes: function (proxyRes, req, res) {
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
  },

});

//app.use('/api', apiProxy);
app.use('/v1', apiProxy); //PorssisahkoNet versio

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Proxy server listening on port ${PORT}`);
});