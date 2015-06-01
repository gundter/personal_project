var express = require('express');
var router = express.Router();
var Items = require('../models/Items');

router.get('/', function (req, res, next){
    Items.find(function(err, monsters){
        if(err) next(err);
        res.json(monsters);
    });
});

router.post('/', function(req, res, next){
    Items.create(req.body, function(err, post){
        if (err) next(err);
        res.json(post);
    });
});

console.log('Items loaded');
module.exports = router;