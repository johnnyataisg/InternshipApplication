const db = require('../config/db.config.js')
const Person = db.persons
const Interest = db.interests

module.exports = {
    getInterestsByPerson: (req, res) => {
        Interest.findAll({
            where: {
                PersonId: req.query.id
            }
        }).then(interestList => {
            res.send(interestList)
        }).catch(error => {
            res.status(500).send("Error: " + error)
        })
    }
}