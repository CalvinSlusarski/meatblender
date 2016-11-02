// app/models/exercise.js

var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;

var exerciseSchema   = new Schema({
    name: String
});

module.exports = mongoose.model('exercise', exerciseSchema);