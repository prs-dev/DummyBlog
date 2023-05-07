const mongoose = require("mongoose")

const connectDB = async(app, PORT) => {
    await mongoose.connect(process.env.MONGO_URI)
    console.log("mongo connected")
    return app.listen(4000, () => {
        console.log("server is running on PORT " + PORT)
    })
}

module.exports = connectDB