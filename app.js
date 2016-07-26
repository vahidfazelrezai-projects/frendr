var express = require('express');
var bodyParser = require('body-parser');
var app = express();
var port = process.env.PORT || 5000;
var chat = require('./modules/chat');
var data = require('./modules/data');
var graph = require('./modules/graph');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.get('/', chat.verify);

app.post('/', function (req, res) {
  var messaging_events = req.body['entry'][0]['messaging'];
  messaging_events.forEach(function (e) {
    if (('message' in e) && ('text' in e['message'])) {
      var userId = e['sender']['id'];
      var message = e['message']['text'];
      data.getUser(userId, function (user) {
        if (user) {
          graph.getFriends(userId, function (friends) {
            chat.sendMessage(userId, JSON.stringify(friends));
          })
        } else {
          chat.sendWelcome(userId);
        }
      })
    }
  });
  res.send(messaging_events);
});

app.get('/auth', function (req, res) {
  data.setToken(req.query.userId, req.query.code);
  res.redirect('http://m.me/meetpeeps');
})

app.listen(port, function () {
  console.log('running at port ' + port);
});
