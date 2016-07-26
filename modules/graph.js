var graph = {};

var request = require('request');
var data = require('./data');

graph.getFriends = function (userId, cb) {
  data.getUser(userId, function (user) {
    if (user) {
      userAccessToken = user['token']
      request({
        method: 'GET',
        uri: 'https://graph.facebook.com/v2.6/' + userId + '/friends?access_token=' + userAccessToken
      }, function (error, response, body) {
        cb(body);
      });
    }
  })
}

module.exports = graph;
