module.exports = function(app) {
    const persons = require('../controller/personController.js')
    app.get('/getAllPersons', persons.getAllPersons)
    app.post('/addPerson', persons.addPerson)
    
}