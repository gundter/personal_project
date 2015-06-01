var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ItemSchema = new Schema({
    name: String,
    cost: Number,
    ammoReceived: Number,
    ammoRequired: Number,
    gold: Number,
    itemAttack: Number,
    itemType: String,
    action: String
});

console.log('item model loaded');
module.exports = mongoose.model('Item', ItemSchema);