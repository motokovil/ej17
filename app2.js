const http = require('http');

const server = http.createServer((req, res) => {    
    const url = req.url;

    switch(url){
        case '/': 
            res.write('<html>');
            res.write('<head><title>Ejemplo servidor con Node</title></head>');
            res.write(`<body><h1>Hello World</h1>`);
            return res.end();
        default: 
            res.write('<html>');
            res.write('<head><title>Ejemplo servidor con Node</title></head>');
            res.write(`<body><h1>Not found</h1>`);
            return res.end();
    }

});

server.listen(8000);