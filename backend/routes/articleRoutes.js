const router = require("express").Router()
const {getAllArticles, createArticle, deleteArticle, editArticle, commentArticle, getArticle} = require("../controller/article")
const {auth, authUser} = require("../middlewares/middlewares")

router.get("/", auth, getAllArticles)

router.get("/:id", auth, getArticle)

router.post("/create", auth, createArticle)

router.put("/:id", auth, authUser, editArticle)

router.delete("/:id", auth, authUser, deleteArticle)

router.post('/comment/:articleId', auth, commentArticle)

module.exports = router