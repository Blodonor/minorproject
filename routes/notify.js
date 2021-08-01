const express = require('express')
const router = express.Router()
const mongoose=require('mongoose')
const requireLogin = require('../middleware/requirelogin')
const Notification = mongoose.model('Notification')

router.post('/createnote',(req,res)=>{
    const {title,body}=req.body
   // console.log(req.body)
    if(!title || !body){
        return res.status(422).json({error:"please fill all the fields"})
    }
    // res.send("ok")
    const notes = new Notification({
        title,
        body
    })
    notes.save()
    .then(result=>{
        res.json({post:result})
    })
    .catch(err=>{
        console.log(err)
    })
})
router.get('/notifications',(req,res)=>{
    Notification.find()
    .sort('-createdAt')
    .then(Notes=>{
        res.json({Notes:Notes})
    })
    .catch(err=>{
        res.json(err)
    })
})
module.exports =  router