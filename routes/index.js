var express = require('express');
var router = express.Router();
const authController = require("../controllers/authController");
const commentController = require("../controllers/commentController");
const postController = require("../controllers/postController");
const userController = require("../controllers/userController");

router.get('/', function (req, res, next) {
  res.send("Implement your own homepage in frontend");
});

router.post("/signUp", authController.signUp);

router.post("/logIn", authController.logIn);

router.post("/posts/:postId/comments", commentController.createComment);

router.get("/posts/:postId/comments", commentController.getComments);

router.get("/posts/:postId/comments/:commentId", commentController.getComment);

router.put("/posts/:postId/comments/:commentId", commentController.updateComment);

router.delete("/posts/:postId/comments/:commentId", commentController.deleteComment);

router.post("/posts", postController.createPost);

router.get("/posts", postController.getPosts);

router.get("/posts/:postId", postController.getPost);

router.put("/posts/:postId", postController.updatePost);

router.delete("/posts/:postId", postController.deletePost);

router.get("/users/:userId", userController.getUser);

router.put("/users/:userId", userController.updateUser);

module.exports = router;
