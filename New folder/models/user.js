const { Mongoose } = require("mongoose")

const mongoose=require('mongoose')
const userSchema = new mongoose.Schema({
    clgId:{
        required:true,
        type:String
    },
    name:{
        required:true,
        type:String
    },
    email:{
        required:true,
        type:String
    },
    password:{
        required:true,
        type:String
    }
})
mongoose.model('User',userSchema)