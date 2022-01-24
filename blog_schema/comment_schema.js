const mongoose = require("mongoose");

const commentSchema = {
    userId: {
        type: String,
        required: true
    },  
    commentToken: {
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
}

module.exports = commentSchema;