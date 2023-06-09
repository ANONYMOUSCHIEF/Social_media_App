const router=require('express').Router();
const Message=require('../Models/Message')

router.post('/',async(req,res)=>{
    const newChat= new Message(req.body)
    try {
        const saveChat = await newChat.save();
        res.status(200).json(saveChat);
    } catch (error) {
        res.status(500).json(error);
    }
})

router.get('/:id',async(req,res)=>{
    try {
        const fetchChat= await Message.find({conversionId:req.params.id})
        res.status(200).json(fetchChat);
    } catch (error) {
        res.status(500).json(error)
    }
})

module.exports=router;