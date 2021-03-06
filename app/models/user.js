const mongoose = require("mongoose");

const field ={
    "token":{
        type:"string",
        required:true,
    },
    "name": {
        type: String,
        required: true
    },
    "email": {
        type: String,
        required: true
    },
    "password":{
        type: String,
        required: true
    }
} 

const userSchema = mongoose.Schema(field,{timestamps: true}) 

module.exports = mongoose.model("User", userSchema);