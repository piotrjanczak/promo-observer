const fetch = require('node-fetch');
const HTMLParser = require('node-html-parser');

const data = require('./sites');
const {
  sites
} = data;

function preparePrice(price) {
  const cleanedPrice = price
    .replace('zł', '')
    .replace(',', '.');
  const priceAsFloat = parseFloat(cleanedPrice);
  return priceAsFloat;
}

function shorterTitle(title, length) {
  const shortTitle = `${title.substring(0, length)}...`;
  return shortTitle;
}

function showResult(body, url, satisfactoryPrice) {
  const html = HTMLParser.parse(body);

  var data = {};
  data.title = shorterTitle(html.querySelector('title').text, 25);

  if (url.includes('reserved.com')) {
    data.productPrice = preparePrice(html.querySelector('[property="product:price:amount"]').getAttribute('content'));
  }

  data.promo = (data.productPrice < satisfactoryPrice)
      ? 'PROMOCJA'
      : '';
  data.url = url;
  console.table([data]);
}

function downloadHTML({ url, price }) {
  fetch(url)
    .then(resp => resp.text())
    .then(body => showResult(body, url, price)); 
}

const result = sites.map(downloadHTML);
