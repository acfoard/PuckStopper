const bcrypt = require('bcrypt');
require('dotenv').config();
const db = require('../models/');
const jwt = require('jsonwebtoken');
checkAuth = require('../check-auth');

module.exports = function (app) {

  //Create team
  app.post('/api/team', function (req, res) {
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
  app.post('/api/level', function (req, res) {
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

  app.get('/api/user', function (req, res) {
    db.user.findAll({}).then(function (users) {
      res.json(users);
    }).catch(function (err) {
      res.json(err);
    });
  })

  app.post('/api/user', (req, res, next) => {
    bcrypt.hash(req.body.password, 10, (err, hash) => {
      if (err) {
        return res.status(500).json({
          error: err
        });
      } else {
        const user = {
          email: req.body.email,
          password: hash,
          firstName: req.body.firstName,
          lastName: req.body.lastName,
          cellNumber: req.body.cellNumber,
          isGoalie: req.body.isGoalie,
          teamId: req.body.teamId
        }
        db.user.create(user)
          .then(function (dbUser) {
            res.json(dbUser);
          })
          .catch(err => {
            console.log(err);
            res.status(500).json({
              error: err
            });
          });
      }
    });
  });

  app.post('/api/login', (req, res, next) => {
    db.user.findOne({ where: { email: req.body.email } })
      .then(dbUser => {
        if (!dbUser) {
          res.status(401).json({
            message: 'Auth failed'
          });
        }
        bcrypt.compare(req.body.password, dbUser.password, (err, result) => {
          if (err) {
            res.status(401).json({
              message: 'Auth failed'
            });
          }
          if (result) {
            console.log(dbUser.dataValues.id);
            const token = jwt.sign({
              sub: dbUser.dataValues.id
            },
              process.env.JWT_KEY,
              {
                expiresIn: "1hr"
              })
            return res.status(200).json({
              message: 'Auth successful',
              token: token
            });
          }
          res.status(401).json({
            message: 'Auth failed'
          })
        })
      })
      .catch(err => {
        console.log(err);
        res.status(500).json({
          error: err
        });
      });
  })

  //Get User by Id
  app.post('/api/users', checkAuth, (req, res) => {
    console.log("hello ", req.body.userId);
    res.json("hi");
  })

  //Create Game
  app.post('/api/game', (req, res) => {
    db.game.create(req.body).then((res) => {
      res.json(res);
    }).catch( err => {
      res.json(err);
    })
  })
}