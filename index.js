
const express=require('express');
const app=express();
const port=8000;
const cookie=require('cookie-parser');
const cookieParser = require('cookie-parser');
//importing database
const db=require('./config/mongoose');

//creating session for user sign in
const session=require('express-session');
const passport=require('passport');
const passportLocal=require('./config/passport-local-strategy');
const MoongoStore=require('connect-mongo');


//setting up our view engine
app.set('view engine','ejs');
app.set('views','./views');

//for parsing post request
app.use(express.urlencoded({
    extended:true
}));

//for using cookie
app.use(cookieParser());

//for using static folder
app.use(express.static('assest'))

//creating the functionality of session for user
//storing session cookie in mongoose db
app.use(session({
   name:'codeial',
   secret:'blahsomething',
   saveUninitialized:false,
   resave:false,
   cookie:{
       maxAge :1000*60*100,
     },
     store:new MoongoStore({
        mongoUrl:'mongodb://localhost/codeial_db',     
        autoRemove:'disable'
     },function(err){
         if(err){
             console.log('There is error in storing session cookies in moongo db');
         }
     }
     
     )
}));

//telling express to use passport for auth
app.use(passport.initialize());
//telling passport to use above session which is build
app.use(passport.session());

//importing router
app.use('/',require('./routes/index'));

app.listen(port,function(err){
     if(err){
         console.log(`Error to start server : ${err}`);
         return;
     }
     console.log(`Server is successfully started at port ${port}`);
});