// app/routes.js
var Bear     = require('../models/bear');  
module.exports = function(app, passport) {

	// =====================================
	// HOME PAGE (with login links) ========
	// =====================================
	app.get('/', function(req, res) {
		res.render('index.ejs'); // load the index.ejs file
	});

	// =====================================
	// LOGIN ===============================
	// =====================================
	// show the login form
	app.get('/login', function(req, res) {

		// render the page and pass in any flash data if it exists
		res.render('login.ejs', { message: req.flash('loginMessage') });
	});

	// process the login form
	app.post('/login', passport.authenticate('local-login', {
		successRedirect : '/profile', // redirect to the secure profile section
		failureRedirect : '/login', // redirect back to the signup page if there is an error
		failureFlash : true // allow flash messages
	}));

	// =====================================
	// SIGNUP ==============================
	// =====================================
	// show the signup form
	app.get('/signup', function(req, res) {

		// render the page and pass in any flash data if it exists
		res.render('signup.ejs', { message: req.flash('signupMessage') });
	});

	// process the signup form
	app.post('/signup', isLoggedIn, passport.authenticate('local-signup', {
		successRedirect : '/profile', // redirect to the secure profile section
		failureRedirect : '/signup', // redirect back to the signup page if there is an error
		failureFlash : true // allow flash messages
	}));

	// =====================================
	// PROFILE SECTION =========================
	// =====================================
	// we will want this protected so you have to be logged in to visit
	// we will use route middleware to verify this (the isLoggedIn function)
	app.get('/profile', isLoggedIn, function(req, res) {
		res.render('profile.ejs', {
			user : req.user // get the user out of session and pass to template
		});
	});

	// =====================================
	// FACEBOOK ROUTES =====================
	// =====================================
	// route for facebook authentication and login
	app.get('/auth/facebook', passport.authenticate('facebook', { scope : 'email' }));

	// handle the callback after facebook has authenticated the user
	app.get('/auth/facebook/callback',
		passport.authenticate('facebook', {
			successRedirect : '/profile',
			failureRedirect : '/'
		}));

	// =====================================
	// LOGOUT ==============================
	// =====================================
	app.get('/logout', function(req, res) {
		req.logout();
		res.redirect('/');
	});

	// =====================================
	// API ==============================
	// =====================================
	// on routes that end in /bears
 	// ----------------------------------------------------
 	app.get('/api/bears', isLoggedIn,
 
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
 
 
 // REGISTER OUR ROUTES -------------------------------
 // all of our routes will be prefixed with /api
 //app.use('/api', router);
};

// route middleware to make sure
function isLoggedIn(req, res, next) {
	console.log('#######');
	// if user is authenticated in the session, carry on
	if (req.isAuthenticated())
		return next();

	// if they aren't redirect them to the home page
	res.redirect('/');
}
