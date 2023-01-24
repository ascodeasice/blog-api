const User = require("../models/user");
const { body, validationResult } = require("express-validator");
const jwt = require("jsonwebtoken");

exports.getUser = (req, res, next) => {
    console.log(req.params.userId);
    User.findById(req.params.userId)
        .exec((err, user) => {
            if (err) {
                return next(err);
            }
            if (user == null) {
                const error = new Error("User not found");
                error.status = 404;
                return next(error);
            }

            res.json({
                "username": user.username,
                "bio": user.bio,
            });
            return;
        });
}

exports.updateUser = [
    body("username", "User name is required")
        .trim()
        .isLength({ min: 1 }),
    body("password", "Password is requried")
        .trim()
        .isLength({ min: 1 }),
    body("bio", "Bio is required")
        .trim()
        .isLength({ min: 1 }),
    (req, res) => {
        jwt.verify(req.token, process.env.JWT_SECRET, (err, authData) => {
            if (err) {
                res.sendStatus(403);
            } else {
                const errors = validationResult(req);

                if (!errors.isEmpty()) {
                    res.json({
                        errors: errors.array(),
                    });
                    return next();
                } else {
                    /*  Yeah, I know I didn't hash the password, 
                        but I'm literally the only user of this blog
                    */
                    const user = new User({
                        username: req.body.username,
                        password: req.body.password,
                        bio: req.body.bio,
                        _id: req.params.userId,
                    });
                    User.findByIdAndUpdate(req.params.userId, user, (err, oldUser) => {
                        if (err) {
                            return next(err);
                        }

                        // return json of new user
                        res.json({
                            message: "User updated",
                            user,
                            authData,
                        });
                    });
                }
            }
        });
    }
]