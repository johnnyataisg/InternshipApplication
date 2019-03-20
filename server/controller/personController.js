const db = require('../config/db.config.js')
const Person = db.persons

module.exports = {
    addPerson: (req, res) => {
        Person.create({
            firstname: req.body.firstname,
            lastname: req.body.lastname,
            address: req.body.address,
            age: req.body.age,
            picture: req.body.picture
        }).then(person => {
            res.send(person)
        }).catch(error => {
            res.status(500).send("Error: " + error)
        })
    },
    getAllPersons: (req, res) => {
        Person.findAll().then(personList => {
            res.send(personList)
        }).catch(error => {
            res.status(500).send("Error: " + error)
        })
    }
}