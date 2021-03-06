var Bear     = require('../models/bear');  
module.exports = function(app, isLoggedIn) {
    // =====================================
	// API ==============================
	// =====================================
	// on routes that end in /bears
 	// ----------------------------------------------------
 	app.get('/api/bears', isLoggedIn,
 
     // get all bears (accessed at POST http://localhost:8080/api/bears)
     function(req, res) {
         Bear.find(function(err, bears) {
             if (err)
                 res.send(err);

             res.json(bears);
         });


    });
    app.post('/api/bears', isLoggedIn,
        // create a bear (accessed at POST http://localhost:8080/api/bears)
        function(req, res) {
        var bear = new Bear();      // create a new instance of the Bear model
        bear.name = req.body.name;  // set the bears name (comes from the request)

        // save the bear and check for errors
        bear.save(function(err) {
            if (err)
                res.send(err);

            res.json({ message: 'Bear created!' });
        });
    });
	app.put('/api/bears', isLoggedIn, function(req, res) {
				Bear.find(function(err, bears) {
					if (err)
						res.send(err);
	
					res.json(bears);
				});
	});

 	app.get('/api/bears/:bear_id', isLoggedIn,
 
     // get the bear with that id (accessed at GET http://localhost:8080/api/bears/:bear_id)
     function(req, res) {
         Bear.findById(req.params.bear_id, function(err, bear) {
             if (err)
                 res.send(err);
             res.json(bear);
         });
     });
      // update the bear with this id (accessed at PUT http://localhost:8080/api/bears/:bear_id)
     app.put('/api/bears/:bear_id', isLoggedIn, function(req, res) {
 
         // use our bear model to find the bear we want
         Bear.findById(req.params.bear_id, function(err, bear) {
 
             if (err)
                 res.send(err);
 
             bear.name = req.body.name;  // update the bears info
 
             // save the bear
             bear.save(function(err) {
                 if (err)
                     res.send(err);
 
                 res.json({ message: 'Bear updated!' });
             });
 
         });
     });
     // delete the bear with this id (accessed at DELETE http://localhost:8080/api/bears/:bear_id)
      app.delete('/api/bears/:bear_id', isLoggedIn, function(req, res) {
         Bear.remove({
             _id: req.params.bear_id
         }, function(err, bear) {
             if (err)
                 res.send(err);
 
             res.json({ message: 'Successfully deleted' });
         });
     });
}