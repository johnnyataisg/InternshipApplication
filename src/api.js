const { Person } = require('./models/Person')
const bodyParser = require('body-parser')

module.exports = (app) => {
    
    app.post('/register', (req, res) => {
        console.log(req.body.firstname)
        res.send({
            message: req.body
        })
    })

}