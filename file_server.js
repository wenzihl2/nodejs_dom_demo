var http = require('http');
var PORT=8080;
var IP="172.19.9.90";
var fs = require('fs');
var sys = require('sys');
var path = require('path');
var url =require('url');
var mime = require("./mime").types;
html='<!DOCTYPE html>' +
    '<html>' +
    '<head lang="en">' +
    '<meta charset="UTF-8" name="viewport" content="width=device-width,initial-scale=1">' +
    '<title>haha</title>' +
    '</head>' +
    '<body>' +
    'body' +
    '<img width="100%"  style="max-width: 600px;" src="img.jpg">' +
    '<img width="100%"  style="max-width: 600px;" src="img/img.jpg">' +
    '<textarea style="width: 100%;height: 100px;" name="" id="" cols="" rows=""></textarea>' +
    '<input type="text" style="width: 100%; height: 100px;"  name="firstname">' +
    '</body>' +
    '</html>';
var server = http.createServer(function (request, response) {
    if (request.url == '/') {
        response.writeHead(200, {
            'Content-Type': 'text/html'
        });
        response.write(html);
        response.end();
        return;
    }
    var pathname = url.parse(request.url).pathname;
    var realPath = "assets" + pathname;

    path.exists(realPath, function (exists) {
        console.log( "访问文件 "+realPath);
        if (!exists) {
            response.writeHead(404, {
                'Content-Type': 'text/plain'
            });

            response.write("This request URL " + pathname + " was not found on this server.");
            response.end();
        } else {

            fs.readFile(realPath, "binary", function (err, file) {
                if (err) {
                    response.writeHead(500, {
                        'Content-Type': 'text/plain'
                    });
                    response.end(err.toString());//访问文件夹
                } else {
                    var ext = path.extname(realPath);
                    ext = ext ? ext.slice(1) : 'unknown';
                    var contentType = mime[ext] || "text/plain";
                    response.writeHead(200, {'Content-Type': contentType});
                    response.write(file, "binary");
                    response.end();
                }
            });
        }
    });
});
server.listen(PORT, IP);