// index.js
// where your node app starts

// init project
var express = require('express');
var app = express();
require('dotenv').config()

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
app.get("/api/hello", function (req, res) {
  res.json({greeting: 'hello API'});
});

// The Challenge
app.get("/api/:date?", function (req, res) {
  const date = req.params.date;

  if (date === undefined || date === null) {
    return res.json({
      unix: new Date().valueOf(),
      utc: new Date().toUTCString()
    });
  }

  let timestamp
  if (/^\d+$/.test(date)) {
    timestamp = parseInt(date)
  } else {
    const parsedDate = new Date(date)

    if (isNaN(parsedDate)) {
      return res.json({ error: "Invalid Date" })
    }

    timestamp = parsedDate.getTime()
  }

  res.json({ unix: timestamp, utc: new Date(timestamp).toUTCString() })
  
})

// listen for requests :)
var listener = app.listen(3000, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
