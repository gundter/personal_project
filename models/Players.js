var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var PlayerSchema = new Schema({
    playerName: String,
    playerAttack: Number,
    playerHealth: Number
});

console.log('players loaded');
module.exports = mongoose.model('Player', PlayerSchema);