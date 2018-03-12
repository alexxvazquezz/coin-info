// Hande routes - Post and Get and direct the user to the correct pages
const render = require('./renderer.js');
const commonHeaders = {"Content-type": "text/html"};
const cssHeader = {'Content-type': 'text/css'}
const fs = require('fs');
const Coin = require('./coin.js')

function loadCss(req, res) {
  if(req.url.indexOf(".css") !== -1){
    var cssFile = fs.readFileSync(`.${req.url}`);
    res.writeHead(200, cssHeader);
    res.write(cssFile);
    res.end();
  }
}

function home(req, res) {
  if (req.url === '/') {


    res.writeHead(200, {
    'Content-type': 'text/html',
    "CB-VERSION" : "2015-04-08" });
    render.view("header", {}, res);
    // renderer.view('search', {}, res);
    // renderer.view('footer', {}, res);
    res.end();
  }

}


function coinRoute(req, res) {
  var coinUrl = req.url.replace('/', '');

  if(coinUrl.length > 0 ) {
    res.writeHead(200, {
    'Content-type': 'text/plain',
    "CB-VERSION" : "2015-04-08" });
    let coinPrice = new Coin(coinUrl);

    coinPrice.on("end", function(coinParsed) {
      let coinDa = coinParsed;
      // let values = {
      //   cyptoType: coinDa.data.base,
      //   currency: coindDa.data.currency,
      //   cryptoPrice: coinDa.data.amount
      //     }
        res.write("Current BTC Price: " + coinDa.data.amount)
        //res.write("The bitcoin price is: " + values.cryptoPrice);
        res.end();
    });

    coinPrice.on("error", function(error) {
      res.write(error.message);
      res.end()
    });


  }


}

module.exports.home = home;
module.exports.css = loadCss;
module.exports.coinRoute = coinRoute;;
