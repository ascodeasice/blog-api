var express = require('express');
var router = express.Router();
const authController = require("../controllers/authController");
const commentController = require("../controllers/commentController");
const postController = require("../controllers/postController");
const userController = require("../controllers/userController");
// const { verifyToken } = require("../jwt/verify");
function verifyToken(req, res, next) {
  // Get the auth header value
  const bearerHeader = req.headers['authorization'];
  if (typeof bearerHeader !== 'undefined') {
    // Split at the space
    const bearer = bearerHeader.split(" ");
    const bearerToken = bearer[1];
    // Set the token
    req.token = bearerToken;
    next();
  } else {
    // Forbidden
    res.sendStatus(403);
  }
}

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

router.put("/users/:userId", verifyToken, userController.updateUser);

module.exports = router;
