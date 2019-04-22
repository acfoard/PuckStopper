module.exports = function (connection, dataType) {
    const game = connection.define('game', {
        startTime: dataType.DATE,
        homeNeedSub: dataType.BOOLEAN,
        homeSub: dataType.INTEGER,
        awayNeedSub: dataType.BOOLEAN,
        awaySub: dataType.INTEGER
    });

    game.associate = function (models) {
        game.hasOne(models.location, {
        });
    };

    game.associate = function (models) {
        game.belongsToMany(models.team, {
            through: 'teamGame'
        });
    };

    game.associate = function (models) {
        game.belongsToMany(models.user, {
            through: 'userGame'
        });
    };

    return game;
}