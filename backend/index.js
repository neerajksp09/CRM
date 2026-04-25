const express = require('express');
const mongoose = require('mongoose')
const cors = require('cors');
const stEnqRouter = require('./Routes/stEnqRouter');
const centerRoute = require('./Routes/centerRoute');
const userRoute = require('./Routes/userRoute');
const adminRoute = require('./Routes/adminRoute');
const visRouter = require('./Routes/visRoute');
const assignRouter = require('./Routes/assignRouter');
const followupRouter = require('./Routes/followupRouter');
const otpRouter = require('./Routes/otpRouter');
require('dotenv').config();


// const visRoute = require('./Routes/visRoute')
const app = express();
const port = process.env.PORT || 5000;
const MONGOURL=process.env.MONGOURL
mongoose.connect(MONGOURL)
.then(()=>{
    console.log("DB connect success")
})
.catch((e)=>{
    console.log(`Error: ${e}`)
})

//middleware
app.use(express.json())
app.use(cors());


app.use('/upload',express.static('upload'))
app.use("/api/enq", stEnqRouter)
app.use("/api/center",centerRoute)
app.use("/api/user",userRoute)
app.use("/admin",adminRoute)
app.use("/api/vis",visRouter)
app.use("/api/assignmodel",assignRouter)
app.use("/api/followup",followupRouter)
app.use("/api/otp",otpRouter)
app.listen(port,()=>console.log(`server running on server ${port}`))