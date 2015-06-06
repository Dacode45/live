var express = require('express');
var router = express.Router();
var request = require('request');

/* GET home page. */
router.get('/', function(req, res, next) {
  request('http://api.globalhack4.test.lockerdome.com/app_create_content?{"app_id":7740523506827330,"app_secret":"l6l8QHRBUVJyn+1NqjZq7p4uERt+gTc17a7KA6fIV/tNwfTjxkrGTfc3np909WnDCwoQ4Y4p90Q69vWRcOv2fg==","app_data":{"fun":"times"},"name":"Some App Content","text":"Short description of your content"}', function (error, response, body) {
      if (!error && res.statusCode == 200) {
          console.log(body); // Show the HTML for the Google homepage.
      }
  });
  res.render('index', { title: 'Express' });
});

module.exports = router;
