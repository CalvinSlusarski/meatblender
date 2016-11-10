
var Workout    = require('../models/workout');  
module.exports = function(app, isLoggedIn) {
    // =====================================
	// API ==============================
	// =====================================
	// on routes that end in /workouts
 	// ----------------------------------------------------
    app.get('/api/workouts', isLoggedIn,

        // get all workouts (accessed at POST http://localhost:8080/api/workouts)
        function(req, res) {
            Workout.find(function(err, workouts) {
                if (err)
                    res.send(err);

                res.json(workouts);
            });


        });
    app.post('/api/workouts', isLoggedIn,
        // create a workout (accessed at POST http://localhost:8080/api/workouts)
        function(req, res) {
            var workout = new Workout(req.body);      // create a new instance of the Workout model
            //workout.name = req.body.name;  // set the workouts name (comes from the request)
            //workout = req.body;
            // save the workout and check for errors
            workout.save(function(err) {
                if (err)
                    res.send(err);

                res.json({ message: 'Workout created!' });
            });
        });
	app.put('/api/workouts', isLoggedIn, function(req, res) {
				Exercise.find(function(err, workouts) {
					if (err)
						res.send(err);
	
					res.json(workouts);
				});
	});

 	app.get('/api/workouts/:workout_id', isLoggedIn,
 
     // get the workout with that id (accessed at GET http://localhost:8080/api/workouts/:workout_id)
     function(req, res) {
         Exercise.findById(req.params.workout_id, function(err, workout) {
             if (err)
                 res.send(err);
             res.json(workout);
         });
     });
      // update the workout with this id (accessed at PUT http://localhost:8080/api/workouts/:workout_id)
     app.put('/api/workouts/:workout_id', isLoggedIn, function(req, res) {
 
         // use our workout model to find the workout we want
         Exercise.findById(req.params.workout_id, function(err, workout) {
 
             if (err)
                 res.send(err);
 
             workout.name = req.body.name;  // update the workouts info
 
             // save the workout
             workout.save(function(err) {
                 if (err)
                     res.send(err);
 
                 res.json({ message: 'Workoutupdated!' });
             });
 
         });
     });
     // delete the workout with this id (accessed at DELETE http://localhost:8080/api/workouts/:workout_id)
      app.delete('/api/workouts/:workout_id', isLoggedIn, function(req, res) {
         Exercise.remove({
             _id: req.params.workout_id
         }, function(err, workout) {
             if (err)
                 res.send(err);
 
             res.json({ message: 'Successfully deleted' });
         });
     });
}