const express = require('express');
const centerRoute = express.Router();
const centerModel = require("../Models/CenterModel");
const userModel = require('../Models/userModel');
const stEnqModels = require('../Models/stEnqModels');

centerRoute.get('/', async (req, res) => {
    try {
        const center = await centerModel.find();
        return res.json({ "msg": "Success", "center": center })
    } catch (err) {
        console.log(err);
        return res.json({ "msg": "Error" });
    }
});

centerRoute.post('/', async (req, res) => {
    try {
        await centerModel.create(req.body)
        return res.json({ "msg": "Success" })
    } catch (err) {
        console.log(err);
        return res.json({ "msg": "Error" });
    }
});

centerRoute.get('/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const center = await centerModel.findById(id);
        return res.json({ "msg": "Success", "center": center })
    } catch (err) {
        console.log(err);
        return res.json({ "msg": "Error" });
    }
});

centerRoute.put('/:id', async (req, res) => {
    try {
        const id = req.params.id;
        await centerModel.findByIdAndUpdate(id, req.body);
        return res.json({ "msg": "Success" });
    } catch (err) {
        console.log(err);
        return res.json({ "msg": "Error" });
    }
});

centerRoute.put('/:id/:st', async (req, res) => {
    try {
        const { id, st } = req.params;
        let status = st == "Active" ? "Deactive" : "Active"
        let ust = st == "Active" ? "b" : "u";
        let est = st == "Active" ? "b" : "u";
        const center = await centerModel.findByIdAndUpdate(id, { status });
        console.log(status)
        await userModel.updateMany({ center: center.name }, { $set: { status: ust } })
        await stEnqModels.updateMany({ center: center.name }, { $set: { status: est } })
        return res.json({ "msg": "Success" });
    } catch (err) {
        console.log(err);
        return res.json({ "msg": "Error" });
    }
});

centerRoute.delete('/:id', async (req, res) => {
    try {
        const id = req.params.id;
        await centerModel.findByIdAndDelete(id);
        return res.json({ "msg": "Success" });
    } catch (err) {
        console.log(err);
        return res.json({ "msg": "Error" });
    }
});

module.exports = centerRoute;