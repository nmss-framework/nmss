var express = require('express');
var app = express();
app.use(express.static('doc'));
app.listen(7894);