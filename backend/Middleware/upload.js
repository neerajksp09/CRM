const multer = require('multer')
const store = multer.diskStorage({
    destination:(req,file,cb)=>{
        cb(null,"/upload")
    },

    filename:(req,file,cb)=>{
        cb(null,Date.now()+"-"+file.originalname)
    }
})

const upload= multer({ store})
module.exports=upload