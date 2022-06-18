const mongoose=require('mongoose');

mongoose.connect('mongodb://localhost/codeial_db');

const db=mongoose.connection;

db.on('error',console.error.bind(console,'Something went wrong..'));

db.once('open',function(){
console.log('Sucessfully connect with Database');
});