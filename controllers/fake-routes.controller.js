const path = require('path');

function gerIndexHTML(req, res, next) {
  res.sendFile(path.join(__dirname + '/../index.html'));
}
  
function getElad(req, res, next){
  res.send('ok');
}
  
function getHalperin(req, res, next){
  res.send('ok');
}

module.exports ={
  gerIndexHTML,
  getElad,
  getHalperin,
};