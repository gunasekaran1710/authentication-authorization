const controller=require('../controller/userController');
const express=require('express');
const router=express.Router();
router.post('/signin',controller.signin);
router.get('/login',controller.login);
router.post('/create',controller.createPost);
router.get('/viewpost',controller.viewPost);
router.delete('/deletePost',controller.deletePost);
module.exports=router;
