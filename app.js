var express = require('express');
var bodyParser = require('body-parser');
var app = express();
var port = process.env.PORT || 5000;
var chat = require('./modules/chat');
var data = require('./modules/data');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.get('/', chat.verify);

app.post('/', function (req, res) {
  var messaging_events = req.body['entry'][0]['messaging'];
  messaging_events.forEach(function (e) {
    if (('message' in e) && ('text' in e['message'])) {
      var userId = e['sender']['id'];
      var message = e['message']['text'];
      chat.sendWelcome(userId);
    }
  });
  res.send(messaging_events);
});

app.get('/auth', function (req, res) {
  res.send(req.query);
})

app.listen(port, function () {
  console.log('running at port ' + port);
});
