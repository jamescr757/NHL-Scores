const axios = require("axios");
const cheerio = require("cheerio");
const moment = require("moment");

function recordStripper(record) {

    const firstHyphen = record.indexOf("-");
    const secondHyphen = record.indexOf("-", 3);

    const wins = parseInt(record.slice(0, firstHyphen));
    const losses = parseInt(record.slice(firstHyphen + 1, secondHyphen));
    const ot = parseInt(record.slice(secondHyphen + 1));

    const gamesPlayed = wins + losses + ot;
    const points = wins * 2 + ot;

    return {
        record,
        wins,
        losses,
        ot,
        gamesPlayed,
        points
    }
}

module.exports = function updateRecords(db) {

    const nhlEndDate = moment("05/01/2022", "MM/DD/YYYY").format("YYYYMMDD");

    const today = moment().utcOffset(-7).format("YYYYMMDD");

    const futureDaysToScrape = moment(nhlEndDate).diff(moment(today), "days") > 30 ? 30 : moment(nhlEndDate).diff(moment(today), "days");
    
    for (let dayNum = 0; dayNum <= futureDaysToScrape; dayNum++) {
        
            const seasonDate = moment(today).add(dayNum, 'days').format("YYYYMMDD");
        
        axios.get(`https://www.espn.com/nhl/scoreboard/_/date/${seasonDate}`)
        .then(function(response) {

            const $ = cheerio.load(response.data);

            const teams = $(".Scoreboard").find(".ScoreCell__TeamName");

            const records = $(".Scoreboard").find("span.ScoreboardScoreCell__Record");

            for (teamIndex = 0; teamIndex < teams.length; teamIndex += 2) {

                const awayTeam = teams[teamIndex].children[0].data.toLowerCase();
                const homeTeam = teams[teamIndex + 1].children[0].data.toLowerCase();
                const homeTeamRecord = records[teamIndex + 1].children[0].data;
                const standingsObj = recordStripper(homeTeamRecord);

                db.Future.update({

                    homeTeamRecord,

                }, {
                    where: {
                        homeTeam,
                    }
                })
                    .catch((error) => console.log(error.message));


                db.Future.update({

                    awayTeamRecord: `${records[teamIndex].children[0].data}`,

                }, {
                    where: {
                        awayTeam,
                    }
                })
                    .catch((error) => console.log(error.message));

                db.Standings.update(standingsObj, {

                    where: {
                        team: homeTeam
                    }

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