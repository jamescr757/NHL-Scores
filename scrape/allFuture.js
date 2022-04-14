const axios = require("axios");
const cheerio = require("cheerio");
const moment = require("moment");
const teamInfo = require("./teamInfo");

module.exports = function scrapeAllFuture(db) {

    const nhlEndDate = moment("05/01/2022", "MM/DD/YYYY").format("YYYYMMDD");

    const today = moment().utcOffset(-7).format("YYYYMMDD");

    let futureDaysToScrape;
    
    futureDaysToScrape = moment(nhlEndDate).diff(moment(today), "days");
    
    for (let dayNum = 0; dayNum <= futureDaysToScrape; dayNum++) {
        
            const seasonDate = moment(today).add(dayNum, 'days').format("YYYYMMDD");
        
        axios.get(`https://www.espn.com/nhl/scoreboard/_/date/${seasonDate}`)
        .then(function(response) {

            const $ = cheerio.load(response.data);

            const teams = $(".Scoreboard").find(".ScoreCell__TeamName");

            const records = $(".Scoreboard").find("span.ScoreboardScoreCell__Record");

            for (teamIndex = 0; teamIndex < teams.length; teamIndex += 2) {

                const awayTeam = teams[teamIndex].children[0].data.toLowerCase();
                const awayID = teamInfo.teamIDGenerator(awayTeam);
                const awayDivision = teamInfo.teamDivisionGenerator(awayTeam);
                const awayConference = teamInfo.teamConferenceGenerator(awayTeam);

                const homeTeam = teams[teamIndex + 1].children[0].data.toLowerCase();
                const homeID = teamInfo.teamIDGenerator(homeTeam);
                const homeDivision = teamInfo.teamDivisionGenerator(homeTeam);
                const homeConference = teamInfo.teamConferenceGenerator(homeTeam);

                db.Future.create({

                    date: `${seasonDate}`,
                    gameId: `${seasonDate}${awayID}${homeID}`,
                    scoreline: `${awayTeam} @ ${homeTeam}`,
                    homeTeam,
                    homeTeamRecord: `${records[teamIndex + 1].children[0].data}`,
                    homeTeamDivision: homeDivision,
                    homeTeamConference: homeConference,
                    awayTeam,
                    awayTeamRecord: `${records[teamIndex].children[0].data}`,
                    awayTeamDivision: awayDivision,
                    awayTeamConference: awayConference,

                })
                    .catch((error) => console.log(error.message));

            }

        })
        .catch(error => {
            console.log(seasonDate);
            console.log(error.message)
        });

    }
}