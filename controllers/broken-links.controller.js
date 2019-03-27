const brokenLinksServices = require('../services/broken-links.service');

function getBrokenLinksNumber(req, res, next) {
  brokenLinksServices.getBrokenLinksNumber(req.body.url)
    .then(brokenLinksNum => {
      res.send(brokenLinksNum.toString());
    })
    .catch(err => {
      res.status(400).send('Unexcpected error occured');
    });
}

module.exports = {
  getBrokenLinksNumber,
};
