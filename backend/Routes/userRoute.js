const express = require("express");
const userModel = require('../Models/userModel');
const stEnqModels = require("../Models/stEnqModels");
const upload = require('../Middleware/upload')
const userRoute = express.Router();

userRoute.get('/', async (req, res) => {
    try {
        const user = await userModel.find();
        return res.json({ "msg": "Success", user: user });
    } catch (err) {
        console.log(err);
        return res.json({ "msg": "Error" });
    }
});

userRoute.get('/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const user = await userModel.findById(id);
        return res.json({ "msg": "Success", user: user });
    } catch (err) {
        console.log(err);
        return res.json({ "msg": "Error" });
    }
});

userRoute.post('/', async (req, res) => {
    try {
        await userModel.create(req.body);
        return res.json({ 'msg': 'Success' });
    } catch (err) {
        console.log(err);
        return res.json({ "msg": "Error" });
    }
});

userRoute.patch('/:id', upload.single('profilePic'), async (req, res) => {
    try {
        const id = req.params.id;
        await userModel.findByIdAndUpdate(id, { 'profilePic': req.file.filename });
        return res.json({ 'msg': 'Success' });
    } catch (err) {
        console.log(err);
        return res.json({ "msg": "Error" });
    }
});

userRoute.put('/:id', async (req, res) => {
    try {
        const id = req.params.id;
        await userModel.findByIdAndUpdate(id, req.body);
        return res.json({ "msg": "Success" });
    } catch (err) {
        console.log(err);
        return res.json({ "msg": "Error" });
    }
});

userRoute.put('/:id/:st', async (req, res) => {
    try {
        const { id, st } = req.params;
        const status = st == "u" ? "b" : "u";
        const user = await userModel.findByIdAndUpdate(id, { status });
        if (st == "u") {
            await stEnqModels.updateMany({ assignto: user._id }, { $set: { assignto: null } });
        }
        return res.json({ "msg": "Success" });
    } catch (err) {
        console.log(err);
        return res.json({ "msg": "Error" });
    }
});

userRoute.delete('/:id', async (req, res) => {
    try {
        const id = req.params.id;
        await userModel.findByIdAndDelete(id);
        return res.json({ "msg": "Success" });
    } catch (err) {
        console.log(err);
        return res.json({ "msg": "Error" });
    }
});

module.exports = userRoute;