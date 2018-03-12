var EventEmitter = require("events").EventEmitter;
const https = require("https");
const http = require("http");
const api = require("./api.json");
const util = require('util');


/**
 * An EventEmitter to get a coin data from coinbase.
 * @param coin
 * @constructor
 */

function Coin(coin) {

  EventEmitter.call(this);

  var profileEmitter = this;

  var request = https.get(`${api.url}/prices/${coin}/buy` , function(res) {
    var body = "";

    if(res.statusCode !== 200) {
      request.abort();
      //status code error
      profileEmitter.emit("error", new Error("Unable to get coin " + res.statusCode));

    }

    //Read the data
    res.on('data', function(chunk) {
      body += chunk;
      profileEmitter.emit('data', chunk);
    })

    res.on('end', function() {
      if(res.statusCode === 200) {
        try {
          var coinData = JSON.parse(body);
          profileEmitter.emit("end", coinData)
        } catch(error) {
          profileEmitter('error', error)
        }
      }
    }).on("error", function(error) {
      profileEmitter.emit("error", error)
    })
  })
}

util.inherits(Coin, EventEmitter);

module.exports = Coin
