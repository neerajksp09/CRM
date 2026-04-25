const express = require('express');
const stEnqModels = require('../Models/stEnqModels');
const stEnqRouter = express.Router();

stEnqRouter.get('/', async (req, res) => {
    try {
        const enq = await stEnqModels.find().populate('assignto');
        return res.json({ "msg": "Success", "enq": enq });
    } catch (err) {
        console.log(err);
        return res.json({ "msg": "Error" });
    }
});

stEnqRouter.post('/', async (req, res) => {
    try {
        const user = req.body;
        await stEnqModels.create(req.body);
        return res.json({ "msg": "Success" });
    } catch (err) {
        console.log(err);
        return res.json({ "msg": "Error" });
    }
});

stEnqRouter.get('/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const user = await stEnqModels.findById(id);
        return res.json({ "msg": "Get St Enq by id", "user": user });
    } catch (err) {
        console.log(err);
        return res.json({ "msg": "Error" });
    }
});

stEnqRouter.put('/:id', async (req, res) => {
    try {
        const id = req.params.id;
        await stEnqModels.findByIdAndUpdate(id, req.body, { new: true });
        return res.json({ msg: "Success" });
    } catch (err) {
        console.log(err);
        return res.json({ "msg": "Error" });
    }
});

stEnqRouter.delete('/:id', async (req, res) => {
    try {
        const id = req.params.id;
        await stEnqModels.findByIdAndDelete(id);
        return res.json({ "msg": "Success" });
    } catch (err) {
        console.log(err);
        return res.json({ "msg": "Error" });
    }
});

module.exports = stEnqRouter;