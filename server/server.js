const fs = require('fs');
const path = require('path');
const express = require('express');
const exphbs  = require('express-handlebars');

var app = express();

// main directories
const rootDir = path.resolve(__dirname);
const viewsDir = path.join(rootDir, 'views');
const staticDir = path.join(rootDir, 'static');

// directory for javascript + css files
app.use(express.static(staticDir));

// using handlebars to do a bit of templeting on server side
app.engine('handlebars', exphbs({
  defaultLayout: path.join(viewsDir, 'layouts', 'main'),
}));
app.set('view engine', 'handlebars');

// serves the search page
app.get('/search', function (request, response) {
  response.set('Content-Type', 'text/html');  
  response.set('X-XSS-Protection','1;mode=block');
  response.set('X-Frame-Options','SAMEORIGIN');
  response.set('X-Content-Type-Options','nosniff');

  const searchView = path.join(viewsDir, 'search', 'search');
  response.render(searchView);
});

// API returning the results. Please note that I
// deliberately diverged from the request, to make
// the API more compliant to REST architecture
app.get('/results/:areaCode', function (request, response) {
  response.set('Content-Type', 'application/json');

  if(request.params && request.params.areaCode.toLowerCase() === 'n11') {
    const dataDir = path.join(rootDir, 'data.json');
    fs.readFile(dataDir, function(error, data) {
      response.send(data);
    });
  } else {
    response.status(404);
    response.send({ error : 'No result found' });
  }
});

// Handle all other routes
app.use(function(request, response, next){
  response.status(404);

  const notFoundDir = path.join(viewsDir, '404', '404');
  response.render(notFoundDir);
});

// Instanciating the server
const server = app.listen(3000, function() {
  console.log('Server up => http://localhost:3000');
});

module.exports = server
