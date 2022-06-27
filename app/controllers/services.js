const handler = require("../exceptions/handler");
const { nativeResponse } = require("../helpers/utility");
const postService = require("../services/postService");
const createPostRequestValidation = require("../validations/request/createPostRequestValidation");



module.exports = {
    addNewPost: async (req, res) => {
        try {

            createPostRequestValidation(req, res);
            const result = await postService.createPost(req.body)
            console.log(result)
            nativeResponse(result, "Create A new post successfully", res)

        } catch (error) {
            console.log(error);
            handler(error, res);
        }
    },
    allPost: async (req, res) => {
        try {
            const result = await postService.findPost({});
            nativeResponse(result, "get all post successfully", res)

        } catch (error) {
            console.log(error);
            handler(error, res)
        }
    },
    myPost: async (req, res) => {
        try {
            const result = await postService.findPost({ userToken: req.body.appSetUserToken });
            nativeResponse(result, "get all my post", res)

        } catch (error) {
            console.log(error);
            handler(error, res)
        }
    },
    updatePost: async (req, res) => {
        try {
            createPostRequestValidation(req, res);

            const result = await postService.updatePost(req.body, {
                userToken: req.body.appSetUserToken,
                token: req.body.token
            });
            nativeResponse(result, "update successfully", res)

        } catch (error) {
            console.log(error);
            handler(error, res)
        }
    },
    deletePost: async (req, res) => {
        try {


            const result = await postService.deletePost({
                userToken: req.body.appSetUserToken,
                token: req.body.token
            });
            nativeResponse(result, "Delete successfully", res)

        } catch (error) {
            console.log(error);
            handler(error, res)
        }
    },
    post: async (req, res) => {
        try {
            const { token } = req.params
            console.log(token, "sldkfj;kdfh")
            const result = await postService.findPost({
                token
            });
            nativeResponse(result, "get post by token", res)

        } catch (error) {
            console.log(error);
            handler(error, res)
        }
    },
    getPostByCategory: async (req, res) => {
        try {
            const { categoryName } = req.params;
            console.log(categoryName, "-----------------")
            const result = await postService.findPost({
                category: categoryName
            });
            nativeResponse(result, "get post by category", res)

        } catch (error) {
            console.log(error);
            handler(error, res)
        }
    }
}