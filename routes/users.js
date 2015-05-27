var express = require('express');
var router = express.Router();
var Users = require('../models/Users');

router.get('/', function(req, res, next){
    Users.find(function(err, users){
        if (err) return next(err);
        res.json(users);
    });
});

console.log("users loaded");
module.exports = router;