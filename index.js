const express = require("express");
const app = express();
const mongoose = require('mongoose');
require('dotenv').config();
const cors = require('cors');

const port = process.env.PORT || 3000;

app.use(cors(true))
app.use(express.json({limit: "500mb"}));
app.use(express.urlencoded({extended: true, limit: '5mb'}))


//database connection with mongoose

const dbURL = `mongodb://localhost:27017/${process.env.DB_NAME}`;


mongoose.connect(dbURL, { 
    useNewUrlParser: true ,
    useUnifiedTopology: true
})

const db = mongoose.connection;
db.on("error", (error) =>console.log(error));
db.once('open', () => console.log("Mong DB connect success"));

app.use("/", require('./routes/web'))
app.use("/api", require('./routes/api'))

app.listen(port, () => {
    console.log(`listening on port ${port}`)
})
















/*








// get post api by post api
app.get("/posts/:userId", async (req, res) => {
    const userId = req.params.userId;
    const result = await Post.find({ userId: userId });
    res.send(result);
})



app.get("/post/comment/:postId", async (req, res) => {
    const postId = req.params.postId;
    const result = await Comment.find({ postId: postId });
    res.send(result);
})





*/