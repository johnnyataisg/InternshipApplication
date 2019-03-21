const Sequelize = require('sequelize')

//Map a SQLite database with the Sequelize ORM
const database = new Sequelize({
    dialect: 'sqlite',
    storage: './PersonDatabase.sqlite'
})

const db = {}
db.Sequelize = Sequelize
db.sequelize = database

//Add the required models in the database
db.persons = require('../models/Person.js')(database, Sequelize)
db.interests = require('../models/Interest.js')(database, Sequelize)
db.interests.belongsTo(db.persons)

module.exports = db