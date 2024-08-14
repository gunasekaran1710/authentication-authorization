const mongoose=require('mongoose');
const newuserSchema=new mongoose.Schema({
    name:String,
    email:String,
    createpassword:String,
    token1:String
});

const newuser=mongoose.model('newuser',newuserSchema);
module.exports=newuser;