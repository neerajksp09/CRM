const express = require('express')
const app =express()

app.use(express.json())

app.get('/',(req,res)=>{
    res.json({
        msg:"Success"
    })
})
app.post('/',(req,res)=>{
    res.json({
        msg:"Success"
    })
})



app.listen('5000')