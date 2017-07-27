const mongoose = require('mongoose')
const Schema = mongoose.Schema;
let cartSchema= new Schema({
  items: [String],
  totalCost: Number,
  qtys: [Number],
  owner: String

});
 
let model= mongoose.model('cart', cartSchema)
module.exports= model