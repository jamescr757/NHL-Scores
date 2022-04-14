
export default {
    
    teamsArray: ["bruins", "sabres", "red wings", "panthers", "canadiens", "senators", "lightning", "maple leafs", "hurricanes", "blue jackets", "devils", "islanders", "rangers", "flyers", "penguins", "capitals", "coyotes", "blackhawks", "avalanche", "stars", "wild", "predators", "blues", "jets", "ducks", "flames", "oilers", "kings", "sharks", "kraken", "canucks", "golden knights"],

    teamIDGenerator(teamName) {
        return this.teamsArray.indexOf(teamName);
    },

    teamDivisionGenerator(teamName) {
        const teamIndex = this.teamIDGenerator(teamName);

        if (teamIndex <= 7 && teamIndex > 0) return "Atlantic";

        else if (teamIndex <= 15 && teamIndex > 0) return "Metropolitan";

        else if (teamIndex <= 23 && teamIndex > 0) return "Central";

        else if (teamIndex > 0) return "Pacific";

        else return false;
    },

    teamConferenceGenerator(teamName) {
        const teamIndex = this.teamIDGenerator(teamName);

        if (teamIndex <= 15) return "Eastern";

        else return "Western";
    },

    teamNameConverter(teamName) {
        return teamName.replace(/\s/g, "-")
    },

    teamNameDehyphenator(teamName) {
        return teamName.replace(/-/g, " ")
    },

    teamNameDePlus(teamName) {
        return teamName.replace(/\+/g, " ")
    },

    teamNameJoiner5 (homeTeam, awayTeam) {
        const homeTeamModified = homeTeam.replace(/\s/g, "+");
        const awayTeamModified = awayTeam.replace(/\s/g, "+");
        return awayTeamModified + "+vs+" + homeTeamModified;
    },

    teamNameJoiner9 (homeTeam, awayTeam) {
        const homeTeamModified = homeTeam.replace(/\s/g, "+");
        const awayTeamModified = awayTeam.replace(/\s/g, "+");
        return awayTeamModified + "+@+" + homeTeamModified;
    },

    teamFullName (team) {

        switch (team) {
            case "bruins":
                return "boston bruins"
            case "sabres":
                return "buffalo sabres"
            case "red wings":
                return "detroit red wings"
            case "panthers":
                return "florida panthers"
            case "canadiens":
                return "montreal canadiens"
            case "senators":
                return "ottawa senators"
            case "lightning":
                return "tampa bay lightning"
            case "maple leafs":
                return "toronto maple leafs"
            case "hurricanes":
                return "carolina hurricanes"
            case "blue jackets":
                return "columbus blue jackets"
            case "devils":
                return "new jersey devils"
            case "islanders":
                return "new york islanders"
            case "rangers":
                return "new york rangers"
            case "flyers":
                return "philadelphia flyers"
            case "penguins":
                return "pittsburgh penguins"
            case "capitals":
                return "washington capitals"
            case "blackhawks":
                return "chicago blackhawks"
            case "avalanche":
                return "colorado avalanche"
            case "stars":
                return "dallas stars"
            case "wild":
                return "minnesota wild"
            case "predators":
                return "nashville predators"
            case "blues":
                return "st. louis blues"
            case "jets":
                return "winnipeg jets"
            case "ducks":
                return "anaheim ducks"
            case "coyotes":
                return "arizona coyotes"
            case "flames":
                return "calgary flames"
            case "oilers":
                return "edmonton oilers"
            case "kraken":
                return "seattle kraken"
            case "golden knights":
                return "vegas golden knights"
            case "kings":
                return "los angeles kings"
            case "sharks":
                return "san jose sharks"
            case "canucks":
                return "vancouver canucks"
            default:
                return;
            
        }
    },

    teamFullNameCaptilized (team) {

        switch (team) {
            case "bruins":
                return "Boston Bruins"
            case "sabres":
                return "Buffalo Sabres"
            case "red wings":
                return "Detroit Red Wings"
            case "panthers":
                return "Florida Panthers"
            case "canadiens":
                return "Montreal Canadiens"
            case "senators":
                return "Ottawa Senators"
            case "lightning":
                return "Tampa Bay Lightning"
            case "maple leafs":
                return "Toronto Maple Leafs"
            case "hurricanes":
                return "Carolina Hurricanes"
            case "blue jackets":
                return "Columbus Blue Jackets"
            case "devils":
                return "New Jersey Devils"
            case "islanders":
                return "New York Islanders"
            case "rangers":
                return "New York Rangers"
            case "flyers":
                return "Philadelphia Flyers"
            case "penguins":
                return "Pittsburgh Penguins"
            case "capitals":
                return "Washington Capitals"
            case "blackhawks":
                return "Chicago Blackhawks"
            case "avalanche":
                return "Colorado Avalanche"
            case "stars":
                return "Dallas Stars"
            case "wild":
                return "Minnesota Wild"
            case "predators":
                return "Nashville Predators"
            case "blues":
                return "St. Louis Blues"
            case "jets":
                return "Winnipeg Jets"
            case "ducks":
                return "Anaheim Ducks"
            case "coyotes":
                return "Arizona Coyotes"
            case "flames":
                return "Calgary Flames"
            case "oilers":
                return "Edmonton Oilers"
            case "kraken":
                return "Seattle Kraken"
            case "golden knights":
                return "Vegas Golden Knights"
            case "kings":
                return "Los Angeles Kings"
            case "sharks":
                return "San Jose Sharks"
            case "canucks":
                return "Vancouver Canucks"
            default:
                return;
            
        }
    },

    teamCityNameCaptilized (team) {

        switch (team) {
            case "bruins":
                return "Boston"
            case "sabres":
                return "Buffalo"
            case "red wings":
                return "Detroit"
            case "panthers":
                return "Florida"
            case "canadiens":
                return "Montreal"
            case "senators":
                return "Ottawa"
            case "lightning":
                return "Tampa Bay"
            case "maple leafs":
                return "Toronto"
            case "hurricanes":
                return "Carolina"
            case "blue jackets":
                return "Columbus"
            case "devils":
                return "New Jersey"
            case "islanders":
                return "New York"
            case "rangers":
                return "New York"
            case "flyers":
                return "Philadelphia"
            case "penguins":
                return "Pittsburgh"
            case "capitals":
                return "Washington"
            case "blackhawks":
                return "Chicago"
            case "avalanche":
                return "Colorado"
            case "stars":
                return "Dallas"
            case "wild":
                return "Minnesota"
            case "predators":
                return "Nashville"
            case "blues":
                return "St. Louis"
            case "jets":
                return "Winnipeg"
            case "ducks":
                return "Anaheim"
            case "coyotes":
                return "Arizona"
            case "flames":
                return "Calgary"
            case "oilers":
                return "Edmonton"
            case "kraken":
                return "Seattle"
            case "golden knights":
                return "Vegas"
            case "kings":
                return "Los Angeles"
            case "sharks":
                return "San Jose"
            case "canucks":
                return "Vancouver"
            default:
                return;
            
        }
    },

    teamName3Letters (team) {

        switch (team) {
            case "bruins":
                return "BOS"
            case "sabres":
                return "BUF"
            case "red wings":
                return "DET"
            case "panthers":
                return "FLA"
            case "canadiens":
                return "MTL"
            case "senators":
                return "OTT"
            case "lightning":
                return "TBL"
            case "maple leafs":
                return "TOR"
            case "hurricanes":
                return "CAR"
            case "blue jackets":
                return "CBJ"
            case "devils":
                return "NJD"
            case "islanders":
                return "NYI"
            case "rangers":
                return "NYR"
            case "flyers":
                return "PHI"
            case "penguins":
                return "PIT"
            case "capitals":
                return "WSH"
            case "blackhawks":
                return "CHI"
            case "avalanche":
                return "COL"
            case "stars":
                return "DAL"
            case "wild":
                return "MIN"
            case "predators":
                return "NSH"
            case "blues":
                return "STL"
            case "jets":
                return "WPG"
            case "ducks":
                return "ANA"
            case "coyotes":
                return "ARI"
            case "flames":
                return "CGY"
            case "oilers":
                return "EDM"
            case "kraken":
                return "SEA"
            case "golden knights":
                return "VGK"
            case "kings":
                return "LAK"
            case "sharks":
                return "SJS"
            case "canucks":
                return "VAN"
            default:
                return;
            
        }
    },

    teamShortName (team) {

        switch (team) {
            case "boston bruins":
                return "bruins"
            case "buffalo sabres":
                return "sabres"
            case "detroit red wings":
                return "red wings"
            case "florida panthers":
                return "panthers"
            case "montreal canadiens":
                return "canadiens"
            case "ottawa senators":
                return "senators"
            case "tampa bay lightning":
                return "lightning"
            case "toronto maple leafs":
                return "maple leafs"
            case "carolina hurricanes":
                return "hurricanes"
            case "columbus blue jackets":
                return "blue jackets"
            case "new jersey devils":
                return "devils"
            case "new york islanders":
                return "islanders"
            case "new york rangers":
                return "rangers"
            case "philadelphia flyers":
                return "flyers"
            case "pittsburgh penguins":
                return "penguins"
            case "washington capitals":
                return "capitals"
            case "chicago blackhawks":
                return "blackhawks"
            case "colorado avalanche":
                return "avalanche"
            case "dallas stars":
                return "stars"
            case "minnesota wild":
                return "wild"
            case "nashville predators":
                return "predators"
            case "st. louis blues":
                return "blues"
            case "winnipeg jets":
                return "jets"
            case "anaheim ducks":
                return "ducks"
            case "arizona coyotes":
                return "coyotes"
            case "calgary flames":
                return "flames"
            case "edmonton oilers":
                return "oilers"
            case "seattle kraken":
                return "kraken"
            case "vegas golden knights":
                return "golden knights"
            case "los angeles kings":
                return "kings"
            case "san jose sharks":
                return "sharks"
            case "vancouver canucks":
                return "canucks"
            default:
                return;
            
        }
    }
}



