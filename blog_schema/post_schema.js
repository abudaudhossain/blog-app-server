const mongoose = require("mongoose");
const { Schema } = mongoose;

const postSchema = new Schema({
    userToken: {
        type: String,
        required: true
    },
    postToken:{
         type: String,
        required: true
    },
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    tags: {
        type: Array
    }
});

module.exports = postSchema;