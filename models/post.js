const mongoose=require('mongoose');
const postSchema=new mongoose.Schema({
    post:[String],
    createdDate:{type:Date,default:Date.now}
});
const Post=mongoose.model('Post',postSchema);
module.exports=Post;
