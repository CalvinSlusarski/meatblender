// app/models/workout.js

var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;

var workoutSchema   = new Schema({
    name: String,
    owner: String,
    comments: String,
    date: { type: Date, default: Date.now },
    exercises: [{
        name: String,
        comments: String,
        series: [{
            weight: String,
            unit: String,
            sets: Number,
            reps: Number
        }]
    }]

});

module.exports = mongoose.model('workout', workoutSchema);
