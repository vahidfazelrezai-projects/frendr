var config = {};

config.baseUrl = 'http://rezbotai.herokuapp.com';
config.port = '5000';
config.pageAccessToken = process.env.PAGEACCESSTOKEN;
config.appId = process.env.APPID;
config.appSecret = process.env.APPSECRET

module.exports = config;
