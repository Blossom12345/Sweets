const Auth= require('./controller/auth');
const passportService= require('./services/passport')
const passport= require('passport')
const requireSignin= passport.authenticate('local', {session: false})
const requireAuth= passport.authenticate('jwt', {session: false})
const Item= require('./controller/itemsController');
const Cart= require('./controller/cartController');
module.exports= function(app){
    app.post('/signup', Auth.signup)
    app.post('/signin', requireSignin, Auth.signin)
    app.post('/items', Item.createItem)
    app.post('/cart' , requireAuth, Cart.createItem)
    app.post('/addItemToCart', requireAuth, Cart.addItem)
    app.delete('/removeFromCart', requireAuth, Cart.itemRemove)



    
};