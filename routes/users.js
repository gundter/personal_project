var express = require('express');
var router = express.Router();
var Users = require('../models/Users');
var Player = require('../models/Players');
var passport = require('passport');

router.get('/', function(req, res, next){
    Users.find(function(err, users){
        if (err) return next(err);
        res.json(users);
    });
});

router.get('/getPlayers', function(req, res, next){
    Users.findById(req.user._id, "characters", function(err, data){
        console.log(data);
        res.send(data);
    })
});

router.post('/add', function(req, res, next){
   Users.findByIdAndUpdate(req.user._id, {$push: {'characters': req.body}}, function(err, model){
       if (err){
           console.log(err);
           return res.send(err);
       }
       return res.json(model);
   });
});

router.delete('/:id', function(req, res, next){
    Users.findByIdAndUpdate(req.user._id, {$pull: {'characters': {_id: req.params.id}}}, function(err, model){
    if(err){
        console.log(err);
        return res.send(err);
    }
    return res.json(model);
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