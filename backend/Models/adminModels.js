const mongoose = require('mongoose');
const adminSchema = mongoose.Schema({
    username:{
        type:String,
        required:true
    },
     password:{
        type:String,
        required:true
    },
    name:{
        type:String,
        default:"Neeraj Kashyap"
    }
},{
    timestamps:true
}) 
module.exports=mongoose.model("admin",adminSchema)