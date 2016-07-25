var chat = {};

var request = require('request');
var pageAccessToken = process.env.PAT || 'secret';

chat.verify = function (req, res) {
  if (req.query['hub.verify_token'] === 'inspired_by_zuck') {
    res.send(req.query['hub.challenge']);
  } else {
    res.send('Error, wrong validation token');
  }
}

chat.sendMessage = function (userId, message) {
  request({
    method: 'POST',
    uri: 'https://graph.facebook.com/v2.6/me/messages?access_token=' + pageAccessToken,
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
      uri: 'https://graph.facebook.com/v2.6/me/messages?access_token=' + pageAccessToken,
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
      uri: 'https://graph.facebook.com/v2.6/me/messages?access_token=' + pageAccessToken,
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
                              'url': 'https://www.facebook.com/dialog/oauth?client_id=1149903345052899&scope=friend_list&redirect_uri=http://rezbotai.herokuapp.com/auth'
                          }
                      ]
                  }
              }
          }
      }
  });
}


module.exports = chat;
