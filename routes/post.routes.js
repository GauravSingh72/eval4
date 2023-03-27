const express = require("express");
const { postModel } = require("../model/post.model");

const postRouter = express.Router();

postRouter.get("/", async (req, res) => {
    const query = req.query;
    const { userId } = req.body;

    try {
        const posts = await postModel.find({ $and: [{ userId: userId }, query] });
        res.send(posts);
        console.log("Posts get request has been made successfully");
    } catch (error) {
        res.send(error.message);
    }
})

postRouter.get("/:id", async (req, res) => {
    const query = req.query;
    const { userId } = req.body;

    try {
        const posts = await postModel.find({ $and: [{ userId: userId }, query] });
        res.send(posts);
        console.log("Posts get request has been made successfully");
    } catch (error) {
        res.send(error.message);
    }
})

// add post
postRouter.post("/add", async (req, res) => {
    const payload = req.body;
    try {
        const post = new postModel(payload);
        await post.save();
        res.send(post);
        console.log("Post created successfully");
    } catch (error) {
        res.send(error.message);
    }
})

// update post
postRouter.patch("/update/:id", async (req, res) => {
    const payload = req.body;
    const { id } = req.params;
    try {
        await postModel.findByIdAndUpdate({ _id: id }, payload);
        const post = await postModel.find({ id: id });
        res.send(post);
        console.log("Post updated successfully");
    } catch (error) {
        res.send(error.message);
    }
})

// delete post 
postRouter.delete("/delete/:id", async (req, res) => {
    const { id } = req.params;
    try {
        const post = await postModel.find({ id: id });
        await postModel.findByIdAndDelete({ _id: id });
        res.send(post);
        console.log("Post deleted successfully");
    } catch (error) {
        res.send(error.message);
    }
})

module.exports = { postRouter };