const { Schema } = require('mongoose');
const mongoose = require('mongoose');

const followupSchema =mongoose.Schema({
    enqid:{
        type:Schema.Types.ObjectId,
        required:true,
        ref:'StudentEnquiry'
    },
    uid:{
        type:Schema.Types.ObjectId,
        required:true,
        ref:'user'
    },
     nextdate:{
        type:String,
        
    },
    status:{
        type:String,
        required:true
    },
    programme:{
        type:String,
        required:true
    },
    remark:{
        type:String
    }
},{
    timestamps:true
})
module.exports= mongoose.model('followup',followupSchema)