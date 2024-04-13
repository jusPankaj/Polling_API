const mongoose = require("mongoose")

const optionSchema = new mongoose.Schema({

    text: {
        type: String,
        required: true
    },
    // question: {
        // type: mongoose.Schema.Types.ObjectId,
        // required: true
    // },
    vote: {
        type: Number,
        default:0
    },
    linkToVote: {
        type: String
    }
})

const Option = mongoose.model("Option", optionSchema);
module.exports = Option