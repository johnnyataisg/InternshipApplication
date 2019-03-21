const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const db = require('./config/db.config.js')

//Initialize an express instance and require it to use body parser to parser json files
const app = express()
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(cors())

//Import functions from the needed api routes
require('./route/person.route')(app)

//Clear the src/assets directory and set up a localhost port 8081 server
module.exports = function() {
  const fs = require('fs');
  const path = require('path');
  
  const directory = './src/assets/';
  
  fs.readdir(directory, (err, files) => {
    if (err) throw err;
  
    for (const file of files) {
      fs.unlink(path.join(directory, file), err => {
        if (err) throw err;
      });
    }
  });

  //Delete all tables and recreate them at every run of the server
  db.sequelize.dropAllSchemas({ force: true }).then(function() {
    db.sequelize.sync({ force: true }).then(function() {
      app.listen(8081, function() {
        console.log('listening to port localhost:8081')
      })
    })
  })
}