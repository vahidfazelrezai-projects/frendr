var express = require('express');
var bodyParser = require('body-parser');
var app = express();
var port = process.env.PORT || 5000;
var actions = require('./actions');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.get('/', function (req, res) {
  if (req.query['hub.verify_token'] == 'inspired_by_zuck') {
    res.send(req.query['hub.challenge']);
  } else {
    res.send('Error, wrong validation token');
  }
});

app.post('/', function (req, res) {
  var messaging_events = req.body['entry'][0]['messaging'];
  messaging_events.forEach(function (e) {
    if (('message' in e) && ('text' in e['message'])) {
      var userId = e['sender']['id'];
      var message = e['message']['text'];
      actions.logMessage(userId, message)
      actions.sendMessage(userId, message)
    }
  });
  res.send(messaging_events);
});

app.listen(port, function() {
  console.log("running at port " + port);
});
