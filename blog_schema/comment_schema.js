const mongoose = require("mongoose");

const commentSchema = {
    userId: {
        type: String,
        required: true
    },
    postId: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    }
}

module.exports = commentSchema;