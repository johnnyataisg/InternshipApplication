const upload = require('../multer.config.js')

//Provide api routes for the person controller
module.exports = function(app) {
    const persons = require('../controller/personController.js')
    
    app.get('/getAllPersons', persons.getAllPersons)
    app.post('/addPerson', upload.single('file'), persons.addPerson)
}