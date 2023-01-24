const User = require("../models/user");
const { body, validationResult } = require("express-validator");

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
    // TODO: add token to verify user is logged in
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
                res.json(user);
            });
        }
    }
]