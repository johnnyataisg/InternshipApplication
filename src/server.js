const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const Sequelize = require('sequelize')
const PersonModel = require('./models/Person')
const InterestModel = require('./models/Interest')
const db = require('./config/db.config.js')

const app = express()
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(cors())

require('./route/person.route')(app)


module.exports = function() {
  db.sequelize.dropAllSchemas({ force: true }).then(function() {
    db.sequelize.sync({ force: true }).then(function() {
      app.listen(8081, function() {
        console.log('listening to port localhost:8081')
      })
    })
  })
}
// Resets the database and launches the express app on :8081
