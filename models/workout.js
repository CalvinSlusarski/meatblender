// app/models/workout.js

var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;

var workoutSchema   = new Schema({
    name: String,
    comments: String,
    date: { type: Date, default: Date.now },
    exercise: [{
         name: String, 
         comments: String 
    }]
});

module.exports = mongoose.model('workout', workoutSchema);