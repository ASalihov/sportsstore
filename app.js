var connect = require('connect');
var serveStatic = require('serve-static');
var app = connect();

app.use(serveStatic('./angularjs'));

app.listen(5000, () => console.log('listening 5000'));