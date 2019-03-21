const multer = require('multer')
const path = require('path')
const fs = require('fs')

//Define the disk storage and default filename for file uploads in multer
const storage = multer.diskStorage({
    destination: './src/assets/',
    filename: function(req, file, callback) {
      callback(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname))
    }
  })

//Instantiate multer
const upload = multer({
    storage: storage
})

module.exports = upload