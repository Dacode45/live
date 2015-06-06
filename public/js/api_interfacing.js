var pg = require('pg');
var conString = process.env.DATABASE_URL;

 This function should return all the posts id 
 // Assuming that the url has the id in it
 function retrievePosts(locker_id){
 var id_lists;

 var client = new pg.Client(conString);
 client.connect(function(err) {
   if(err) {
       return console.error('could not connect to postgres', err);
         }
           var locker_id = 0; //FIXME
             client.query("Select posts.id from posts, live_cards where post.card_id="+locker_id, function(err, result) {
                 if(err) {
                       return console.error('error running query', err);
                           }
                               console.log(result);
                                   //output: Tue Jan 15 2013 19:12:47 GMT-600 (CST)
                                       client.end();
                                           id_lists = result;
                                             });
                                             });
                                             return id_lists;
                                             }

                                             // Store the the post ino the database
                                             function storePostId(post_id, live_id){

                                             var client = new pg.Client(conString);
                                             client.connect(function(err) {
                                               if(err) {
                                                   return console.error('could not connect to postgres', err);
                                                     }
                                                       client.query("INSERT INTO TABLE posts (id, card_id) values ("+post_id+","+live_id+")", function(err, result) {
                                                           if(err) {
                                                                 return console.error('error running query', err);
                                                                     }
                                                                         console.log(result);
                                                                             //output: Tue Jan 15 2013 19:12:47 GMT-600 (CST)
                                                                                 client.end();
                                                                                   });
                                                                                   });
                                                                                   }

                                                                                   // Store the the live card into the database
                                                                                   function storePostId(live_id){

                                                                                   var client = new pg.Client(conString);
                                                                                   client.connect(function(err) {
                                                                                     if(err) {
                                                                                         return console.error('could not connect to postgres', err);
                                                                                           }
                                                                                             client.query("INSERT INTO TABLE live_cards (id) values ("+live_id+")", function(err, result) {
                                                                                                 if(err) {
                                                                                                       return console.error('error running query', err);
                                                                                                           }
                                                                                                               console.log(result);
                                                                                                                   //outpvut: Tue Jan 15 2013 19:12:47 GMT-600 (CST)
                                                                                                                       client.end();
                                                                                                                         });
                                                                                                                         });
                                                                                                                         }

