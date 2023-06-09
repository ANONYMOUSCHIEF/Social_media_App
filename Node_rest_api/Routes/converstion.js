const router=require('express').Router();
const Conversation=require("../Models/Converstion");

router.post('/',async(req,res)=>{
    const newConversation = new Conversation({
        members: [req.body.senderId, req.body.receiverId],
      });
    
    try {
        const saveConversion= await newConversation.save();
        res.status(200).json(saveConversion);
        
    } catch (error) {
        res.status(500).json(error);
    }

})

router.get('/:id',async(req,res)=>{
    const id = req.params.id;
    
    try {
        const saveConversion= await Conversation.find({members:{$in:[id]}});
        res.status(200).json(saveConversion);
        
    } catch (error) {
        res.status(500).json(error);
    }

})

module.exports=router;