const utility = require("../helpers/utility");

const AppPost = require("../models/post")

module.exports = {
    createPost: async (data) => {
        const { title, description, category, tags, image } = data;
        const userToken = data.appSetUserToken;
        const token = utility.getToken("POST");

        const newPost = new AppPost({
            userToken,
            token,
            title,
            description,
            category,
            tags,
            image
        });

        await newPost.save();

        return newPost;
    },
    findPost: async (query) => {
        const posts = await AppPost.find(query);
        console.log(posts);

        return posts;
    },
    updatePost: async (data, filter) => {
        const { title, description, category, tags, image } = data;
        await AppPost.findOneAndUpdate(filter, {
            title,
            description,
            category,
            tags,
            image
        });
        const posts = await AppPost.find(filter);
        return posts[0];
    },
    deletePost: async (filter) => {
        await AppPost.deleteOne(filter)
        return {};
    }
}