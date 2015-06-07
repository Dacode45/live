var express = require('express');
var router = express.Router();
var request = require('request');

var liveIds = [];


/* GET home page. */
router.get('/', function(req, res, next) {
  request('http://api.globalhack4.test.lockerdome.com/app_create_content?{"app_id":'+global.APP_ID+',"app_secret":"'+global.APP_SECRET+'","app_data":{"fun":"times"},"name":"Some App Content","text":"Short description of your content"}', function (error, response, body) {
      if (!error && res.statusCode == 200) {
          console.log(body); // Show the HTML for the Google homepage.
      }
  });
  res.render('main', { title: 'Express' });
});

module.exports = router;
