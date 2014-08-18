var fs = require('fs');

function start(response) {
    response.writeHead(200, {"Content-Type": "text/plain"});
    response.end(fs.readFileSync(__dirname + '/index.html'));
}

function upload(response) {
    response.writeHead(200, {"Content-Type": "text/plain"});
    response.end(fs.readFileSync(__dirname + '/index1.html'));
}