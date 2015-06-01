var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var MonsterSchema = new Schema({
    monsterName: String,
    monsterAttack: Number,
    monsterHealth: Number,
    monsterExp: Number
});

console.log('monster model loaded');
module.exports = mongoose.model('Monster', MonsterSchema);