const express = require("express");
const app = express();
const mongoose = require('mongoose');
require('dotenv').config();
const cors = require('cors');

const port = process.env.PORT || 3000;

app.use(express.json({limit: "500mb"}));
app.use(express.urlencoded({extended: true, limit: '5mb'}))







//database connection with mongoose

const dbURL = "mongodb://localhost:27017/blog";


mongoose.connect(dbURL, { 
    useNewUrlParser: true ,
    useUnifiedTopology: true
})

const db = mongoose.connection;
db.on("error", (error) =>console.log(error));
db.once('open', () => console.log("Mong DB connect success"));


app.use("/blog", require('./controllers/blogapi'))

app.listen(port, () => {
    console.log(`listening on port ${port}`)
})
















/*
app.get("/", (req, res) => {
    res.send("Blog..")
})



//get all post api
app.get("/posts", async (req, res) => {
// console.log(req);
    const result = await Post.find({});
    res.send(result)
})

app.get("/posts/someTag", async (req, res) => {
    const query = {tag:{$nin:["c++","java"]}};
    const result = await Post.find(query);
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
    const commentData = req.body;
    commentData.commentToken = getToken("CT");
    // console.log(commentData);
    const newComment = new Comment(commentData);
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





*/