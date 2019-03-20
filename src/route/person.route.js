module.exports = function(app) {
    const persons = require('../controller/personController.js')

    app.post('/addPerson', persons.addPerson)
}