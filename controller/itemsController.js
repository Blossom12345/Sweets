const Item = require('../models/items.js')

exports.createItem= function(req,res){
    console.log(req.body)
    var name= req.body.name
    var price= req.body.price;
    var pic= req.body.pic

    let item = new Item({
            name: name,
            price: price,
            pic: pic
        })
    item.save(function(err){
        if(err){
            return next(err)
        }
        res.send("Success!")
    })
}

