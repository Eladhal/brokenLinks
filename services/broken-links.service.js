const isRelativeUrl = require('is-relative-url');
const axios = require("axios");
const cheerio = require('cheerio');

function getBrokenLinksNumber(url) {
  return getBrokenLinks(url)
    .then(brokenLinks => {
      return brokenLinks.length;
    })
    .catch(err => {
      throw err;
    });
}

function getAllLinks(mainUrl) {
  return axios.get(mainUrl)
    .then(res => {
      $ = cheerio.load(res.data);

      const links = $("a")
        .toArray()
        .map(link => link.attribs.href)
        .filter(link => link !== '' && link !== '#' );

      return links; 
    })
    .catch (err =>{
      console.log(err);
    });
}

function getBrokenLinks(url) {
  return getAllLinks(url)
    .then(links => {
      const linksPromises = links.map(link => {
        const newUrl = isRelativeUrl(link) ? `${url}${link}` : link;

        return axios.get(newUrl)
          .then((res) => {
            return {
              link,
              isSuccess: true,
              res,
            };
          })
          .catch((err) => {
            return {
              link,
              isSuccess: false,
              res: err,
            };
          });
      });

      return Promise.all(linksPromises)
        .then((linksData) => {
          return linksData.filter(linkData => {
            return !linkData.isSuccess;         
          }).map(({link}) => link);
        }).catch((err) => {
          throw err;
        });

    }).catch((err) => {
      throw err;
    });
}

module.exports = {
	getBrokenLinksNumber,
};