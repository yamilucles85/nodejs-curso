const http = require('http');
const url = require('url');
const querystring = require('querystring');
const { info, error } = require('./modules/my-log');
const consts = require('./utils/consts');
const firebase = require('../libs/firebase');
const { countries } = require('countries-list');

let result;


const server = http.createServer((req, res) => {

    let parsed = url.parse(req.url);
    console.log("parsed:", parsed);

    let pathname = parsed.pathname;

    let query = querystring.parse(parsed.query);
    console.log("query:", query);

    if (pathname == '/') {
        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.write('<html><body><p>HELLO</p></body></html>');
        res.end();
    } else if (pathname == '/exit') {
        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.write('<html><body><p>BYE</p></body></html>');
        res.end();
    } else if (pathname == '/country') {
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.write(JSON.stringify(countries[query.code]));
        res.end();
    } else if (pathname == '/info') {
        result = info(pathname);
        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.write(result);
        res.end();
    } else if (pathname == '/error') {
        result = error(pathname);
        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.write(result);
        res.end();
    } else {
        res.writeHead(404, { 'Content-Type': 'text/html' });
        res.write('<html><body><p>NOT FOUND</p></body></html>');
        res.end();
    }


});

server.listen(4000);
console.log('Running on 4000');