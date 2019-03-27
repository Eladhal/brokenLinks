const express = require('express');
const bodyParser = require("body-parser");
const port = 3000;

const brokenLinksController = require('./controllers/broken-links.controller');
const fakeRoutesController = require('./controllers/fake-routes.controller');

const app = express();

app.use(bodyParser.json());


app.post('/broken-links', brokenLinksController.getBrokenLinksNumber);

// fake routes
app.get('/', fakeRoutesController.gerIndexHTML);
app.get('/elad', fakeRoutesController.getElad);
app.get('/halperin', fakeRoutesController.getHalperin);

app.listen(port, (err) => {
  if (err) {
    return console.log('something bad happened', err)
  }
  console.log(`server is listening on ${port}`)
});