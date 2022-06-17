const express=require('express');
const app=express();
const port=8000;

//importing router
app.use('/',require('./routes/index'));

app.listen(port,function(err){
     if(err){
         console.log(`Error to start server : ${err}`);
         return;
     }
     console.log(`Server is successfully started at port ${port}`);
});