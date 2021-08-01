const { Mongoose }=require("mongoose")

const mongoose=require('mongoose')
const AdminSchema = new mongoose.Schema({
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
    },
    clgId:{  
        required:true,
        type:String
        
    }
})
mongoose.model('Admin',AdminSchema)