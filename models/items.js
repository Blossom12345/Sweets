const mongoose = require('mongoose')
const Schema = mongoose.Schema;
let itemSchema= new Schema({
  name: String,
  price: Number,
  pic: String
  
}) ;
let model= mongoose.model('item', itemSchema)
module.exports= model