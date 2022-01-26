const mongoose = require("mongoose");


const postSchema =  mongoose.Schema({
    userId: {
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
    tag: {
        type: Array
    }
},{
    timestamps: true,
});

module.exports = mongoose.model("Post", postSchema);