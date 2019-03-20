const Sequelize = require('sequelize')

const database = new Sequelize({
    dialect: 'sqlite',
    storage: './PersonDatabase.sqlite'
})

const db = {}
db.Sequelize = Sequelize
db.sequelize = database

db.persons = require('../models/Person.js')(database, Sequelize)
db.interests = require('../models/Interest.js')(database, Sequelize)

module.exports = db