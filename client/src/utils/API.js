import axios from "axios";
import moment from "moment";

export default {

  yesterday: moment().subtract(1, 'days').format("YYYYMMDD"),

  getYesterdayScores: function() {

    return axios.get(`/api/completed/date/${this.yesterday}`);
  },

  getScoresByDate: function(date) {

    if (date <= this.yesterday) {
      return axios.get(`/api/completed/date/${date}`);
    } else {
      return axios.get(`/api/future/date/${date}`);
    }
  },

  getScoresByTeam: function(team) {

    return axios.get(`/api/completed/team/${team}`);
  },

  getHighlight: function(teams, date) {
    
    return axios.get(`/api/highlight/${teams}/date/${date}`);
  }
};