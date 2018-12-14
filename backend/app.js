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
        "GET, POST, PATCH, DELETE, OPTIONS"
    );
    next();
});

app.post("/api/posts", (req, res, next) => {
    const post = new Post({
        title: req.body.title,
        content: req.body.content
    });
    post.save();
    console.log(post);
    res.status(200).json({
        message: "Post Added Successfully"
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

module.exports = app;