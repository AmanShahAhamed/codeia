
const User=require('../models/user');

module.exports.profile=function(req,res){
    return res.render('profile',{
        tittle:'user_profile',
        user:req.user
    });
}

module.exports.posts=function(req,res){
    res.end('<h1>User Post show here ...</h1>');
}

//sign-in module
module.exports.signIn=function(req,res){
    if(req.isAuthenticated()){
        return res.redirect('/users/profile');
    }
    return res.render('sign-in',{
         tittle:"Codeial|sign-in"
    });
}

//sign-up-module
module.exports.signUp=function(req,res){
   
    if(req.isAuthenticated()){
        return res.redirect('/users/profile');
    }

    return res.render('sign-up',{
         tittle:"Codeial|sign-up"
    });
}

//create user
module.exports.create=function(req,res){
    if(req.body.password!=req.body.confirm_password){
        return res.redirect('back');
    }
    User.findOne({email:req.body.emial},function(err,user){
      if(err){ console.log('There is something wrong in finding this email'); return; }
      if(!user){
          User.create(req.body,function(err,user){
             if(err){console.log('There is something wrong in creating user'); return;}
             return res.redirect('/users/sign-in');
          });
      }else{
          return res.redirect('back');
      }
    })
}

//create user sign in session
module.exports.createSession=function(req,res){
   return res.redirect('/users/profile')
}

//for destroying session
module.exports.destroySession=function(req,res,next){
    req.logout(function(err){
        if(err){
            return next(err);
        }
        res.redirect('/users/sign-in');
    });
   
}