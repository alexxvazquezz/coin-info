const fs = require('fs');

function view(template, values, res) {
  var fileContents = fs.readFileSync(`./views/${template}.html`, {encoding: "utf8"});
  res.write(fileContents);
}

module.exports.view = view;
