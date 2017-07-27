const passport =require('passport');
const User= require('../models/user')
const config= require('../config');
const jwtStrategy= require('passport-jwt').Strategy
const ExtractJwt = require('passport-jwt').ExtractJwt
var LocalStrategy= require('passport-local')

var localLogin = new LocalStrategy(function(username, password,done){
    User.findOne({username:username}, function(err,user){
        if(err){return done(err);}
        //user not found down below
        if(!user){return done(null,false)}
            //compare password - is 'password' equal to user.password
            //compare pw from req with users saved pw
        user.comparePassword(password,function(err,isMatch){
            //if there was an error, return early
            if(err){return done(err)}
            //if its not the same, it will return false and say they didnt match up
            //if same, it will call passport callback with user model
            return done(null,user)
        });
        //tricky part-> we salted the password, and we need to somehow decode encrypted pw to normal pw
    })
    //otherwise, call done with false
})
// use two LocalStrategies, registered under user and company names

var jwtOptions= {
    //we are extracting the token the user id has and then going to compare it
    jwtFromRequest: ExtractJwt.fromHeader('authorization'),
    secretOrKey: config.secret
}

//payload parameter is the decoded jwt token
var jwtLogin = new jwtStrategy(jwtOptions, function(payload,done){
    User.findById(payload.sub, function(err,user){
        if(err){
            return done(err, false);
        }
        if(user){
            done(null,user);
        }
        else{
            done(null,false)
        }
    })
})
passport.use(localLogin);
passport.use(jwtLogin);
