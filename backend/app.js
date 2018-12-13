const express = require('express');

const app = express();

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

app.use('/api/posts', (req, res, next) => {
    const posts = [
        {
            id: '1234',
            title: 'First ServerSide post',
            content: 'This is coming from the server'
        },
        {
            id: 'djkskjjd',
            title: 'Second ServerSide post',
            content: 'This is coming from the server'
        }
    ]
    res.status(200).json({
        message: "Posts fetched successfully",
        posts: posts
    });
});

module.exports = app;