const { Mongoose }=require("mongoose")

const mongoose=require('mongoose')
const NoteSchema = new mongoose.Schema({
    title:{
        required:true,
        type:String
    },
    body:{
        required:true,
        type:String
    },
},{timestamps:true})
mongoose.model('Notification',NoteSchema)