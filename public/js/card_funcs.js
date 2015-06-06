

//update cards with the posts we have fetched from the lockerdome server
function update_cards(/*info to put in cards*/ new_posts){
    //put data in posts table
    //put data from posts into cards
}

//return the ids of the posts in the cards
function show_cards(){
    //access the ids from the table
    var pg = require('pg');

    pg.connect(process.env.DATABASE_URL, function(err, client) {
      var query = client.query('SELECT * FROM live_cards');
    
      query.on('row', function(row) {
        console.log(JSON.stringify(row));
      });
    });
    //give to david
    return JSON.stringify();
}