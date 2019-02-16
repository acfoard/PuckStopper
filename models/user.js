module.exports = function (connection, dataType) {
    const user = connection.define('user', {
        firstName: dataType.STRING,
        lastName: dataType.STRING,
        cellNumber: dataType.STRING,
        email: {
            type: dataType.STRING,
            key: {
                // needs to be unique
                type: dataType.UUID,
                allowNull: false,
                unique: true
            }
        },
        isGoalie: dataType.BOOLEAN,
        password: dataType.STRING,
    });

    user.associate = function (models) {
        user.belongsTo(models.team, {
        });
    };

    user.associate = function (models) {
        user.belongsToMany(models.game, {
            through: 'userGame'
        });
    };

    return user;
}