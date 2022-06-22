const express = require('express');
const account = require('../app/controllers/account');
const accountAuth = require('../app/controllers/accountAuth');
const services = require('../app/controllers/services');
const router = express.Router();

// user validation Middleware
const validUserRequestMiddleware = require("../app/middleware/validUserRequestMiddleware");


router.get("/", (req, res) => {
    res.send("api")
});

router.post('/newAccount', account.createAccount) // create new account
router.post("/numberValidation", account.numberValidation) // number validation
router.post("/login", accountAuth.login); // login validation

router.post("/createPost", validUserRequestMiddleware, services.addNewPost)

module.exports = router;