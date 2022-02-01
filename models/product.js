const mongoose = require("mongoose");

const field = {
    token: {
        type: String,
        required: true,
    },
    name:{
        type: String,
        required: true
    },
    price:{
        type: String,
        required: true,
    },
    category:{
        type: String,
        required: true
    }
}

const productSchema = mongoose.Schema(field,{timestamps: true,});
module.exports = mongoose.model("Product", productSchema);