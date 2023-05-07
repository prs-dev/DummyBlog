const Article = require("../model/Article")
const User = require("../model/User")
const Comment = require("../model/Comment")

const getAllArticles = async(req, res) => {
    try {
        const articles = await Article.find({}).populate("user", {username: 1}).populate("comments", {comment: 1})
        return res.status(200).json({articles}) 
    } catch (error) {
        return res.status(500).json({message: error.message})
    }
}

const createArticle = async(req, res) => {
    const {title, content, cat} = req.body
    try {
        const user = await User.findById(req.user.id)
        const article = new Article({
            title, content, cat, user
        })
        const result = await article.save()
        user.articles = user.articles.concat(article._id)
        await user.save()
        return res.status(201).json({message: "new article created", result, user})
    } catch (error) {
        res.status(500).json({message: error.message})
    }
}

const editArticle = async(req, res) => {
    const id = req.params.id
    const {title, content} = req.body
    try {
        const article = await Article.findByIdAndUpdate(id, {
            title,
            content
        })
        res.status(200).json({message: "article updated", article})
    } catch (error) {
        res.status(500).json({message: error.message})
    }
}

const deleteArticle = async(req, res) => {
    const id = req.params.id
    try {
        const article = await Article.findByIdAndDelete(id)
        res.status(200).json({message: "article deleted", result: article})
    } catch (error) {
        res.status(500).json({message: error.message})
    }
}

const getArticle = async(req, res) => {
    const id = req.params.id
    try {
        const article = await Article.findOne({_id: id})
        res.status(200).json({message: "article found", result: article})
    } catch (error) {
        res.status(500).json({message: error.message})
    }
}

const commentArticle = async(req, res) => {
    const {comment} = req.body
    try {
        const user = await User.findById(req.user.id)
        const articleId = req.params.articleId
        const article = await Article.findById(articleId)
        const newComment = new Comment({
            comment,
            article,
            user
        })
        const result = await newComment.save()
        article.comments = article.comments.concat(newComment._id)
        const response = await article.save()
        res.status(200).json({message: "comment saved", result, response})
    } catch (error) {
        res.status(500).json({message: error.message})
    }
}

module.exports = {
    getAllArticles,
    createArticle,
    editArticle,
    deleteArticle,
    commentArticle,
    getArticle
}


