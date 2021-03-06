const moment = require("moment");

module.exports = function deleteFuture(db) {

    const yesterday = moment().utcOffset(-7).subtract(1, 'days').format("YYYYMMDD");

    let closestDate;
    db.Future.findAll({
        limit: 1,
        where: {},
        order: [[ "date", "ASC" ]]
    })
    .then(data => {
        closestDate = moment(data[0].dataValues.date, "YYYYMMDD").format("YYYYMMDD");

        if (closestDate <= yesterday) {
            daysToDelete = moment(yesterday).diff(moment(closestDate), "days") + 1;
        } else {
            daysToDelete = 0;
        }

        for (let dayNum = 0; dayNum < daysToDelete; dayNum++) {

            const deleteDate = moment(closestDate).add(dayNum, 'days').format("YYYYMMDD");

            db.Future.destroy({
                where: {
                    date: deleteDate
                }
            })
            .catch(error => console.log(error.message));
        }
    })
    .catch(error => console.log(error.message));

}