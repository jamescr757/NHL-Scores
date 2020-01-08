const axios = require("axios");
require("dotenv").config();
const moment = require("moment");

const baseQuery = `https://www.googleapis.com/youtube/v3/search?part=snippet&key=${process.env.GOOGLE_API_KEY}&maxResults=1&q=NHL%20highlights%20`

module.exports = {
    findHighlight: function(req, res) {

        const dateMonth = moment(req.params.date, "YYYYMMDD").format("MMM.");
        const dateDay = moment(req.params.date, "YYYYMMDD").format("D,");
        const dateYear = moment(req.params.date, "YYYYMMDD").format("YYYY");

        const query = baseQuery + req.params.teams + "%20" + dateMonth + "%20" + dateDay + "%20" + dateYear;

        console.log(query);

        axios.get(query)
            .then(response => {
                res.json(response.data.items)
            })
            .catch(err => {
                console.log(err);
                res.status(400)
            });
    }
};