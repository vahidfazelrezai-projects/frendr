var data = {};

var firebase = require('firebase');
firebase.initializeApp({
  serviceAccount: 'modules/firebase-heroku-credentials.json',
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
  db.ref('/users/' + userId).update({
    'token': token
  });
}

data.getUser = function (userId, cb) {
  db.ref('/users/' + userId).once('value', function (snapshot) {
    cb(snapshot.val());
  })
}

module.exports = data;
