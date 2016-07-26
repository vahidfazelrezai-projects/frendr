var firebase = require('firebase');
firebase.initializeApp({
  serviceAccount: 'firebase-heroku-credentials.json',
  databaseURL: 'https://frendr-de57d.firebaseio.com/'
});
var db = firebase.database();


userId = '12345';
token = 'abcdefghij';
message = 'hello';


db.ref('/users/' + userId).once('value', function (snapshot) {
  var user = snapshot.val();
  console.log(user);
})
