const express = require('express');
const assignModel = require('../Models/assignModel');
const assignRouter = express.Router();

assignRouter.post('/', async (req, res) => {
    try {
        await assignModel.create(req.body)
        return res.json({ "msg": "Success" })
    } catch (err) {
        console.log(err);
        return res.json({ "msg": "Error" });
    }
});

assignRouter.get('/', async (req, res) => {
    try {
        const assign = await assignModel.find();
        return res.json({ "msg": "Success", assign })
    } catch (err) {
        console.log(err);
        return res.json({ "msg": "Error" });
    }
});

module.exports = assignRouter;