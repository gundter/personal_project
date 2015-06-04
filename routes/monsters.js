var express = require('express');
var router = express.Router();
var Monsters = require('../models/Monsters');

router.get('/', function (req, res, next){
    Monsters.find(function(err, monsters){
        if(err) next(err);
        res.json(monsters);
    });
});

router.post('/', function(req, res, next){
    Monsters.create(req.body, function(err, post){
        if (err) next(err);
        res.json(post);
    });
});

router.get('/:id', function(req, res, next){
    Monsters.findOne({_id:req.params.id}, function(err, model){
        if(err){
            console.log(err);
            return res.send(err);
        }
        return res.json(model);
    });
});

console.log('Monsters loaded');
module.exports = router;