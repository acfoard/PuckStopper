module.exports = function(connection, dataType) {
    const location = connection.define('location', {
        rinkName: dataType.STRING,
        rinkAddress: dataType.STRING,
        rinkCity: dataType.STRING,
        rinkState: dataType.STRING,
        rinkZip: dataType.INTEGER
    });

    location.associate = function(models) {
        location.hasMany(models.game, {
        });
      }; 

    return location;
}