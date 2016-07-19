var express = require('express');
var bodyParser = require('body-parser');
var request = require('request');

var app = express();
var port = process.env.PORT || 5000;
var PAT = process.env.PAT || 'patsecret';

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
  messaging_events = req.body['entry'][0]['messaging'];
  messaging_events.forEach(function (e) {
    if (('message' in e) && ('text' in e['message'])) {
      senderId = e['sender']['id'];
      message = e['message']['text'];
      send_message(PAT, senderId, message)
    }
  });
  res.send(messaging_events);
});

send_message = function (PAT, senderId, message) {
  console.log(message);
  request.post(
    'https://graph.facebook.com/v2.6/me/messages?access_token=' + PAT,
    {
      "recipient":{
        "id": senderId
      },
      "message":{
        "text": message
      }
    });
}

app.listen(port, function() {
  console.log("running at port " + port);
});
