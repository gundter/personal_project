var express = require('express');
var router = express.Router();
var Items = require('../models/Items');

router.get('/', function (req, res, next){
    Items.find(function(err, monsters){
        if(err) next(err);
        res.json(monsters);
    });
});

router.get('/:id', function(req, res, next){
    Items.findOne({_id:req.params.id}, function(err, model){
        if(err){
            console.log(err);
            return res.send(err);
        }
        return res.json(model);
    });
});

router.post('/', function(req, res, next){
    Items.create(req.body, function(err, post){
        if (err) next(err);
        res.json(post);
    });
});

router.put('/:id', function(req, res, next){
    Items.findByIdAndUpdate(req.params.id, req.body, function(err, post){
        if(err) next(err);
        res.json(post);
    })
});

console.log('Items loaded');
module.exports = router;