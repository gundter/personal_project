var express = require('express');
var router = express.Router();
var Players = require('./routes/players');

router.get('/', function(req, res, next){
    Players.find(function(err, players){
        if (err) return next(err);
        res.json(players);
    });
});

router.post('/', function(req, res, next){
    Players.create(req.body, function(err, post){
        if (err) return next(err);
        res.json(post);
    })
})