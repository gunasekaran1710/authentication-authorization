const controller=require('../controller/userController');
const express=require('express');
const router=express.Router();
router.post('/signin',controller.signin);
router.get('/login',controller.login);
module.exports=router;
