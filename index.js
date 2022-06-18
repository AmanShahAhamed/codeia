
const express=require('express');
const app=express();
const port=8000;
const cookie=require('cookie-parser');
const cookieParser = require('cookie-parser');
//importing database
const db=require('./config/mongoose');


//setting up our view engine
app.set('view engine','ejs');
app.set('views','./views');

//for parsing post request
app.use(express.urlencoded());

//for using cookie
app.use(cookieParser());

//for using static folder
app.use(express.static('assest'))

//importing router
app.use('/',require('./routes/index'));

app.listen(port,function(err){
     if(err){
         console.log(`Error to start server : ${err}`);
         return;
     }
     console.log(`Server is successfully started at port ${port}`);
});