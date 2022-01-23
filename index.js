const express = require("express");
const mongoose = require('mongoose');
require('dotenv').config();
const cors = require('cors');

//create model
const postSchema = require('./blog_schema/post_schema');
const commentSchema = require('./blog_schema/comment_schema');
// const commentSchema = require("./blog_schema/comment_schema");
const Post = new mongoose.model("Post", postSchema);
const Comment = new mongoose.model("Comment", commentSchema);


//initialize express app 
const app = express();
const port = process.env.PORT || 3000;

app.use(express.json())

//database connection with mongoose
const url = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.bqqvk.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;


mongoose.connect(url, { useNewUrlParser: true })
    .then(() => console.log("successful"))
    .catch((err) => console.log(err))


app.get("/", (req, res) => {
    res.send("Blog..")
})

//add database post api
app.post("/post/newPost", async (req, res) => {
    console.log("com: ", req.body)
    const newPost = new Post(req.body);
    await newPost.save((err) => {
        if (err) {
            res.status(404).json({
                error: "there was a server error"
            })
        } else {
            res.status(200).json({
                message: "post was inserted successful"
            })
        }
    })
})

//get all post api
app.get("/posts", async (req, res) => {
    const result = await Post.find({});
    res.send(result)
})

//get post api by id
app.get("/post/:id", async (req, res) => {
    const id = req.params.id;
    const result = await Post.findOne({ _id: id });
    res.send(result)
})

// get post api by post api
app.get("/posts/:userId", async (req, res) => {
    const userId = req.params.userId;
    const result = await Post.find({ userId: userId });
    res.send(result);
})

//add to database comment post api
app.post("/comment/newComment", async (req, res) => {
    const newComment = new Comment(req.body);
    await newComment.save((err) => {
        if (err) {
            res.status(404).json({
                error: "there was a server error"
            })
        } else {
            res.status(200).json({
                message: "Comment was inserted successful"
            })
        }
    })
})

app.get("/post/comment/:postId", async (req, res) => {
    const postId = req.params.postId;
    const result = await Comment.find({ postId: postId });
    res.send(result);
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})

