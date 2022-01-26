const express = require('express');
const router = express.Router();
const getToken = require("../modules/getToken");


// models
const Post = require('../models/post');
const Comment = require("../models/comment");


router.get('/', (req, res) => {
    res.send("<h2>Hollo Blogs App Server..</h2>")
})

//add database post api
router.post("/post/newPost", async (req, res) => {
    try {
        let token = getToken("PT");
        let userToken = req.body.userId;
        let title = req.body.title;
        let description = req.body.description;
        let tags = req.body.tags;
        let proceed = true;
        // @validation part
        // => validation 1: required are not empty

        if (userToken === undefined || title === undefined || description === undefined || tags === undefined) {
            proceed = false;
            res.send({
                type: "error",
                msg: "Required Fields Should Not Be Empty"
            })
        } else if (userToken.length === 0 || title.length === 0 || description.length === 0 || tags.length === 0) {
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
                title: title,
                description: description,
                tags: tags
            });

            await newPost.save((err) => {
                if (err) {
                    res.send({
                        type: 'error',
                        msg: 'some thing is wrong'
                    })
                } else {
                    res.send({
                        type: 'success',
                        msg: 'A New Post Has Been Added'
                    })
                }
            });

        }
    }
    catch (error) {
        console.log(error);
    }

})



//add database comment api
router.post("/post/newComment", async (req, res) => {
    try {
        const token = getToken("CT");
        const userToken = req.body.userId;
        const postToken = req.body.postToken;
        const description = req.body.description;
        const proceed = true;
        // @validation part
        // => validation 1: required are not empty
        if (userToken === undefined || postToken === undefined || description === undefined) {
            proceed = false;
            res.send({
                type: "error",
                msg: "Required Fields Should Not Be Empty"
            })
        } else if (userToken.length === 0 || description.length === 0 || postToken.length === 0) {
            proceed = false;
            res.send({
                type: "error",
                msg: "Required Fields Should Not Be Empty"
            })
        }
        // => validation 2: check user in our database

        // => validation 2: check postToken in our database

        // @business logic
        if (proceed) {
            const newComment = new Comment({
                token: token,
                userToken: userToken,
                postToken: postToken,
                description: description,
            });

            await newComment.save((err) => {
                if (err) {
                    res.send({
                        type: 'error',
                        msg: 'some thing is wrong'
                    })
                } else {
                    res.send({
                        type: 'success',
                        msg: 'A New Comment Has Been added'
                    })
                }
            });
        } else {
            res.send({
                type: "error",
                msg: "some thing is wrong"
            })
        }
    }
    catch (error) {
        console.log(error);
    }

})



module.exports = router;