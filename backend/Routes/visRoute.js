const express = require('express');
const visitorModel = require('../Models/visitorModel');
const visRouter = express.Router();

visRouter.get('/', async (req, res) => {
    try {
        const data = await visitorModel.find();
        res.json({ msg: "Success", data: data });
    } catch (err) {
        console.log(err);
        res.json({ msg: "Error" });
    }
});

visRouter.post('/', async (req, res) => {
    try {
        await visitorModel.create(req.body);
        return res.json({ "msg": "Success" });
    } catch (err) {
        console.log(err);
        return res.json({ "msg": "Error" });
    }
});

visRouter.delete('/:id', async (req, res) => {
    try {
        const id = req.params.id;
        await visitorModel.findByIdAndDelete(id);
        return res.json({ "msg": "Success" });
    } catch (err) {
        console.log(err);
        return res.json({ "msg": "Error" });
    }
});

visRouter.put('/:id', async (req, res) => {
    try {
        const id = req.params.id;
        await visitorModel.findByIdAndUpdate(id, req.body);
        return res.json({ "msg": "Success" });
    } catch (err) {
        console.log(err);
        return res.json({ "msg": "Error" });
    }
});

module.exports = visRouter;