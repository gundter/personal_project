var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session = require('express-session');
var passport = require('passport');
var localStrategy = require('passport-local').Strategy;
var Users = require('./models/Users');
var routes = require('./routes/index');
var users = require('./routes/users');
var registration = require('./routes/registration');
var players = require('./routes/players');
var monsters = require('./routes/monsters');
var items = require('./routes/items');

var app = express();

// Mongo setup
var mongoose = require('mongoose');

var mongoURI = "mongodb://localhost:27017/Dungeon";
var MongoDB = mongoose.connect(mongoURI).connection;
MongoDB.on('error', function (err) {
    console.log('mongodb connection error', err);
});

MongoDB.once('open', function () {
    console.log('mongodb connection open');
});


// uncomment after placing your favicon in /public
//app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(function(req, res, next){
    if (!req.isAuthenticated())
        return next();
    else
        express.static(path.join(__dirname, 'private'));
});

app.use(session({
    secret: 'secret',
    key: 'user',
    resave: true,
    saveUninitialized: false,
    cookie: {maxAge: 240000, secure: false}
}));

app.use(passport.initialize());
app.use(passport.session());

passport.serializeUser(function(user, done){
    done(null, user.id);
});

passport.deserializeUser(function(id, done){
    Users.findById(id, function(err, user){
        if (err) done(err);
        done (null, user);
    });
});

passport.use('local', new localStrategy({
    passReqToCallback: true,
    usernameField: 'username'
},
function(req, username, password, done){
    Users.findOne({ username: username }, function(err, user){
        if (err) throw err;
        if(!user)
            return done(null, false);
        user.comparePassword(password, function(err, isMatch){
            if(err) throw err;
            if(isMatch) return done(null, user);
            else done(null, false);
        })
    });
}));

app.use('/', routes);
app.use('/users', users);
app.use('/registration', registration);
app.use('/players', players);
app.use('/monsters', monsters);
app.use('/items', items);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
});


module.exports = app;
