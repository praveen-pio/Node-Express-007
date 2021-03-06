var express = require('express');
var app = express();

//app.use(express.static('static'));
//app.get('/index.html', function (req, res) {
//   res.sendFile( "pages/index.html" );
//})
const path = require('path');

app.use(express.static('static'));

app.get('/', (req, res) => {
  res.sendFile(path.resolve('pages/index.html'));
})

app.get('/process_get', function (req, res) {
   // Prepare output in JSON format
   response = {
      p_id:req.query.p_id,
      p_name:req.query.p_name,
      p_cost:req.query.p_cost
   };
   console.log(response);
   res.end(JSON.stringify(response));
})

var server = app.listen(8081, function () {
   var host = server.address().address
   var port = server.address().port
   
   console.log("Example app listening at http://%s:%s", host, port)
})