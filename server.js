var http = require('http'),
    express = require('express'),
    app = express();


// require and load dotenv
require('dotenv').load();

// serve static files from public folder
app.use(express.static(__dirname + '/')); 


/*
 * Catch All Route
 */
app.get(['/'], function (req, res) {
  res.sendFile(__dirname + '/app/index.html');
});

/*
 * Listen on localhost:9000
 */
var port = process.env.PORT || 9000;
app.listen(port, function() {
  console.log('server started on port ', port);
});
