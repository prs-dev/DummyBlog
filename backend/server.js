const express = require("express")
require("dotenv").config()
const {logger} = require("./middlewares/middlewares")
const cors = require("cors")
const userRoutes = require("./routes/userRoutes")
const articleRoutes = require("./routes/articleRoutes")
const connectDB = require("./db")

const app = express()

//middlewares
app.use(express.json())
app.use(cors())
app.use(logger)
app.use("/api/users", userRoutes)
app.use("/api/articles", articleRoutes)

const PORT = process.env.PORT || 4000

connectDB(app, PORT)
