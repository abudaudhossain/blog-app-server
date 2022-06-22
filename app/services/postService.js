const utility = require("../helpers/utility");

const AppPost = require("../models/post")

module.exports = {
    createPost: async (data) => {
        const { title, description, category, tags } = data;
        const userToken = data.appSetUserToken;
        const token = utility.getToken("POST");

        const newPost = new AppPost({
            userToken,
            token,
            title,
            description,
            category,
            tags
        });

        await newPost.save();

        return newPost;
    }
}