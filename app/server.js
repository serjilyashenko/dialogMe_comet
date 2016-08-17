var http = require('http'),
    static = require('node-static'),
    indexFile = new static.Server('../');

http.createServer(accept).listen(8080);
console.log('created dialogMe server');

function accept(request, response) {
    console.log(request.url);

    indexFile.serve(request, response);
}
