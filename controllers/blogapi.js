const express = require('express');
const router = express.Router();
const getToken = require("../modules/getToken");


// models
const Post = require('../models/post');
const Comment = require("../models/comment");
const Product = require('../models/product');
const User = require('../models/user');
const AuthSession = require("../models/auth");


const nameValidation = (name) => {
    var re = /^[A-Za-z\s]+$/;
    if (re.test(name))
        return false;
    else
        return true;
}

const emailValidation = (e) => {
    var filter = /^\s*[\w\-\+_]+(\.[\w\-\+_]+)*\@[\w\-\+_]+\.[\w\-\+_]+(\.[\w\-\+_]+)*\s*$/;
    return (String(e).search(filter) != -1)
}


const createSession = async (user, deviceToken) => {

    const token = getToken("AS");
    const userToken = user.token;
    const status = "active";
    const newSession = new AuthSession({
        token,
        userToken,
        deviceToken,
        status
    })

    // console.log(newUser)
    await newSession.save((err) => {
        if (err) {
            return {
                type: 'error',
                msg: 'some thing is wrong save to db'
            }
        }
    });

    return {
        type: 'success',
        msg: 'User has been valid',
        data: {
            sessionToken: token,
            userToken,
            name: user.name,
            email: user.email

        }
    }
}

router.get('/', (req, res) => {
    res.send("<h2>Hollo Blogs App Server..</h2>")
})
// add new user api
router.post("/user/newUser", async (req, res) => {
    try {
        const name = req.body.name;
        const email = req.body.email;
        const password = req.body.password;
        const deviceToken = req.headers.devicetoken;
        let proceed = true;


        // @validation part
        // => validation 1: required are not empty

        if (name === undefined || email === undefined || password === undefined) {
            proceed = false;
            res.send({
                type: "error",
                msg: "Required Fields Should Not Be Empty"
            })
        }
        else if (name.length === 0 || email.length === 0 || password.length === 0) {
            proceed = false;
            res.send({
                type: "error",
                msg: "Required Fields Should Not Be Empty1"
            })
        }

        // => validation 2: required valid name
        if (nameValidation(name)) {
            proceed = false;
            res.send({
                type: "error",
                msg: "Required Should  Be valid name"
            })
        }
        // => validation 3: required valid email
        if (!emailValidation(email)) {
            proceed = false;
            res.send({
                type: "error",
                msg: "Required Should Be valid email"
            })
        }

        // => validation 4: check user in our database
        const exitUsers = await User.find({ email: email });

        if (exitUsers.length > 0) {
            proceed = false;
            res.send({
                type: "error",
                msg: "User Already Registered"
            })
        }

        // => validation 5: check password validation
        if (password.length < 8) {
            proceed = false;
            res.send({
                type: "error",
                msg: "Password Should Have be more then 8 charters"
            })
        }

        // @business logic
        if (proceed) {
            const token = getToken("UI")
            const newUser = new User({
                token,
                name,
                email,
                password
            })
            const user = {
                token,
                name,
                email
            };
            await newUser.save(async (err) => {
                if (err) {
                    res.send({
                        type: 'error',
                        msg: 'some thing is wrong'
                    })
                } else {
                    sessionInfo = await createSession(user, deviceToken);
                    res.send(sessionInfo)
                }
            });
        }

    } catch (error) {
        console.log(error)
    }
})

// add login api
router.post("/user/login", async (req, res) => {
    try {
        const email = req.body.email;
        const password = req.body.password;
        const deviceToken = req.headers.deviceToken;
        let proceed = true;

        if (email === undefined || password === undefined || deviceToken === undefined) {
            proceed = false;
            res.send({
                type: "error",
                msg: "Required Fields Should Not Be Empty"
            })
        }
        else if (email.length === 0 || password.length === 0 || deviceToken.length === 0) {
            proceed = false;
            res.send({
                type: "error",
                msg: "Required Fields Should Not Be Empty1"
            })
        }

        // => validation 3: required valid email
        if (!emailValidation(email)) {
            proceed = false;
            res.send({
                type: "error",
                msg: "Required Should Be valid email"
            })
        }

        // => validation 4: check password validation
        if (password.length < 8) {
            proceed = false;
            res.send({
                type: "error",
                msg: "Password Should Have be more then 8 charters"
            })
        }
        // => validation 5: check user in our database
        const user = await User.find({ email: email });

        if (user.length === 0) {
            proceed = false;
            res.send({
                type: "error",
                msg: "User not Registered"
            })
        }



        // @business logic
        if (user[0].password !== password) {
            proceed = false;
            res.send({
                type: "error",
                msg: "Your Password wrong"
            })
        }

        if (proceed) {
            sessionInfo = await createSession(user[0], deviceToken);
            res.send(sessionInfo)
        }

    } catch (error) {
        console.log(error);
    }
})

