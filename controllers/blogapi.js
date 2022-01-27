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
        console.log(tags.length)
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
                msg: "Required Fields Should Not Be Empty1"
            })
        }


        // => validation 2: check user in our database

        // @business logic
        if (proceed) {
            console.log(tags)
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


//get all post api
router.get("/posts", async (req, res) => {
    try {
        const result = await Post.find({});
        if (result) {
            res.send({
                type: "success",
                data: result,
                message: "call success full"
            })
        } else {
            res.send({
                type: "error",
                message: "something wrong please try again"
            })
        }
    } catch (error) {
        res.send({
            type: "error",
            message: "something thing is wrong"
        })
    }
})


//get post with out some tag
router.get("/posts/someTag", async (req, res) => {
    try {
        const query = { tag: { $nin: ["c++", "java"] } };
        const result = await Post.find(query);
        if (result) {
            res.send({
                type: "success",
                data: result,
                message: "call success full"
            })
        } else {
            res.send({
                type: "error",
                message: "please send valid information "
            })
        }
    } catch (error) {
        res.send({
            type: "error",
            message: "something thing is wrong"
        })
    }

})


//get post api by id
router.get("/post/:id", async (req, res) => {
    try {
        const postToken = req.params.id;
        // @validation part
        // check user id validation in our data base
        if (postToken === undefined) {
            res.send({
                type: "error",
                msg: "Required Fields Should Not Be Empty"
            })
        }

        const result = await Post.findOne({ token: postToken });
        if (result) {
            res.send({
                type: "success",
                data: result,
                message: "call success full"
            })
        } else {
            res.send({
                type: "error",
                message: "please send valid post id "
            })
        }

    } catch (error) {
        res.send({
            type: "error",
            message: "something thing is wrong"
        })
    }

})

// get post api by user id
router.get("/posts/user/:userId", async (req, res) => {
    try {
        const userId = req.params.userId;
        // @validated 
        //check user id in in our database
        if (userId === undefined) {
            res.send({
                type: "error",
                msg: "Required Fields Should Not Be Empty"
            })
        }

        const result = await Post.find({ userToken: userId });

        if (result.length < 1) {
            res.send({
                type: "error",
                message: "please send valid post id "
            })
        } else {

            res.send({
                type: "success",
                data: result,
                message: "call success full"
            })
        }


    } catch (error) {
        res.send({
            type: "error",
            message: "something thing is wrong"
        })
    }

})
// get comment api by post id
router.get("/post/comment/:postId", async (req, res) => {
    try {
        const userId = req.params.postId;
        console.log("hit")
        // @validated 
        //check user id in in our database
        if (userId === undefined) {
            res.send({
                type: "error",
                msg: "Required Fields Should Not Be Empty"
            })
        }

        const result = await Comment.find({ postId: postId });

        if (result.length < 1) {
            res.send({
                type: "error",
                message: "please send valid post id "
            })
        } else {

            res.send({
                type: "success",
                data: result,
                message: "call success full"
            })
        }


    } catch (error) {
        res.send({
            type: "error",
            message: "something thing is wrong"
        })
    }

})




module.exports = router;