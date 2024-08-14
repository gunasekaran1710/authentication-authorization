const mongoose=require('mongoose');
const tokenSchema=new mongoose.Schema({
    name:String,
    email:String,
    createpassword:String,
    token:String
});
const savetoken=mongoose.model('savetoken',tokenSchema);
module.exports=savetoken;