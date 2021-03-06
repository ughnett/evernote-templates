var juice = require('juice');
var ejs = require('ejs');
var fs = require('fs');
var path = require('path');

var root = path.join(__dirname, 'src');
fs.readdir(root, function(err, files) {
  files.forEach(function(file) {
    var fullpath = path.join(root, file);
    fs.readFile(fullpath, 'utf8', function(err, src) {

      var h = ejs.render(src);
      
      var out = h.split('style>');
      var html = juice(out[2], out[1]);
      var outFile = path.join(__dirname, 'dist', file);
      console.log(outFile + ' written');
      fs.writeFile(outFile, html);
    });
  });
});
