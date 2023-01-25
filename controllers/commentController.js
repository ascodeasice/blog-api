const Comment = require("../models/comment");
const { body, validationResult } = require("express-validator");
const jwt = require("jsonwebtoken");

exports.createComment = [
    body("text", "comment text is required")
        .trim()
        .isLength({ min: 1 }),
    body("authorName")
        .trim(),
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            res.json(errors.array());
            return next();
        }

        const comment = new Comment({
            authorName: req.body.authorName == "" ? "anonymous" : req.body.authorName,
            text: req.body.text,
            post: req.params.postId,
        });

        comment.save(err => {
            if (err) {
                res.json(err);
                return next(err);
            }
            res.json(comment);
        });
    }
]

exports.getComments = (req, res, next) => {
    Comment.find({ post: req.params.postId })
        .exec((err, comments) => {
            if (err) {
                return next(err);
            }
            res.json(comments);
        });
}

exports.getComment = (req, res, next) => {
    Comment.findById(req.params.commentId)
        .exec((err, comment) => {
            if (err) {
                res.json(err);
                return next(err);
            }
            res.json(comment);
        });
}

exports.deleteComment = (req, res, next) => {
    // verify token
    jwt.verify(req.token, process.env.JWT_SECRET, (err, authData) => {
        if (err) {
            res.sendStatus(403);
            return;
        }
    });

    Comment.findById(req.params.commentId)
        .exec((err, comment) => {
            if (err) {
                res.json(err);
                return;
            }
            if (comment == null) {
                const error = new Error("Comment not found");
                error.status = 404;
                res.json(error);
                return;
            }
            Comment.findByIdAndRemove(req.params.commentId, (err) => {
                if (err) {
                    res.json(err);
                    return;
                }
                res.json(comment);
            });
        });
}
