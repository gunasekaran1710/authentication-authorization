const newuser=require('../user');
const savetoken=require('../token');
const jwt=require('jsonwebtoken');
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
module.exports={signin1,login1};