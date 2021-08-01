const express = require('express')
const router = express.Router()
const mongoose=require('mongoose')
const requireAdmin = require('../middleware/requireadmin')
const requireLogin = require('../middleware/requirelogin')
const Post = mongoose.model('Post')
router.get('/adminposts',requireLogin,(req,res)=>{
    Post.find()
    .populate("postedBy","_id name clgId")
    .sort('-createdAt')
    .then(Posts=>{
        res.json({Posts})
    })
    .catch(err=>{
        res.json(err)
    })
})
router.put('/like',requireAdmin,(req,res)=>{
    //console.log(req.body.postId)
    Post.findByIdAndUpdate(req.body.postId,{
        $push:{likes:req.user._id}
    },{
        new:true
    }).exec((err,result)=>{
        if(err){
            return res.status(422).json({error:err})
        }
        else{
            res.json(result)
        }
    })
})
router.post('/createpost',requireLogin,(req,res)=>{
    const {title,body,pic}=req.body
   // console.log(req.user)
    if(!title || !body || !pic){
        return res.status(422).json({error:"please fill all the fields"})
    }
    const post = new Post({
        title,
        photo:pic,
        body,
        time:new Date().getTime(),
        postedBy:req.user
    })
    post.save()
    .then(result=>{
        res.json({post:result})
    })
    .catch(err=>{
        console.log(err)
    })
})

router.get('/mypost',requireLogin,(req,res)=>{
    Post.find({postedBy:req.user._id})
    .populate("postedBy","_id name")
    .sort("-createdAt")
   // console.log(postedBy)
    .then(mypost=>{
        res.json({mypost})
    })
    .catch(err=>{
        console.log(err)
    })
})

router.put('/unlike',requireLogin,(req,res)=>{
    Post.findByIdAndUpdate(req.body.postId,{
        $pull:{likes:req.user._id}
    },{
        new:true
    }).exec((err,result)=>{
        if(err){
            return res.status(422).json({error:err})
        }
        else{
            res.json(result)
        }
    })
})
router.delete('/deletepost/:postId',requireAdmin,(req,res)=>{
    Post.findOne({_id:req.params.postId})
    .populate("postedBy","_id")
    .exec((err,post)=>{
        if(err || !post){
            return res.status(422).json({error:err})
        }
            post.remove()
            .then(result=>{
                res.json(result)
            })
            .catch(err=>{
                console.log(err)
            })
    }
    )
})
module.exports = router