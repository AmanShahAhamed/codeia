const passport=require('passport');
const User=require('../models/user');
const localStrategy=require('passport-local').Strategy;

passport.use(new localStrategy ({
  usernameField:'email',  
 },
   function(email,password,done){
       User.findOne({email:email},function(err,user){
           if(err){console.log('error in finding user in db'); return done(err)}

           if(!user || user.password!=password){
               console.log('email or password is incorrect');
               return done(null,false);
           }
           return done(null,user);
       })
   }
));

passport.serializeUser(function(user,done){
    return done(null,user.id);
});


passport.deserializeUser(function(id,done){
      User.findById(id,function(err,user){
          if(err){
              console.log('Error in finding id in cookie');
              return done(err);
          }
          return done(null,user);
      });
});

//middleware function to check authtification
passport.checkAuthentification=function(req,res,next){

    //isAuthenticated fuctn is used for user sign in or not
    if(req.isAuthenticated()){
        return next();
    }
    return res.redirect('/users/sign-in');
}

passport.setAuthenticatedUser=function(req,res,next){
    if(req.isAuthenticated()){
        //set req user data to res data
        res.locals.user=req.user;
        
    }
    return next();
   
}

module.exports=passport;