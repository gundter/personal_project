var express = require('express');
var router = express.Router();
var path = require('path');
var passport = require('passport');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.sendFile(path.resolve(__dirname, '../views/index.html'));
});

router.post('/',
    passport.authenticate('local'), function( req, res, next){
        console.log(req.user);
        res.send(req.user);
    });


console.log('index loaded');
module.exports = router;
