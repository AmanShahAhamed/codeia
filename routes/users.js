const express=require('express');
const router=express.Router();
const userController=require('../controllers/user_controller');
const passport=require('passport');

router.get('/profile',passport.checkAuthentification, userController.profile);
router.get('/posts',userController.posts);

//signin and signup
router.get('/sign-in',userController.signIn);
router.get('/sign-up',userController.signUp);
//for user creation
router.post('/create',userController.create);
//for user sign in
router.post('/create-session',passport.authenticate(
    'local',
    {failureRedirect:'/users/sign-in'}
),userController.createSession);


module.exports=router;