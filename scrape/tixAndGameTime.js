const axios = require("axios");
const cheerio = require("cheerio");
const teamInfo = require("./teamInfo");
const moment = require("moment");

module.exports = function scrapeTixAndGameTimes(db, eventStartNum = 0) {

    const Op = db.Sequelize.Op;

    teamInfo.teamsArray.forEach((team, index) => {

        const fullTeamName = teamInfo.teamFullName(team);
        const timezoneDiff = teamInfo.timeZoneDiff(team);

        axios.get(`https://seatgeek.com/${teamInfo.teamNameConverter(fullTeamName)}-tickets?oq=${teamInfo.teamNameAddPlus(fullTeamName)}+tickets`)
            .then(function(response) {

                const $ = cheerio.load(response.data);

                const mainUl = $(".DesktopList__DesktopEventList-x601w9-0");
                const numEvents = mainUl["0"].children.length;

                for (let i = eventStartNum; i < numEvents; i++) {

                    const gameDate = mainUl["0"].children[i].children[0].children[1].children[0].children[0].children[0].data;
                    const dbDate = "2022" + moment(gameDate, "MMM D").format("MMDD");

                    const gameTime = mainUl["0"].children[i].children[0].children[1].children[0].children[1].children[0].data.slice(6);
                    const dbGameTime = moment(gameTime, "h:mm a").add(timezoneDiff, "hours").format("h:mm a");

                    db.Future
                        .update({
                            ticketLink: mainUl["0"].children[i].children[0].attribs.href,
                            gameTime: dbGameTime
                        }, {
                            where: {
                                date: dbDate,
                                homeTeam: team,
                                gameTime: {
                                    [Op.is]: null 
                                }
                            }
                        })
                }

            })
            .catch(error => console.log(error));

    })

}