const db = require("../models");
const Op = db.Sequelize.Op;
const teamInfo = require("../scrape/teamInfo");
const moment = require("moment");

// Defining methods for the booksController
module.exports = {
  findByDateAnyTeam: function(req, res) {
    db.Future
      .findAll({
          where: {
              date: req.params.date
          }
      })
      .then(games => res.json(games))
      .catch(err => res.status(422).json(err));
  },

  findGamesByTeam: function(req, res) {

    const team = teamInfo.teamNameDehyphenator(req.params.team);
    const startDate = moment().format("YYYYMMDD");
    const endDate = moment().add(req.params.days, "days").format("YYYYMMDD");

    db.Future
      .findAll({
          where: {
              
            [Op.or]: [{homeTeam: team}, {awayTeam: team}],

            date: {
              [Op.between]: [startDate, endDate]
            }

          },
          order: [[ "date", "ASC" ]]
      })
      .then(games => res.json(games))
      .catch(err => res.status(422).json(err));
  },

  findGamesByDivision: function(req, res) {

    const startDate = moment().format("YYYYMMDD");
    const endDate = moment().add(req.params.days, "days").format("YYYYMMDD");

    db.Future
      .findAll({
          where: {
            
            [Op.or]: [{homeTeamDivision: req.params.division}, {awayTeamDivision: req.params.division}],

            date: {
              [Op.between]: [startDate, endDate]
            }

          },
          order: [[ "date", "ASC" ]]
      })
      .then(scores => res.json(scores))
      .catch(err => {
        console.log(err);
        res.status(422).json(err)
      });
  },

  findGamesByConference: function(req, res) {

    const startDate = moment().format("YYYYMMDD");
    const endDate = moment().add(req.params.days, "days").format("YYYYMMDD");

    db.Future
      .findAll({
          where: {
            
            [Op.or]: [{homeTeamConference: req.params.conference}, {awayTeamConference: req.params.conference}],

            date: {
              [Op.between]: [startDate, endDate]
            }

          },
          order: [[ "date", "ASC" ]]
      })
      .then(scores => res.json(scores))
      .catch(err => {
        console.log(err);
        res.status(422).json(err)
      });
  }
};