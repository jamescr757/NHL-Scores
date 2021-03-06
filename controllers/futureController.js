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

  findGamesByCategory: function(req, res) {

    const { category, days, identifier, location, rival, sort } = req.params;

    const searchTeam = teamInfo.teamNameDehyphenator(identifier);

    const startDate = moment().utcOffset(-7).format("YYYYMMDD");
    const endDate = moment().utcOffset(-7).add(days, "days").format("YYYYMMDD");

    const whereObj = { date: { [Op.between]: [startDate, endDate] } };

    switch (location) {
      case "home":
        whereObj.homeTeam = searchTeam;
        break;
      case "away":
        whereObj.awayTeam = searchTeam;
        break;
      default: 
        break;
    }

    switch (category) {
      case "division":
        whereObj[Op.or] = [{homeTeamDivision: identifier}, {awayTeamDivision: identifier}]
        break;
      case "team":
        whereObj[Op.or] =  [{homeTeam: searchTeam}, {awayTeam: searchTeam}];
        break;
      default: 
        identifier === "All Teams" ? "" : whereObj[Op.or] = [{homeTeamConference: identifier}, {awayTeamConference: identifier}]
        break;
    }

    switch (rival) {
      case "true":
        whereObj.homeTeamDivision = teamInfo.teamDivisionGenerator(searchTeam) || identifier;
        whereObj.awayTeamDivision = teamInfo.teamDivisionGenerator(searchTeam) || identifier;
        break;
      default: 
        break;
    }

    db.Future
      .findAll({
          where: whereObj,
          order: [[ "date", sort.toUpperCase() ]]
      })
      .then(scores => res.json(scores))
      .catch(err => {
        console.log(err);
        res.status(422).json(err)
      });
  },

  findUserGames: function(req, res) {

    const { days, sort } = req.params;

    const startDate = moment().utcOffset(-7).format("YYYYMMDD");
    const endDate = moment().utcOffset(-7).add(days, "days").format("YYYYMMDD");

    const whereObj = { date: { [Op.between]: [startDate, endDate] } };
    whereObj[Op.or] = [];

    req.body.idArr.forEach(id => {

      switch (id) {
        case "All Teams":
          break;
        case "Atlantic":
        case "Metropolitan":
        case "Central":
        case "Pacific":
          whereObj[Op.or].push({homeTeamDivision: id}, {awayTeamDivision: id})
          break;
        case "Eastern":
        case "Western":
          whereObj[Op.or].push({homeTeamConference: id}, {awayTeamConference: id});
          break;
        default:
          whereObj[Op.or].push({homeTeam: id}, {awayTeam: id});
          break;
      }

    })

    db.Future
      .findAll({
          where: whereObj,
          order: [[ "date", sort.toUpperCase() ]]
      })
      .then(scores => res.json(scores))
      .catch(err => {
        console.log(err);
        res.status(422).json(err)
      });
  }
};