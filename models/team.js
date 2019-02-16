module.exports = function(connection, dataType) {
    const team = connection.define('team', {
        teamName: dataType.STRING,
    });

    team.associate = function(models) {
        team.belongsToMany(models.game, {
            through: 'teamGame'
        });
      };  

      team.associate = function(models) {
          team.belongsTo(models.level);
      };

    return team;
};