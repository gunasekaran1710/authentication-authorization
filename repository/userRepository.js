const newuser=require('../models/user');
const Post=require('../models/post');
const jwt=require('jsonwebtoken');
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
        const token=jwt.sign({id:newuser2.id},'secreat12345');
        const updatedata={token1:token};
        console.log(updatedata);
        await newuser.updateOne(
        {_id:newuser1._id },
        { $set: { token1:token} }
         );
        return token;
      }
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