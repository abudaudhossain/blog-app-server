const mongoose = require("mongoose");

const commentSchema = mongoose.Schema({
    userToken: {
        type: String,
        required: true
    },
    token: {
        type: String,
        required: true
    },

    postToken: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    }
},{
    timestamps: true,
})

module.exports = mongoose.model("Comment", commentSchema);
