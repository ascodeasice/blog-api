const jwt = require("jsonwebtoken");
const User = require("../models/user");
const { body, validationResult } = require("express-validator");

exports.signUp = (req, res) => {
    res.send(`NOT IMPLEMENTED: sign up`);
}

exports.logIn = [
    body("username", "User name is required")
        .trim()
        .isLength({ min: 1 }),
    body("password", "Password is requried")
        .trim()
        .isLength({ min: 1 }),
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            res.json({
                message: "invalid input",
                errors: errors.array(),
            });
            return next(errors);
        }
        User.findOne({ username: req.body.username })
            .exec((err, user) => {
                if (err) {
                    return next(err);
                }
                if (user == null) {
                    res.json({
                        message: "Wrong user name",
                    });
                    return next();
                }
                if (req.body.password != user.password) {
                    res.json({
                        message: "Wrong password",
                    });
                    return next();
                }

                // valid log in
                jwt.sign({ user: user }, process.env.JWT_SECRET, { expiresIn: '1day' }, (err, token) => {
                    res.json({
                        token: token,
                    });
                });

            });
    }
]