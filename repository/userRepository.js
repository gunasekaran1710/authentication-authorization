const newuser=require('../user');
const Post=require('../post');
const savetoken=require('../token');
const jwt=require('jsonwebtoken');
const { viewPost } = require('../controller/userController');
async function signin1(data){
    const newuser2=new newuser(data);
    const newuser1=await newuser2.save();
    console.log(newuser1);
    const token=jwt.sign({id:newuser2.id},'secreat12345');
    console.log('hello');
    console.log('Token saved to database');

    const updatedata={token1:token};
    console.log(updatedata);
    await newuser.updateOne(
      {_id:newuser1._id },
      { $set: { token1:token} }
    );
    console.log('token updated');
    return token;
}
async function login1(data){
  console.log(data)
  const details2=await newuser.find({token1:data.token1});
  if(details2.length>0){
    console.log('login successfully');
    return details2;

  }
  else{
     const hello="token didnot match please give the valued token";
     return hello;
  }
}
async function createPost(data){
  //find the role of the given token
  const rolesArray=await newuser.find({"token1":data.token1},{role:1,_id:0});

   const isManager = rolesArray.some(item => item.role === 'manager');

  if (isManager) {
      const post=new Post(data);
      console.log(post);
      const createdpost=await post.save();
      return createdpost;
  } else {
      const notification="only manager can create the post";
      return notification;
  }

}
async function viewpost(data){
  //check the user already logined
  const user=await newuser.find({"token1":data.token1});
  //if user is exist
  if(user.length>0){
    const post=await Post.find();
    return post;
  }
  else{
    const post="please give valide token";
    return post;
  }

}
async function deletepost(data){
  //find the role of the given token
  const rolesArray=await newuser.find({"token1":data.token1},{role:1,_id:0});
  const isManager = rolesArray.some(item => item.role === 'manager');
  if (isManager){
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