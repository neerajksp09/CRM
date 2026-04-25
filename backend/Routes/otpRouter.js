const express = require('express')
const otpRouter = express.Router()
const nodemailer = require('nodemailer')
const userModel = require('../Models/userModel')

const tp = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: "neerajkashyap1915@gmail.com",
        pass: "qtdj whzh ndtn ulzh"
    }
})

otpRouter.post('/send_otp', async (req, res) => {
    try {
        const { email } = req.body
        const user = await userModel.findOne({ email })
        if (!user) {
            return res.json({
                "msg": "User not found"
            })
        }
        const otp = Math.floor(100000 + Math.random() * 900000).toString();
        user.otp = otp;
        user.otpExpire = Date.now() + (5 * 60 * 1000)
        user.otpVarified = false
        await user.save()
        await tp.sendMail({
            from: "neerajkashyap1915@gmail.com",
            to: email,
            subject: "Otp Varification",
            text: `Your Otp is ${otp}`
        })
        return res.json({ "msg": "Success" })
    } catch (err) {
        console.log(err);
        return res.json({ "msg": "Error" });
    }
})

otpRouter.post('/varify_otp', async (req, res) => {
    try {
        const { email, otp } = req.body
        const user = await userModel.findOne({ email });
        if (!user) {
            return res.json({ "msg": "user Not Found" })
        }
        if (user.otp != otp) {
            return res.json({ "msg": "OTP Not Match" })
        }
        if (user.otpExpire < Date.now()) {
            return res.json({ "msg": "Otp Expired" })
        }
        user.otpVarified = true;
        await user.save();
        return res.json({ "msg": "Success" })
    } catch (error) {
        console.log(error);
        return res.json({ "msg": "OTP is Not Send", "error": error })
    }
})

otpRouter.post('/create_pass', async (req, res) => {
    try {
        const { email, conpass } = req.body;
        const user = await userModel.findOne({ email })
        if (!user.otpVarified) {
            return res.json({ "msg": "Not Varified" })
        }
        user.password = conpass;
        await user.save();
        return res.json({ "msg": "Success" })
    } catch (err) {
        console.log(err);
        return res.json({ "msg": "Error" });
    }
})

module.exports = otpRouter