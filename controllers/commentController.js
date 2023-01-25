const Comment = require("../models/comment");
const { body, validationResult } = require("express-validator");

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

exports.deleteComment = (req, res) => {
    res.send(`NOT IMPLEMENTED:delete comment: ${req.params.commentId}`);
}
