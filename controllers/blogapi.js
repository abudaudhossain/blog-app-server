const express = require('express');
const router = express.Router();
const getToken = require("../modules/getToken");


// models
const Post = require('../models/post');


router.get('/', (req, res) => {
    res.send("<h2>Hollo Blogs App Server..</h2>")
})

//add database post api
router.post("/post/newPost", async (req, res) => {
    console.log(req.body);
    try {
        const token = getToken("PT");
        const userToken = req.body.userId;
        const postToken = req.body.postToken;
        const title = req.body.title;
        const description = req.body.description;
        const tags = req.body.tags;
        const proceed = true;
        // @validation part
        // => validation 1: required are not empty
        if (userToken.length === 0 || title.length === 0 || description.length === 0 || tags.length === 0) {
            proceed = false;
            res.send({
                type: "error",
                msg: "Required Fields Should Not Be Empty"
            })
        }
        // => validation 2: check user in our database

        // @business logic
        if (proceed) {
            const newPost = new Post({
                token: token,
                userToken: userToken,
                postToken: postToken,
                title: title,
                description: description,
                tags: tags
            });
            
            await newPost.save();
            res.send({
                type: 'success',
                msg: 'A New User Has Been Registered'
            })
        }
    }
    catch (error) {
        console.log(error);
    }

})

module.exports = router;