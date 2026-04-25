const mongoose = require('mongoose');

const visitorSchema = mongoose.Schema({
    fullName:{
        type: String,
        required: true
    },
    contactNumber: {
        type: String,
        required: true
    },
    email: {
        type: String
    },
    purpose:{
        type: String
    },
    remarks:{
        type: String
    },
    address: {
        type: String
    },
    visitorType: {
        type: String,
        enum: ["visitorOff", "visitorPer"]
    }

}, {
    timestamps: true
});

module.exports = mongoose.model("VisitorModel", visitorSchema);