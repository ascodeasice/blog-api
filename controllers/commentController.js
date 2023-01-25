const Comment = require("../models/comment");

exports.createComment = (req, res) => {
    res.send(`NOT IMPLEMENTED:create comment :${req.params.postId}`);
}

exports.getComments = (req, res, next) => {
    Comment.find({ post: req.params.postId })
        .exec((err, comments) => {
            if (err) {
                return next(err);
            }
            res.json(comments);
        });
}

exports.getComment = (req, res) => {
    res.send(`NOT IMPLEMENTED:get comment: ${req.params.commentId}`);
}

exports.updateComment = (req, res) => {
    res.send(`NOT IMPLEMENTED:update comment:${req.params.commentId}`);
}

exports.deleteComment = (req, res) => {
    res.send(`NOT IMPLEMENTED:delete comment: ${req.params.commentId}`);
}
