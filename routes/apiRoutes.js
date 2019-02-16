const db = require('../models');

module.exports = function (app) {

    //Create team
    app.post('/api/team', function(req, res) {
        db.team.create(req.body).then(function (data) {
            res.json(data)
        }).catch(function (error) {
            res.json({ error: error });
        });
    });

    //Gets all teams
    app.get('/api/team', function (req, res) {
        db.team.findAll({}).then(function (data) {
            res.json(data)
        }).catch(function (error) {
            res.json({ error: error });
        });
    });

    //Create Level
    app.post('/api/level', function(req, res) {
        db.level.create(req.body).then(function (data) {
            res.json(data)
        }).catch(function (error) {
            res.json({ error: error });
        });
    });

    //Get Levels
    app.get('/api/level', function (req, res) {
        db.level.findAll({}).then(function (data) {
            res.json(data)
        }).catch(function (error) {
            res.json({ error: error });
        });
    });
}