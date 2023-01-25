const Post = require("../models/post");
const Comment = require("../models/comment");
const { body, validationResult } = require("express-validator");

exports.createPost = [
    body("title", "Title is required")
        .trim()
        .isLength({ min: 1 }),
    body("text", "Text is required")
        .trim()
        .isLength({ min: 1 }),
    body("author", "Author is required")
        .trim()
        .isLength({ min: 1 }),
    (req, res, next) => {
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            res.json(errors.array());
            return next();
        }
        const newPost = new Post({
            title: req.body.title,
            text: req.body.text,
            author: req.body.author,
            comments: [],
            isPublic: req.body.isPublic === "on"
        });
        newPost.save(err => {
            if (err) {
                res.json(err);
                return next(err);
            }
            res.json(newPost);
        });
    }
]

exports.getPosts = (req, res, next) => {
    Post.find({})
        .exec((err, posts) => {
            if (err) {
                res.json(err);
                return next(err);
            }
            res.json(posts);
        });
}

exports.getPost = (req, res) => {
    Post.findById(req.params.postId)
        .exec((err, post) => {
            if (err) {
                res.json(err);
                return next(err);
            }
            res.json(post);
        });
}

exports.updatePost = [
    body("title", "Title is required")
        .trim()
        .isLength({ min: 1 }),
    body("text", "Text is required")
        .trim()
        .isLength({ min: 1 }),
    body("author", "Author is required")
        .trim()
        .isLength({ min: 1 }),
    (req, res, next) => {
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            res.json(errors.array());
            return next();
        }
        const newPost = new Post({
            title: req.body.title,
            text: req.body.text,
            author: req.body.author,
            comments: [],
            isPublic: req.body.isPublic === "on",
            _id: req.params.postId,
        });

        Post.findByIdAndUpdate(req.params.postId, newPost, (err, oldPost) => {
            if (err) {
                res.json(err);
                return next(err);
            }
            res.json(newPost);
        });
    }
]

exports.deletePost = (req, res, next) => {
    Post.findById(req.params.postId)
        .exec((err, post) => {
            if (err) {
                res.json(err);
                return next(err);
            }

            // Delete all comments of post
            post.comments.forEach(commentId => {
                Comment.findByIdAndRemove(commentId, (err) => {
                    if (err) {
                        res.json(err);
                        return next(err);
                    }
                });
            });

            // Delete post
            Post.findByIdAndRemove(req.params.postId, (err) => {
                if (err) {
                    res.json(err);
                    return next(err);
                }
                res.json(post);
            })
        })
}
