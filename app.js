// PACKAGES //
var express = require('express');
var bodyParser = require('body-parser');

// MODULES //
var chat = require('./modules/chat');
var data = require('./modules/data');
var graph = require('./modules/graph');
var config = require('./modules/config');

// APP SETUP //
var app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

// ENDPOINTS //
app.get('/', chat.verify);

app.post('/', function (req, res) {
  chat.parseMessages(req.body, function (userId, message) {
    console.log('callback on', userId, message);
    data.getUser(userId, function (user) {
      if (!user) chat.sendWelcome(userId);
      else {
        graph.getFriends(userId, function (friends) {
          chat.sendMessage(userId, JSON.stringify(friends));
        });
      }
    });
  });
});

app.get('/auth', function (req, res) {
  var userId = req.query.userId;
  var code = req.query.code;
  res.send('got id ' + userId + ' with code ' + code);
})

// START APP //
app.listen(config.port, function () {
  console.log('running at port ' + config.port);
  console.log(config);
});
