var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var bcrypt = require('bcrypt');
var SALT_WORK_FACTOR = 12;
var PlayerSchema = require('../models/Players').model('Player').schema;


var UserSchema = new Schema({
    firstName: String,
    lastName: String,
    username: {type: String, required: true, index: {unique: true}},
    password: {type: String, required: true},
    characters: [PlayerSchema]
});

UserSchema.pre('save', function(next){
    var user = this;
    if(!user.isModified('password')) return next();
    bcrypt.genSalt(SALT_WORK_FACTOR, function(err, salt){
        if(err) return next(err);
        bcrypt.hash(user.password, salt, function(err, hash){
            if (err) return next(err);

            user.password = hash;
            next();
        });
    });
});

UserSchema.methods.comparePassword = function(candidatePassword, cb){
    bcrypt.compare(candidatePassword, this.password, function(err, isMatch){
        if(err) return cb(err);
        cb(null, isMatch);
    });
};

console.log('user model loaded');
module.exports = mongoose.model('Users', UserSchema);