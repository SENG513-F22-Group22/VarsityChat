const { Course } = require("./database.js")

const getAllCourses = (req, res) => {
    Course.find((err, found) => {
        if (err) {
            console.log(err)
        }
        else if (found) {
            res.send(found)
        }
    })
}

const addCourse = (req, res) => {
    const newName = req.body.name

    const NewCourse = new Course({
        courseName: newName
    })

    NewCourse.save(err,saved => {
        if (err) {
            res.status(500).json({ error: "Internal server error" })
        }
        else {
            res.status(200)
        }
    })
}




module.exports = {
    getAllCourses,
    addCourse
}