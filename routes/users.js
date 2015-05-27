var express = require('express');
var router = express.Router();
var Users = require('../models/Users');

router.get('/', function(req, res, next){
    Users.find(function(err, users){
        if (err) return next(err);
        res.json(users);
    });
});

router.post('/', function(req, res, next){
    Users.create(req.body, function (err, post){
        if(err)
            return next(err);
        res.json(post);
    });
});

console.log("users loaded");
module.exports = router;