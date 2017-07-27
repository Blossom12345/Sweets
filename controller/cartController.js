const Cart = require('../models/cart.js')

exports.createItem= function(req,res){
    console.log(req.body)
    var item= req.body.items
    var totalCost= req.body.totalCost;
    var qtys= req.body.qtys
    var owner = req.user.id
    var index = req.body.items
    console.log(owner)

    let cart = new Cart({
            items: item,
            totalCost: totalCost,
            qtys: qtys,
            owner: owner
        })
    cart.save(function(err){
        console.log("saving cart!")
        if(err){
            return next(err)
        }
        res.send("Success!")
    })
}

exports.addItem=function(req, res){
    Cart.findOne({owner: req.user.id}, function(err, theCart){
       if(err){
        console.log("ERROR")
        res.send("YOU MESSED UP")
       }
       theCart.items.push(req.body.itemId)
       theCart.qtys.push(1)
       theCart.save(function(err){
            if(err){
                res.send("There was an error")
            }
                res.send("You have added to the cart")
       })
    })
}
function indexOf(array, object){
    for(var i in array){
        if(array[i] == object){
            return i
        }
    }
    return -1
}
exports.itemRemove=function(req, res){

    Cart.findOne({owner: req.user.id}, function(err, theCart){
       if(err){
        res.send("bro this doesnt exist")
       }
      if(theCart){
        var index = indexOf(theCart, req.body.itemId)
        theCart.items.splice(index, 1)
        theCart.qtys.splice(index, 1)
        theCart.save(function(err){
            if(err){
                res.send("There was an error")
            }
                res.send("Successfffullll removing")
        })
      }
   })
}
      



    
    


