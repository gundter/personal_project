var express = require('express');
var router = express.Router();
var Users = require('../models/Users');

router.post('/', function(req, res, next){
    Users.create(req.body, function(err, post){
        if(err) next(err);
        res.json(post);
    })
});

console.log('registration loaded');
module.exports = router;