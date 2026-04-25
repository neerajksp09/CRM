const express = require("express");
const followupModel = require("../Models/followupModel");
const followupRouter = express.Router();

followupRouter.get('/', async (req, res) => {
    try {
        const followup = await followupModel.find().populate('enqid').populate('uid');
        return res.json({ "msg": "Success", followup });
    } catch (err) {
        console.log(err);
        return res.json({ "msg": "Error" });
    }
});

followupRouter.post('/', async (req, res) => {
    try {
        await followupModel.create(req.body);
        return res.json({ 'msg': "Success" });
    } catch (err) {
        console.log(err);
        return res.json({ "msg": "Error" });
    }
});

module.exports = followupRouter;