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

router.post('/newAccount', account.createAccount) // create new account public routes
router.post("/numberValidation", account.numberValidation) // number validation public routes
router.post("/login", accountAuth.login); // login validation public routes

router.post("/createPost", validUserRequestMiddleware, services.addNewPost); // protected
router.post("/updatePost", validUserRequestMiddleware, services.updatePost); // protected
router.post("/deletePost", validUserRequestMiddleware, services.deletePost); // protected

router.get("/myPost", validUserRequestMiddleware, services.myPost); // protected
router.get("/post/:token", validUserRequestMiddleware, services.post); // protected
router.get("/allPost", services.allPost); //public routes
router.get("/category/:categoryName", services.getPostByCategory); // public routes

module.exports = router;