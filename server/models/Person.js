module.exports = function(database, type) {
    return database.define('Person', {
        id: {
            type: type.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        firstname: type.STRING,
        lastname: type.STRING,
        address: type.STRING,
        age: type.INTEGER,
        picture: type.BLOB
    })
}