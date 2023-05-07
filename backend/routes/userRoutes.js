const router = require("express").Router()
const {currentUser, createUser} = require("../controller/user")
const {auth} = require("../middlewares/middlewares")

//register

router.post("/register", createUser)

//login

router.post("/login", currentUser)


module.exports = router