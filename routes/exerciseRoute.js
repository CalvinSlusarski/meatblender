
var Exercise     = require('../models/exercise');  
module.exports = function(app, isLoggedIn) {
    // =====================================
	// API ==============================
	// =====================================
	// on routes that end in /exercises
 	// ----------------------------------------------------
 	app.get('/api/exercises', isLoggedIn,
 
     // create a exercise (accessed at POST http://localhost:8080/api/exercises)
     function(req, res) {
         
         var exercise = new Exercise();      // create a new instance of the Exercise model
         exercise.name = req.body.name;  // set the exercises name (comes from the request)
 
         // save the exercise and check for errors
         exercise.save(function(err) {
             if (err)
                 res.send(err);
 
             res.json({ message: 'Exercise created!' });
         });
         
    });
	app.put('/api/exercises', isLoggedIn, function(req, res) {
				Exercise.find(function(err, exercises) {
					if (err)
						res.send(err);
	
					res.json(exercises);
				});
	});

 	app.get('/api/exercises/:exercise_id', isLoggedIn,
 
     // get the exercise with that id (accessed at GET http://localhost:8080/api/exercises/:exercise_id)
     function(req, res) {
         Exercise.findById(req.params.exercise_id, function(err, exercise) {
             if (err)
                 res.send(err);
             res.json(exercise);
         });
     });
      // update the exercise with this id (accessed at PUT http://localhost:8080/api/exercises/:exercise_id)
     app.put('/api/exercises/:exercise_id', isLoggedIn, function(req, res) {
 
         // use our exercise model to find the exercise we want
         Exercise.findById(req.params.exercise_id, function(err, exercise) {
 
             if (err)
                 res.send(err);
 
             exercise.name = req.body.name;  // update the exercises info
 
             // save the exercise
             exercise.save(function(err) {
                 if (err)
                     res.send(err);
 
                 res.json({ message: 'Exercise updated!' });
             });
 
         });
     });
     // delete the exercise with this id (accessed at DELETE http://localhost:8080/api/exercises/:exercise_id)
      app.delete('/api/exercises/:exercise_id', isLoggedIn, function(req, res) {
         Exercise.remove({
             _id: req.params.exercise_id
         }, function(err, exercise) {
             if (err)
                 res.send(err);
 
             res.json({ message: 'Successfully deleted' });
         });
     });
}