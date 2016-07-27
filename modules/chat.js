var chat = {};

var request = require('request');
var config = require('./config');
var graphBaseUrl = 'https://graph.facebook.com/v2.7';

chat.verify = function (req, res) {
  if (req.query['hub.verify_token'] === 'inspired_by_zuck') {
    res.send(req.query['hub.challenge']);
  } else {
    res.send('Error, wrong validation token');
  }
}

chat.parseMessages = function (body, cb) {
  var messaging_events = body['entry'][0]['messaging'];
  messaging_events.forEach(function (e) {
    if (('message' in e) && ('text' in e['message'])) {
      var userId = e['sender']['id'];
      var message = e['message']['text'];
      cb(userId, message);
    }
  });
}

chat.sendMessage = function (userId, message) {
  request({
    method: 'POST',
    uri: graphBaseUrl + '/me/messages?access_token=' + pageAccessToken,
    json: {
      'recipient': {
        'id': userId
      },
      'message': {
        'text': message
      }
    }
  });
}

chat.sendWelcome = function (userId) {
  request({
      method: 'POST',
      uri: graphBaseUrl + '/me/messages?access_token=' + pageAccessToken,
      json: {
        'recipient': {
          'id': userId
        },
        'message': {
          'text': 'Hey! I\'m Frendr. I\'ll help you connect with new friends!'
        }
      }
  });
  request({
      method: 'POST',
      uri: graphBaseUrl + '/me/messages?access_token=' + pageAccessToken,
      json: {
          'recipient': {
              'id': userId
          },
          'message': {
              'attachment': {
                  'type': 'template',
                  'payload': {
                      'template_type': 'button',
                      'text': 'First you\'ll have to me access to your public profile and friend list.',
                      'buttons': [
                          {
                              'type': 'web_url',
                              'title': 'Authenticate Frendr',
                              'url': 'https://www.facebook.com/dialog/authorize?client_id=1149903345052899&scope=friend_list&redirect_uri=http://rezbotai.herokuapp.com/auth?userId=' + userId
                          }
                      ]
                  }
              }
          }
      }
  });
}


module.exports = chat;
