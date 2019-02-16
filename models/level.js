module.exports = function(connection, dataType) {
    const level = connection.define('level', {
        name: dataType.STRING
    });

    level.associate = function(models) {
        level.hasMany(models.team);
    }

    return level;
}