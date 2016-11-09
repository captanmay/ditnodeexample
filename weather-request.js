var host = (process.env.VCAP_APP_HOST || 'localhost');
var port = (process.env.VCAP_APP_PORT || 8080);
var http = require('http');
var server = http.createServer( function(request, response) {
var body = 'This is a test.';
response.writeHead( 200, {
'Content-Length': body.length,
'Content-Type': 'text/plain'
});
response.write(body);
response.end();
});
server.listen(port, host);