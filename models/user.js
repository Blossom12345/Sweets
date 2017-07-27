const mongoose = require('mongoose')
const bcrypt= require('bcryptjs')
const Schema = mongoose.Schema;
const config=require('../config')
let userSchema= new Schema({
  firstname: String,
  username: {type: String, unique: true},
  password: String
}) ;
// ^^The table header
//Pre is a method inside of mongoose, that allows us to do something pre, or before something else happens
userSchema.pre('save', function(next){
  
  let user = this
  //genSalt() is a bcrypt method, its a generator to push whatever where ecrypting through
  bcrypt.genSalt(10, function(err,salt){
    if(err){
      return next(err)
    }
    //salt is how man characters our password will be multiplied by and such
    bcrypt.hash(user.password,salt,function(err,hash){
      if(err){
        return next(err)
      }
      user.password = hash
      next()
    })
  })
})
userSchema.methods.comparePassword= function(candidatePassword, callback){
  //this is our hashed and salted password
  bcrypt.compare(candidatePassword, this.password, function(err,isMatch){
    if(err){return callback(err)}
      callback(null,isMatch)
  })
}
let model= mongoose.model('user', userSchema)
module.exports= model