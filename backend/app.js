const express = require('express');
const bodyParser = require("body-parser");
const mongoose = require('mongoose');

const Post = require('./models/post');

const app = express();
mongoose.connect("mongodb+srv://abhilashkr:AlikVrkthhDdODNw@cluster0-otspd.mongodb.net/node-angular?retryWrites=true")
    .then(() => {
        console.log("Connected to DB")
    })
    .catch(() => {
        console.log("Error! Connection failed")
    });

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));

app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept"
    );
    res.setHeader(
        "Access-Control-Allow-Methods",
        "GET, POST, PATCH, DELETE, OPTIONS, PUT"
    );
    next();
});

app.post("/api/posts", (req, res, next) => {
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

app.put("/api/posts/:id", (req, res, next) => {
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

app.get("/api/posts", (req, res, next) => {
    Post.find()
        .then(posts => {
            console.log(posts);
            res.status(200).json({
                message: "Posts fetched successfully",
                posts: posts
            });
        });
});

app.get("/api/posts/:id", (req, res, next) => {
    Post.findById(req.params.id).then(post => {
        if (post) {
            res.status(200).json(post);
        } else {
            res.status(404).json({message: "Page not Found!!"})
        }
    });
});

app.delete("/api/posts/:id", (req, res, next) => {
    Post.deleteOne({ _id: req.params.id }).then(result => {
        console.log(result);
        res.status(200).json({ message: "Post Deleted Successfully" });
    });
});

module.exports = app;