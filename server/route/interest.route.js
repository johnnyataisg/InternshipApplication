const upload = require('../multer.config.js')

module.exports = function(app) {
    const interests = require('../controller/interestController.js')

    app.get('/getInterestsByPerson', interests.getInterestsByPerson)
}