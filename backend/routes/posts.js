const express = require('express');

const router = express.Router();
const Post = require('../models/post');
router.post("/api/posts");

router.post("", (req, res, next) => {
    const post = new Post({
        title: req.body.title,
        content: req.body.content
    });
    post.save().then(createdPost => {
        res.status(200).json({
            message: "Post Added Successfully",
            postId: createdPost._id
        });
    });
});

router.put("/:id", (req, res, next) => {
    const post = new Post({
        _id: req.body.id,
        title: req.body.title,
        content: req.body.content
    });
    Post.updateOne({_id: req.params.id}, post).then(result => {
        console.log(result);
        res.status(200).json({ message: "update Successful" });
    });
});

router.get("", (req, res, next) => {
    Post.find()
        .then(posts => {
            console.log(posts);
            res.status(200).json({
                message: "Posts fetched successfully",
                posts: posts
            });
        });
});

router.get("/:id", (req, res, next) => {
    Post.findById(req.params.id).then(post => {
        if (post) {
            res.status(200).json(post);
        } else {
            res.status(404).json({message: "Page not Found!!"})
        }
    });
});

router.delete("/:id", (req, res, next) => {
    Post.deleteOne({ _id: req.params.id }).then(result => {
        console.log(result);
        res.status(200).json({ message: "Post Deleted Successfully" });
    });
});

module.exports = router;