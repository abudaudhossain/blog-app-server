const mongoose = require("mongoose");


const postSchema =  mongoose.Schema({
    userToken: {
        type: String,
        required: true
    },
    token:{
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
},{
    timestamps: true,
});

module.exports = mongoose.model("Post", postSchema);