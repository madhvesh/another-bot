'use strict'

const
    express = require('express'),
    bodyParser = require('body-parser'),
    request = require('request'),
    prop =  require('./config/properties.json'),
    app = express();

var fs = require('fs');
var http = require('http');
var https = require('https');
var forceSsl = require('express-force-ssl');
app.use(forceSsl);

var options = {
  key: fs.readFileSync('sslcert/key.pem'),
  cert: fs.readFileSync('sslcert/cert.pem')
};


http.createServer(app).listen(4000);
var a = https.createServer(options, function (req, res) {
  res.writeHead(200);
  res.end("hello world\n");
}).listen(8000);

