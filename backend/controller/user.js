const User = require("../model/User");
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")

const getUsers = (req, res) => {
    res.send("register get route reached");
};

const createUser = async (req, res) => {
    const { username, email, password } = req.body;
    const salt = await bcrypt.genSalt(10)
    // console.log(salt)
    try {
        const duplicate = await User.findOne({ email });
        // console.log(duplicate)
        if (duplicate) {
            return res.status(400).json({ message: "User already exists" });
        }
        const hashedPassword = await bcrypt.hash(password, salt)
        const user = new User({
            username, email, password: hashedPassword
        })

        const result = await user.save()

        return res.status(201).json({message: "User created", user: result})
    } catch (error) { 
        console.log(error)
        return res.status(500).json({message: error.message})
    }
};

const currentUser = async(req, res) => {
    const {email, password } = req.body;
    const salt = await bcrypt.genSalt(10)
    // console.log(salt)
    try {
        // console.log(duplicate)
        const user = await User.findOne({ email })
        
        if (!user) {
            return res.status(400).json({message: "User not found!"})
        }

        if (!(await bcrypt.compare(password, user.password))) {
            return res.status(400).json({message: "Invalid credentials!"})
        }

        const token = jwt.sign({id: user.id, username: user.username}, process.env.SECRET)

        return res.status(200).json({message: `${user.username} logged in`, token})
    } catch (error) { 
        console.log(error)
        return res.status(500).json({message: error.message})
    }
};

module.exports = {
    createUser,
    currentUser,
};
