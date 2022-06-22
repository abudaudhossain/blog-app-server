const mongoose = require("mongoose");


const postSchema =  mongoose.Schema({
    userToken: {
        type: String
    },
    token:{
         type: String
    },
    title: {
        type: String
    },
    description: {
        type: String
    },
    category: {
        type: String
    },
    tags: {
        type: Array
    }
},{
    timestamps: true,
});

module.exports = mongoose.model("Post", postSchema);