var express = require('express');
var router = express.Router();
var request = require('request');

var live_cards = [];
var post_cars = [];

var db = require('../db_connect.js');

/* GET home page. */



function createLiveCard(query, callback){
  query["app_id"] = global.APP_ID;
  query["app_secret"] = global.APP_SECRET;

  request.get("http://api.globalhack4.test.lockerdome.com/app_create_content?"+JSON.stringify(query),
  function(err, data){
    if(!data.status || err){
      err["server_error"] = "Failed to create content";
      callback(err)
    }else{
      storeLiveCard(data);
      callback(null, data);
    }
  });

}


function addUpdate(query, callback){

  if(!query.hasOwnProperty('live_card')){
    callback({"server_error":"Must set the id of the live card"})
    return;
  }
  //check if live card exist
  if(!checkLiveCardId(query.app_data.live_card)){
    callback({"server_error":"Must be a real live card"})
    return;

  }
  query["app_id"] = global.APP_ID;
  query["app_secret"] = global.APP_SECRET;

  request.get("http://api.globalhack4.test.lockerdome.com/app_create_content?"+JSON.stringify(query),
  function(err, data){
    if(!data.status || err){
      err["server_error"] = "Failed to create content";
      callback(err)
    }else{
      storeUpdate(data);
      callback(null, data);
    }
  });


}

function storeLiveCard(data){
//connect to server store the new card
  live_cards.push(data.result.id);
}

function storeUpdate(data){
  post_cars.push(data.result.id);
}



router.get('/', function(req, res, next) {

  var query = {
    app_id: global.APP_ID,
    app_secret: global.APP_SECRET,
    content_id: 7742596533190723
  }


  request.get("http://api.globalhack4.test.lockerdome.com/app_fetch_content?"+JSON.stringify(query), function(data){
    res.send(data);
  });
})
router.post('/live', function(req, res, next){
  var post = {};
  post.name = req.params.article_title;
  post.thumb_url = req.params.picture;
  post.text = req.params.text;

  if(!post.name, !post.text){
    res.send({err:"No name or text in your post"});
    return
  }

  createLiveCard(post, function(err, data){
    if(err){
      res.send({err:err})
    }else{
      res.send(data);
    }
  });


});


router.post('/card', function(req, res, next){
  res.send(stringify(o));
  return;
  var post = {};
  post.name = req.params.article_title;
  post.thumb_url = req.params.picture;
  post.text = req.params.text;
  post.live_card = req.params.live_card;

  if(!post.name, !post.text){
    res.send({err:"No name or text in your post"});
    return
  }

  addUpdate(post, function(err, data){
    if(err){
      res.send({err:err})
    }else{
      res.send(data);
    }
  });


});

function stringify(o){

o.o = o;

var cache = [];
JSON.stringify(o, function(key, value) {
    if (typeof value === 'object' && value !== null) {
        if (cache.indexOf(value) !== -1) {
            // Circular reference found, discard key
            return;
        }
        // Store value in our collection
        cache.push(value);
    }
    return value;
});
cache = null;
}

module.exports = router;
