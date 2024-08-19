const repository=require('../repository/userRepository');
async function signin(req,res){
    try{
        const details=await repository.signin1(req.body);
        console.log(details);
        res.status(201).json(details);
    }
    catch(err){
        res.status(400).json('error');
    }

}
async function login(req,res){
    try{
        const details1=await repository.login1(req.body);
        res.status(201).json(details1);

    }
    catch(err){
        res.status(400).json('error');
    }
}
async function createPost(req,res){
    try{
        const Post=await repository.createPost(req.body);
        res.status(201).json(Post);

    }
    catch(err){
        res.status(400).json('you are not eligeble to create a post,please contect who can create a post');
    }
}
async function viewPost(req,res){
    try{
        const Post=await repository.viewpost(req.body);
        res.status(201).json(Post);

    }
    catch(err){
        res.status(400).json('please give the correct signin user token');
    }
}
async function deletePost(req,res){
    try{
        const Post=await repository.deletepost(req.body);
        res.status(201).json(Post);

    }
    catch(err){
        res.status(400).json('error');
    }


}

module.exports={signin,login,createPost,viewPost,deletePost};