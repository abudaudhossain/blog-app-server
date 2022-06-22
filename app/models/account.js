const mongoose = require("mongoose");

const field = {
    "token": {
        type: String,
    },
    "name": {
        type: String,
    },

    "email": {
        type: String,
    },
    "phone": {
        type: String,
    },
    "password": {
        type: String
    },
    "image": {
        type: String
    },

    "city": {
        type: String
    },
    "country": {
        type: String,
    }
}

const accountSchema = mongoose.Schema(field, { timestamps: true })

module.exports = mongoose.model("appAccount", accountSchema);