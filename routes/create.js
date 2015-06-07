var express = require('express');
var router = express.Router();
var request = require('request');

/* GET home page. */
router.get('/', function(req, res, next) {
  var query = {
    app_id: global.APP_ID,
    app_secret: global.APP_SECRET,
    content_id: 7742596533190723
  }

  request.get("http://api.globalhack4.test.lockerdome.com/app_fetch_content?"+JSON.stringify(query), function(data){
    res.send(arguments);
  });
});

router.post('/', function(req,res, next){
  res.send(req);
})

module.exports = router;
