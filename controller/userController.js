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
module.exports={signin,login};