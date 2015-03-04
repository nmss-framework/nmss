var express = require('express');
var serveStatic = require('serve-static');

var app = express();

app.use(serveStatic('doc', {'index': ['index.html']}));
app.listen(1010);