const express= require('express');
const app = express();
const http= require('http')
const bodyParser= require('body-parser')
var cors = require('cors')
//bodyParser I want you to make sure everything is in json, the type converts all data in this sytem to json
const router= require('./router');
const mongoose= require('mongoose')
mongoose.connect('mongodb://localhost:27017/test-mongo')
app.use(cors())
app.use(bodyParser.json({type: '*/*'}))
router(app)
const port= process.env.PORT || 3000;
const server = http.createServer(app)
server.listen(port);
console.log('Server is listening on ' + port )