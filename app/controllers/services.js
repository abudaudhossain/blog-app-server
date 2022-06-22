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
    }
}