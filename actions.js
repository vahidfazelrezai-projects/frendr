var actions = {}
var pageAccessToken = process.env.PAT || 'patsecret';
var request = require('request');
var firebase = require('firebase');
firebase.initializeApp({
  serviceAccount: 'firebase-heroku-credentials.json',
  databaseURL: 'https://frendr-de57d.firebaseio.com/'
});
var db = firebase.database();

actions.logMessage = function (userId, message) {
  db.ref('/messages').push({
    'userId': userId,
    'message': message
  });
}

actions.sendMessage = function (userId, message) {
  request({
    method: 'POST',
    uri: 'https://graph.facebook.com/v2.6/me/messages?access_token=' + pageAccessToken,
    json: {
      'recipient': {
        'id': userId
      },
      'message': {
        "attachment":{
          "type":"template",
          "payload":{
            "template_type":"button",
            "text":"Click to authenticate",
            "buttons":[
              {
                "type":"web_url",
                "title":"Start Chatting",
                "payload":"google.com"
              }
            ]
          }
        }
      }
    }
  });
}

module.exports = actions;
