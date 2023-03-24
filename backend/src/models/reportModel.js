const mongoose = require("mongoose")

const reportSchema = new mongoose.Schema({
    "state": {
        type: String,
        required: true
    },
    "district": {
        type: String,
        required: true
    },
    "subDistrict": {
        type: String,
        required: true
    },
    "block": {
        type: String,
        required: true
    },
    "FPO": {
        type: String,
        required: true
    },
    "shareHolders": {
        type: String,
        required: true
    },
    "percentageWomenFarmers": {
        type: Number,
        required: true
    }
})

module.exports = mongoose.model("report",reportSchema)