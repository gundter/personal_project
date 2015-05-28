var express = require('express');
var router = express.Router();
var Users = require('../models/Users');
var passport = require('passport');

router.get('/', function(req, res, next){
    Users.find(function(err, users){
        if (err) return next(err);
        res.json(users);
    });
});

router.post('/', passport.authenticate('local'), function(req, res, next){
    Users.create(req.body, function (err, post){
        if(err)
            return next(err);
        res.json(post);
    });
});

console.log("users loaded");
module.exports = router;