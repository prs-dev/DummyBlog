const jwt = require("jsonwebtoken")
const Article = require("../model/Article")
const User = require("../model/User")

const logger = (req, res, next) => {
    console.log("----");
    console.log("method", req.method);
    console.log("path", req.path);
    console.log("body", req.body);
    console.log("----");
    next();
};

const auth = (req, res, next) => {
    // console.log("auth reached");
    let token = req.headers.authorization
    // console.log(token)
    if (!token) {
        return res.status(500).json({ message: "token not found!" })
    }
    token = token.split(" ")[1]
    const data = jwt.decode(token)
    req.user = {
        id: data.id,
        username: data.username
    }
    next();
};

const authUser = async (req, res, next) => {
    console.log(req.user)
    try {
        const currentUser = await User.findById(req.user.id)
        const article = await Article.findById(req.params.id)
        if (!(currentUser._id.equals(article.user._id))) {
            return res.status(400).json({ message: "You are not authorized!" })
        }
        // console.log("verified")
        next()
    } catch (error) {
       return res.status(500).json(error.message)
    }
}

module.exports = {
    logger,
    auth,
    authUser
};
