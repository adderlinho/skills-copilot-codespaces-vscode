// Create a web server that can respond to requests for /comments.json with a JSON-encoded representation of the list of comments.

var http = require('http');
var fs = require('fs');

var server = http.createServer(function (req, res) {
  if (req.url === '/comments.json') {
    fs.readFile('comments.json', function (err, data) {
      if (err) {
        console.error(err);
        res.statusCode = 500;
        res.end('Server error');
        return;
      }

      var comments = JSON.parse(data);
      res.setHeader('Content-Type', 'application/json');
      res.end(JSON.stringify(comments));
    });
  } else {
    res.statusCode = 404;
    res.end('Not found');
  }
});

server.listen(8080);
console.log('Server is listening on port 8080');