// Problem: get price status from coinbase and display it to the user
// Solution: Use node.js to connect to the coinbase api and return data, then display it on the browser
const http = require('http');
const hostname = '127.0.0.1';
const port = 3000;
const router = require('./routes.js');


// Create a server
http.createServer((req, res) => {
  router.home(req, res);
}).listen(port, hostname);
console.log(`Listening at ${hostname}:${port}/`);



// Make a function to get coin data

// make a function to render and diplay the data in template html
