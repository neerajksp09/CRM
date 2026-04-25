const express = require('express');
const adminRoute = express.Router();
const adminModel = require('../Models/adminModels');
const userModel = require('../Models/userModel')
const stEenqModel = require('../Models/stEnqModels')
const centerModel = require('../Models/CenterModel')
const followupModel = require('../Models/followupModel')

adminRoute.post('/log', async (req, res) => {
    try {
        const { username, password } = req.body;

        const admin = await adminModel.findOne({ username })
        if (admin) {
            if (admin.password == password) {
                return res.json({ msg: "Success", role: "admin", id: admin._id })
            } else {
                return res.json({ "msg": "Password Not Match" })
            }
        } else {
            const user = await userModel.findOne({ 'email': username });
            if (user) {
                if (user.password == password) {
                    if (user.status !== "u") {
                        return res.json({ "msg": "Your Account is Blocked" })
                    }
                    return res.json({ msg: "Success", role: user.role, id: user._id })
                } else {
                    return res.json({ "msg": "password Not match" })
                }
            } else {
                return res.json({ "msg": "User Not Found" })
            }
        }
    } catch (err) {
        console.log(err);
        return res.json({ "msg": "Error" });
    }
});

adminRoute.get('/stats', async (req, res) => {
    try {
        const enq = await stEenqModel.find();
        const admin = await adminModel.find()
        const user = await userModel.find();
        const center = await centerModel.find();
        const followup = await followupModel.find().populate('enqid').populate('uid')
        return res.json({
            "msg": "Success",
            "allenq": enq,
            "user": user.length,
            "center": center,
            "admin": admin[0]?.name,
            "followup": followup
        })
    } catch (err) {
        console.log(err);
        return res.json({ "msg": "Error" });
    }
});

module.exports = adminRoute;