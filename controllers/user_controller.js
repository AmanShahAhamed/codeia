module.exports.profile=function(req,res){
    res.end('<h1>User Profile is Here..</h1>');
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