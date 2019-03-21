const multer = require('multer')
const path = require('path')
const fs = require('fs')

const storage = multer.diskStorage({
    destination: './src/assets/',
    filename: function(req, file, callback) {
      callback(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname))
    }
  })
  
const upload = multer({
    storage: storage
})

module.exports = function(app) {
    const persons = require('../controller/personController.js')
    app.get('/getAllPersons', persons.getAllPersons)
    app.post('/addPerson', upload.single('file'), persons.addPerson)
    app.post('/upload', upload.single('file'), (req, res) => {
        res.json({ file: req.file })
    })
}