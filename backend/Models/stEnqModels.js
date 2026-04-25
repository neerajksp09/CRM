const mongoose = require('mongoose');
const  stEnqSchema = new mongoose.Schema(
    {
    fullName:{
        type:String,
        
    },
    collage:{
        type:String,
        
    },
    course:{
        type:String,
       
    },
    branch:{
        type:String,
     
    },
    year:{
        type:String,
       
    },
    contactNumber:{
        type:String,
     
    },
    email:{
        type:String,
        
        unique:true
        
    },
    purpose:{
        type:String,
        
    },
    role:{
        type:String
    },
    center:{
        type:String
    },
    status:{
        type:String,
        default:"new"
    },
    assignto:{
        type:String,
        ref:"user"
    },assignby:{
        type:String,
        ref:"user"
    },
    assigndate:{
        type:String,

    },
    nextfollowupdate:{
        type:String
    },
    forprogram:{
        type:String
    },
    source:{
        type:String,
        default:"walk-in" //telephonic website option ka hai enquiry  me
    },
    remark:{
        type:String
    }
 },{timestamps:true

})
module.exports= mongoose.model('StudentEnquiry',stEnqSchema)