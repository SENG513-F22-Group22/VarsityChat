const { User } = require("./database.js") 

const setNames = (req, res) => {
    userEmail = req.body.email
    fName = req.body.fName 
    lName = req.body.lName


    User.findOne({ email: userEmail }, (err, found) => {
        if (err) {
            console.log(err)
        }
        else {
            const newFound = found
            let nameChanged = false

            if (newFound.firstName) {
                newFound.firstName = fName
                nameChanged = true
            }
            
            if (newFound.lastName) {
                newFound.lastName = lName
                nameChanged = true
            }
            
            if (nameChanged) {
                newFound.save(err, saved => {
                    if (err) {
                        console.log(err)
                    }
                    else {
                        res.status(200)
                    }
                })
            }
            
        }
    })
}

const getNames = (req, res) => {
    userEmail = req.query.email

    User.findOne({ email: userEmail }, (err, found) => {
        if (err) {
            console.log(err)
        }
        else {
            let fName = found.firstName
            let lName = found.lastName
            res.send({fName, lName})
        }
    })
}


module.exports = {
    setNames,
    getNames
}