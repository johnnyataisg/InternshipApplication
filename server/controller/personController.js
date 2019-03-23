const db = require('../config/db.config.js')
const Person = db.persons
const Interest = db.interests
const Op = db.Sequelize.Op

//Define functions used to return api responses
module.exports = {
    //Add a person to the database and upload the image to src/assets through multer
    addPerson: (req, res) => {
        Person.create({
            firstname: req.body.firstname,
            lastname: req.body.lastname,
            address: req.body.address,
            age: req.body.age,
            picture: req.file.filename
        }).then(person => {
            for (var i = 0; i < req.body.interests.length; i++) {
                Interest.create({
                    description: req.body.interests[i],
                    PersonId: person.id
                })
            }
            res.send(person)
        }).catch(error => {
            res.status(500).send("Error: " + error)
        })
    },
    //Query all persons in the database who contain a substring in their first name or last name
    findPersons: (req, res) => {
        Person.findAll({
            where: {
                [Op.or]: [
                    {
                        firstname: {
                            [Op.substring]: req.query.substring
                        }
                    },
                    {
                        lastname: {
                            [Op.substring]: req.query.substring
                        }
                    }
                ]
            }
        }).then(personList => {
            res.send(personList)
        }).catch(error => {
            res.status(500).send("Error: " + error)
        })
    },
    //Return a list of all persons in the database
    getAllPersons: (req, res) => {
        Person.findAll().then(personList => {
            res.send(personList)
        }).catch(error => {
            res.status(500).send("Error: " + error)
        })
    }
}

/*
    Post.findAll({
  where: {
    [Op.or]: [{authorId: 12}, {authorId: 13}]
  }
});
// SELECT * FROM post WHERE authorId = 12 OR authorId = 13;
*/