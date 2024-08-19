const newuser=require('../models/user');
const Post=require('../models/post');
const jwt=require('jsonwebtoken');
const secretkey="secret@12345";
async function signin1(data){
  //find the gmail id already exist
    const email=await newuser.find({"email":data.email},{email:1,_id:0});
    console.log(email);
    //if email already exist
    if(email.length>0){
        const information="your already signin with this email ";
        return information;
    }
    else{
        const newuser2=new newuser(data);
        const newuser1=await newuser2.save();
        const token=jwt.sign({id:newuser2.id,role:newuser2.role},secretkey);
        const information="signin successfully";
        return [information,token];
      }
}
async function login1(data){
  const decoded = jwt.verify(data.token,secretkey);
  const details2=await newuser.find({_id:decoded.id});
  if(details2.length>0){
    const information="login successfully";
    return [information,details2];

  }
  else{
     const hello="token didnot match please give the valued token";
     return hello;
  }
}
async function createPost(data){
  //find the role of the given token
  const decoded = jwt.verify(data.token,secretkey);
  const userRole=decoded.role;
  const manager="manager";
  if (userRole===manager) {
      const post=new Post(data);
      const createdpost=await post.save();
      const notification="your  post is created successfully";
      return [notification,createdpost];
  } else {
      const notification="only manager can create the post";
      return notification;
  }

}
async function viewpost(data){
  //check the user already logined
  const decoded = jwt.verify(data.token,secretkey);
  const details=await newuser.find({_id:decoded.id});
  //if user is exist
  if(details.length>0){
    const post=await Post.find();
    return post;
  }
}
async function deletepost(data){
  //find the role of the given token
  const decoded = jwt.verify(data.token,secretkey);
  const userRole=decoded.role;
  const manager="manager";
  if (userRole===manager) {
    try {
      const result = await Post.findByIdAndDelete(data.postid);
      if (result) {
          const notification='Document deleted successfully';
          return notification;
      } else {
          const notification='No document found with the given ID.';
          return notification;
      }
  } catch (err) {
      const notification='Error deleting document:';
      return notification;
  }

  }
  else{
    const notification="manager can only delete this file";
    return notification;
  }

}

module.exports={signin1,login1,createPost,viewpost,deletepost};