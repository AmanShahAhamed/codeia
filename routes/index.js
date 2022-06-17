const express=require('express');
const router=express.Router();
console.log('router is loaded');
const homeController=require('../controllers/home_controller')

router.get('/',homeController.home);
router.use('/users',require('./users'));



//exporting module for main index.js so that 
//all routes is dealed by this file
module.exports=router;