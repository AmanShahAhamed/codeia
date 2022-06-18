
const User=require('../models/user');

module.exports.profile=function(req,res){
    
    if(req.cookies.user_id){
        User.findById(req.cookies.user_id,function(err,user){
            if(err){console.log('There is problem in finding cookies user_id'); return}
            if(user){
                return res.render('profile',{
                    tittle:'user_profile',
                    user:user
                })
            }else{
                return res.redirect('/users/sign-in');
            }
        });
    }else{
        return res.redirect('/users/sign-in');
    }
}

module.exports.posts=function(req,res){
    res.end('<h1>User Post show here ...</h1>');
}

//sign-in module
module.exports.signIn=function(req,res){
    return res.render('sign-in',{
         tittle:"Codeial|sign-in"
    });
}

//sign-up-module
module.exports.signUp=function(req,res){
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
    
    User.findOne({email:req.body.email},function(err,user){
      
        if(err){console.log('Error in Finding email..'); return}
        if(user){
            if(user.password!=req.body.password){
                console.log('Something wrong with password please look at it..');
                return res.redirect('back');
            }
            res.cookie('user_id',user.id);
            return res.redirect('/users/profile');

        }else{
            console.log('Something wrong with email please look at it..');
            return res.redirect('back');
        }

    });
}