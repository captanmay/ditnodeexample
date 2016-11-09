var host = (process.env.VCAP_APP_HOST || 'localhost');
var port = (process.env.VCAP_APP_PORT || 8080);
var http = require('http');
var options = {
host: 'w1.weather.gov',
path: '/xml/current_obs/KSFO.xml'
};
var server = http.createServer( function(request, response) {
var weatherCallback = function(weatherResponse) {
var buffer = '';
weatherResponse.on('data', function(chunk){
buffer += chunk;
});
weatherResponse.on('end', function() {
var body = buffer;
response.writeHead( 200, {
'Content-Length': body.length,
'Content-Type': 'text/plain'
});
response.write(body);
response.end();
});
};
var weatherRequest = http.request( options, weatherCallback );
weatherRequest.on('error', function(e) {
response.writeHead( 500, {
'Content-Length': e.message.length,
'Content-Type': 'text/plain'
});
response.write(e.message);
response.end();
});
});
server.listen(port, host);