const express=require('express');
const app=express();
const port=8000;

//setting up our view engine
app.set('view engine','ejs');
app.set('views','./views');
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