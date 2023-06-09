const router=require('express').Router();
const User=require("../Models/User");
const bcrypt=require('bcrypt');
router.put("/:id",async(req,res)=>{
    if(req.body.userid==req.params.id || req.body.isAdmin){
        if(req.body.password){
           try {
            const salt= await bcrypt.genSalt(10);
            req.body.password=await bcrypt.hash(req.body.password,salt);
           } catch (error) {
            res.status(500).json(error)
           } 
        }
        try {
            const user= await User.findByIdAndUpdate(req.params.id,
                {$set:req.body});
            res.status(200).json("User updated Succesfully");
        } catch (error) {
            res.status(500).json(error);
        }
    }
    else{
        res.status(403).json("Bad request");
    }
})

router.delete("/:id",async(req,res)=>{
    if(req.body.userid==req.params.id || req.body.isAdmin){
        try {
            await User.findByIdAndDelete(req.params.id);
            res.status(200).json("Deleted successfully");
            
        } catch (error) {
            res.status(500).json(error);
        }
    }
    else{
        res.status(403).json("bad request");
    }
})

router.get("/:id",async(req,res)=>{
    try {
        const user = await User.findById(req.params.id);
        !user && res.status(200).json("User Not exist");
        res.status(200).send(user);
    } catch (error) {
        res.status(500).json(error);
    }
});

router.put('/:id/follow',async(req,res)=>{
    if(req.body.userid!==req.params.id){
       try {
        const toFollow=await User.findById(req.params.id);
        const user=await User.findById(req.body.userid);
        if( toFollow.followers.includes(req.body.userid)){
            res.status(403).json("Already follow this user");
        }
        else{
           await toFollow.updateOne({$push:{followers:req.body.userid}});
           await user.updateOne({$push:{following:req.params.id}});
           res.status(200).json("User has been followed")
        }
        
       } catch (error) {
        res.status(500).json(error);
       } 
    }
    else{
        res.status(403).json("You cannot follow yourself")
    }
});

router.put('/:id/unfollow',async(req,res)=>{
    if(req.body.userid!==req.params.id){
       try {
        const followed= await User.findById(req.params.id);
        const user= await User.findById(req.body.userid);
        if( followed.followers.includes(req.body.userid)){
            await followed.updateOne({$pull:{followers:req.body.userid}});
            await user.updateOne({$pull:{following:req.params.id}});
           res.status(200).json("User has been unfollowed")
            
        }
        else{
            res.status(403).json(" you  don't follow the user");
        }
        
       } catch (error) {
        res.status(500).json(error);
       } 
    }
    else{
        res.status(403).json("You cannot follow yourself")
    }
});

// get all user
router.get('/',async(req,res)=>{
    try {
        const allUsers= await User.find({});
        const limitedUsers = allUsers.map(user => ({
            _id: user._id,
            username: user.username,
            email: user.email,
            profilepic: user.profilepic,
            coverpic: user.coverpic
          }));
        res.status(200).json(limitedUsers);
    } catch (error) {
        res.status(500).json(error);
    }
})




module.exports=router;