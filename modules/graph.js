var graph = {};

var request = require('request');
var data = require('./data');
var config = require('./config');

graph.getToken = function (userId, code) {
  var redirectUri = config.baseUrl + '/token';
  request({
    method: 'GET',
    uri: 'https://graph.facebook.com/oauth/access_token?client_id=' + appId + '&redirect_uri=' + redirectUri + '&client_secret=' + appSecret + '&code=' + code
  }, function (error, response, body) {
    console.log(body);
  });
};

graph.getFriends = function (userId, cb) {
  return 'barnie';
  // data.getUser(userId, function (user) {
  //   if (user) {
  //     userAccessToken = user['token']
  //     request({
  //       method: 'GET',
  //       uri: 'https://graph.facebook.com/v2.6/' + userId + '/friends?access_token=' + userAccessToken
  //     }, function (error, response, body) {
  //       cb(body);
  //     });
  //   }
  // })
}

module.exports = graph;
