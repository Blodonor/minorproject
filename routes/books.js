const express = require('express')
const router = express.Router()
const mongoose=require('mongoose')
const requireLogin = require('../middleware/requirelogin')
const AllBooks = mongoose.model('Allbooks')

router.post('/bookpost',requireLogin,(req,res)=>{
    const {title,body,pic}=req.body
   // console.log(req.body)
    if(!title || !body ||!pic){
        return res.status(422).json({error:"please fill all the fields"})
    }
    // res.send("ok")
    const post = new AllBooks({
        title,
        photo:pic,
        body
    })
    post.save()
    .then(result=>{
        res.json({post:result})
    })
    .catch(err=>{
        console.log(err)
    })
})
router.get('/allposts',(req,res)=>{
    AllBooks.find()
    .populate("postedBy","_id name")
    .then(Posts=>{
        res.json({Posts:Posts})
    })
    .catch(err=>{
        res.json(err)
    })
})
module.exports =  router