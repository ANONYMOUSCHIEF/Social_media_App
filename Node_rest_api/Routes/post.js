const router=require('express').Router();
const Post=require("../Models/Post");
const User =require("../Models/User");


// create post
router.post('/',async(req,res)=>{
    const newPost = new Post(req.body);
    try {
        const savePost= await newPost.save();
        res.status(200).json(savePost);
    } catch (error) {
        res.status(500).json(error);
    }
});

// update a post
router.put('/:id',async(req,res)=>{
    try {
        const post=await Post.findById(req.params.id);
        if(post.userid==req.body.userid){
            try {
               await  post.updateOne({ $set: req.body });
                res.status(200).json('updated successfully');
            } catch (error) {
                res.status(500).json(error);
            }
        }
        else{
            res.status(403).json("You can update your post only");
        }
    } catch (error) {
        res.status(500).json(error);
    }
});

// delete a post

router.delete('/:id',async(req,res)=>{
    try {
        const post=await Post.findById(req.params.id);
        if(post.userid==req.body.userid){
            try {
               await  post.deleteOne();
                res.status(200).json('deleted successfully');
            } catch (error) {
                res.status(500).json(error);
            }
        }
        else{
            res.status(403).json("You can delete your post only");
        }
    } catch (error) {
        res.status(500).json(error);
    }
});

// like dislike

router.put("/:id/like",async(req,res)=>{
    try {
        const post= await Post.findById(req.params.id);
        // !post && res.status(403).json("post not found");
        if(post.likes.includes(req.body.userid)){
           await post.updateOne({$pull:{likes:req.body.userid}})
            res.status(200).json("DisLiked the post");
        }
        else{
           await post.updateOne({$push:{likes:req.body.userid}})
            res.status(200).json("Liked the post");
        }
    } catch (error) {
        res.status(500).json(error);
    }
});

// get a post
router.get("/:id",async(req,res)=>{
    try {
        const post=await Post.findById(req.params.id);
        res.status(200).json(post);
    } catch (error) {
        res.status(500).json(error);
    }
});

// get myposts all post
router.get("/myposts/:userid",async(req,res)=>{
    try {
        const posts= await Post.find({userid:req.params.userid});
        res.status(200).json(posts);
    } catch (error) {
        res.status(500).json(error);
    }
})

// get timeline all post

router.get("/timeline/:userid",async(req,res)=>{
    try {
    const user= await User.findById(req.params.userid);
    const currentUserPost=await Post.find({userid:user._id});
    const friendPost=await Promise.all(
        user.followers.map((friendId)=>{
            return Post.find({userid:friendId});
        })
    );
    res.status(200).json(currentUserPost.concat(...friendPost));
    } catch (error) {
        res.status(500).json(error);
    }
    
})

module.exports=router;