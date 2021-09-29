// server.js
// where your node app starts

// init project
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({optionsSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


// your first API endpoint... 
app.get("/api/:date", function (req, res) {
  var date = req.params.date;
  var regex = /^[0-9]{1,}$/;
  var resDate;
  if (regex.test(date)) {
    date = parseInt(date); 
    resDate = new Date(date);
    res.json({ 
      unix: resDate.valueOf(), 
      utc: resDate.toUTCString()
    })
  } else if (new Date(date) != "Invalid Date") {
    resDate = new Date(date);
    res.json({ 
      unix: resDate.valueOf(), 
      utc: resDate.toUTCString()
    })
  } else if (new Date(date) == "Invalid Date") {
    res.json({ error : "Invalid Date" });
  }
})

app.get("/api", function (req, res) {
  res.json({
    unix: new Date().getTime(),
    utc: new Date().toUTCString()
  })
})

// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
