// Hande routes - Post and Get and direct the user to the correct pages
const renderer = require('./renderer.js');
const commonHeaders = {"Content-type": "text/html"};

function home(req, res) {
  if (req.url === '/') {
    res.writeHead(200, commonHeaders);
    renderer.view('header', {}, res);
    renderer.view('search', {}, res);
    renderer.view('footer', {}, res);
    res.end();
  }

}


module.exports.home = home;