//add database post api
router.post("/post/newPost", async (req, res) => {
    try {
        let token = getToken("PT");
        // let userToken = req.body.userId;
        let title = req.body.title;
        let description = req.body.description;
        let tags = req.body.tags;
        let sessionToken = req.headers.sessiontoken;
        let deviceToken = req.headers.devicetoken;

        let proceed = true;

        console.log(sessionToken);
        // @validation part
        // => validation 1: required are not empty
        console.log(tags.length)
        if (sessionToken === undefined || deviceToken === undefined || title === undefined || description === undefined || tags === undefined) {
            proceed = false;
            res.send({
                type: "error",
                msg: "Required Fields Should Not Be Empty"
            })
        } else if (deviceToken === undefined || sessionToken.length === 0 || title.length === 0 || description.length === 0 || tags.length === 0) {
            proceed = false;
            res.send({
                type: "error",
                msg: "Required Fields Should Not Be Empty1"
            })
        }


        // => validation 2: check user in our database
        const userSession = await AuthSession.find({ token: sessionToken });

        if (userSession.length === 0 || userSession[0]?.status !== "active") {
            proceed = false;
            res.send({
                type: "error",
                msg: "Please login Now"
            })
        }

        if (userSession[0].deviceToken !== deviceToken) {
            proceed = false;
            res.send({
                type: "error",
                msg: "What is this Your not valid man"
            })
        }


        // @business logic
        if (proceed) {

            const newPost = new Post({
                token: token,
                userToken: userSession[0].userToken,
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
        const postToken = req.body.postToken;
        const description = req.body.description;
        let sessionToken = req.headers.sessiontoken;
        let deviceToken = req.headers.devicetoken;


        let proceed = true;
        // @validation part
        // => validation 1: required are not empty
        if (sessionToken === undefined ||deviceToken === undefined || postToken === undefined || description === undefined) {
            proceed = false;
            res.send({
                type: "error",
                msg: "Required Fields Should Not Be Empty"
            })
        } else if (deviceToken.length === 0 ||sessionToken.length === 0 || description.length === 0 || postToken.length === 0) {
            proceed = false;
            res.send({
                type: "error",
                msg: "Required Fields Should Not Be Empty"
            })
        }
        // => validation 2: check user in our database
        
        const userSession = await AuthSession.find({ token: sessionToken });
        if (userSession.length === 0 || userSession[0]?.status !== "active") {
            proceed = false;
            res.send({
                type: "error",
                msg: "Please login Now"
            })
        }

        if (userSession[0].deviceToken !== deviceToken) {
            proceed = false;
            res.send({
                type: "error",
                msg: "What is this Your not valid man"
            })
        }

        // => validation 3: check postToken in our database
        
        const post = await Post.find({ token: postToken});
        // console.log(post)
        if (post.length < 1){
            proceed = false;
            res.send({
                type: "error",
                msg: "This Post is not available"
            })
        }


        // @business logic
        if (proceed) {
            const newComment = new Comment({
                token: token,
                userToken: userSession[0].userToken,
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




// totalPrice api 
router.post("/product/newProduct", async (req, res) => {
    try {
        let token = getToken("PD");
        let name = req.body.name;
        let price = req.body.price;
        let category = req.body.category;
        let sessionToken = req.headers.sessiontoken;
        let deviceToken = req.headers.devicetoken;

        let proceed = true;
        // @validation part

        
        

        let proceed = true;

        console.log(sessionToken);
        // @validation part
        // => validation 1: required are not empty
        console.log(tags.length)
        if (sessionToken === undefined || deviceToken === undefined || name === undefined || description === undefined || category === undefined|| price === undefined) {
            proceed = false;
            res.send({
                type: "error",
                msg: "Required Fields Should Not Be Empty"
            })
        } else if (deviceToken === undefined || sessionToken.length === 0 || name.length === 0 || description.length === 0 || category.length === 0) {
            proceed = false;
            res.send({
                type: "error",
                msg: "Required Fields Should Not Be Empty1"
            })
        }


        // => validation 2: check user in our database
        const userSession = await AuthSession.find({ token: sessionToken });

        if (userSession.length === 0 || userSession[0]?.status !== "active") {
            proceed = false;
            res.send({
                type: "error",
                msg: "Please login Now"
            })
        }

        if (userSession[0].deviceToken !== deviceToken) {
            proceed = false;
            res.send({
                type: "error",
                msg: "What is this Your not valid man"
            })
        }



        // @business logic

        const newProduct = new Product({
            token,
            name,
            price,
            category
        })
        newProduct.save()

        res.send({
            type: "success",
            message: "instar new product"
        })

    } catch (error) {
        res.send({
            type: "error",
            message: "something is wrong"
        })
    }
})

router.get("/products", async (req, res) => {
    const category = "fresh";
    const query = {
        category: category
    }

    const products = await Product.find(query);
    let totalPrice = 0;
    for (let i = 0; i < products.length; i++) {

        totalPrice += parseInt(products[i].price);
    }
    res.send({
        type: "success",
        message: "success message",
        totalPrice: totalPrice,
        products: products
    });
})


module.exports = router;