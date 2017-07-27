const User = require('../models/user.js')
const JWT = require('jwt-simple');
const config= require('../config')

function createUserToken(user){
        //this attatches the webtoken to the user id
        //line 15 grabs the time at the moment when the user logs on
        let timeStamp = new Date().getTime()
        //iat is just setting the time stamp
        return JWT.encode({sub: user.id, iat: timeStamp}, config.secret)
    }



exports.signup= function(req,res){
    console.log(req.body)
    var firstname= req.body.user.firstname
    var username= req.body.user.username;
    var password= req.body.user.password
    
    if(!username || !password){
        return res.status(418).send({error: "You need to put a username and password"})
    }
    //Helps us find one, method in mongoose
    User.findOne({username: username}, function(err, existingUser){
        if(err){
            return next(err)
        }
        if(existingUser){
            return res.status(418).send('Username already in use')
        }
        let user = new User({
            firstname: firstname,
            username: username,
            password: password
        })
        user.save(function(err){
            if(err){
                return next(err)
            }
            res.json({token: createUserToken(user), User: user._id})
        })
    })
}
exports.signin= function(req,res,next){
    //User has already had their email and pw auth
    //we just need to give them a token
    
    res.json({token:createUserToken(req.user), User: req.user._id})
    
}