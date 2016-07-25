var data = {};

var firebase = require('firebase');
firebase.initializeApp({
  serviceAccount: 'firebase-heroku-credentials.json',
  databaseURL: 'https://frendr-de57d.firebaseio.com/'
});
var db = firebase.database();

data.logMessage = function (userId, message) {
  db.ref('/messages').push({
    'userId': userId,
    'message': message
  });
}

data.setToken = function (userId, token) {
  ref = db.ref('/tokens');
}

data.getToken = function (userId) {
  ref = db.ref('/tokens');
}

module.exports = data;
