module.exports = function(database, type) {
    return database.define('Interest', {
        id: {
            type: type.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        description: type.STRING
    })
}