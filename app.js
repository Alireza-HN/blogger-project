//node_modules
const cookieParser = require('cookie-parser');
const session = require('express-session');
const mongoose = require('mongoose');
const express = require('express');
const path = require('path');

const app = express();


//routers
const apiRouter = require('./routes/api.js');



//connect to Mongoose Data-Base
mongoose.connect('mongodb://localhost:27017/blogger', 
{
  //handle mongoose collection.ensureIndex warn
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: true,
  useCreateIndex: true
});


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

//set root folder to 'public'
app.use(express.static(path.join(__dirname, 'public')));

app.use(express.json());  // parse application/json
app.use(express.json({type: 'application/vnd.api+json'}));  // parse application/vnd.api+json as json
app.use(express.urlencoded({ extended: true }));  // parse application/x-www-form-urlencoded



app.use('/', apiRouter);





app.listen(3000, 
    console.log("\n**************************************************\n\n<--- Server started listening on Port 3000 --->\n\n**************************************************\n")
);