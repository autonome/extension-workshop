// server.js
// where your node app starts

// init project
var express = require('express');
var app = express();
var fs = require('fs');
var archiver = require('archiver');

// we've started you off with Express, 
// but feel free to use whatever libs or frameworks you'd like through `package.json`.

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get('/', function(request, response) {
  response.sendFile(__dirname + '/views/index.html');
});

// Download xpi
app.get('/download', function(req, res){
  let sourcepath = 'extension/';
  res.header('Content-Type', 'application/x-xpinstall');
  //res.header('Content-Type', 'application/zip');
  //res.header('Content-Disposition: attachment; filename=my-extension.zip');
  makeArchive(sourcepath, res);
});

function makeArchive(sourcepath, res) {
  var archive = archiver('zip');
  archive.pipe(res);
  archive.directory(sourcepath, false);
  archive.finalize();
}

// listen for requests :)
var listener = app.listen(process.env.PORT, function() {
  console.log('Your app is listening on port ' + listener.address().port);
});
