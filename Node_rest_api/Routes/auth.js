const router=require('express').Router();
const User=require("../Models/User");
const bcrypt=require('bcrypt');

router.post("/register",async(req,res)=>{
    try {
        const salt= await bcrypt.genSalt(10);
        const hashPassword= await bcrypt.hash(req.body.password,salt);

        const newUser = new User({
            username:req.body.username,
            email:req.body.email,
            password:hashPassword
        })

        const user= await newUser.save();
        res.status(200).send(user);

    } catch (error) {
        res.status(500).json(error);
    }
})

router.post('/login',async(req,res)=>{
    try {
        const user= await User.findOne({email:req.body.email});
        if(!user) {
            return res.status(404).send("User Not found");
        }

        const valid=await bcrypt.compare(req.body.password,user.password);
        if(!valid) {
            return res.status(404).send("Wrong password");
        }
        
        res.status(200).send(user);

    } catch (error) {
        res.status(500).json(error);
    }
})

module.exports=router;
