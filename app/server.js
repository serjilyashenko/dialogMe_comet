var http = require('http'),
    static = require('node-static'),
    url = require('url'),
    querystring = require('querystring'),
    indexFile = new static.Server('../'),
    subscribers = {};

http.createServer(accept).listen(8080);
console.log('created dialogMe server');

function accept(request, response) {
    var parsedUrl = url.parse(request.url),
        pathname = parsedUrl.pathname,
        query = parsedUrl.query,
        id = querystring.parse(query).id,
        message;

    console.log(pathname + ' ' + id);

    if (pathname === '/publish') {
        message = '';
        request.on('data', function(chunk) {
            message += chunk;
        }).on('end', function () {
            publish(id + ": " + message);
        });
        response.end('ok');
        return;
    }

    if (pathname === '/subscribe') {
        onSubscribe(request, response, id);
        return;
    }

    indexFile.serve(request, response);
}

function publish(message) {
    var id;
    console.log(message);

    for (id in subscribers) {
        subscribers[id].end(message);
    }
    subscribers = {};
}

function onSubscribe(request, response, id) {
    subscribers[id] = response;
    console.log(Object.keys(subscribers));

    request.on('close', function () {
        delete subscribers[id];
    });
}
