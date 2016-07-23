var firebase = require('firebase');
firebase.initializeApp({
  serviceAccount: "firebase-heroku-credentials.json",
  databaseURL: "https://frendr-de57d.firebaseio.com/"
});
var db = firebase.database();
var ref = db.ref("/messages");

var respond = function (message, senderId) {
  ref.push(message);
  return 'message recorded';
}

module.exports = respond;
