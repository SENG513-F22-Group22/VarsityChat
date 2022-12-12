const { User, Course } = require("./database.js")

const signup = (req, res) => {
    const { email, password } = req.body
    // let courses = getAllCourses()
    // console.log(courses)
    // courses = ""
    let courses = []
    

    const firstName = ""
    const lastName = ""

    User.findOne({ email: email }, (err, found) => {
        if (err) {
            res.status(500).json({ error: "Internal server error" })
        } else if (found) {
            res.status(400).json({ error: "Email already exists" })
        } else {

            Course.find((err, found) => {
                if (err) {
                    console.log(err)
                }
                found.sort(() => (Math.random() > 0.5) ? 1 : -1)
                courses = found.slice(0, 5)

                console.log(courses)

                const newUser = new User({
                    email,
                    password,
                    courses,
                    firstName,
                    lastName
                })
    
                newUser.save((err, saved) => {
                    if (err) {
                        res.status(500).json({ error: "Internal server error" })
                    } else {
                        res.status(200).json({ message: "User created" })
                    }
                })
            })
        }
    });
}

const signin = (req, res) => {
    const { email, password } = req.body
    User.find({ email: email, password: password }, function (err, docs) {
        if (err) {
            console.log(err);
        }
        else if (docs.length === 1) {
            res.status(200).json({ message: "User logged in" })
        }
        else {
            res.status(401).json({ error: "Invalid credentials" })
        }
    })
}

module.exports = {
    signup,
    signin
}