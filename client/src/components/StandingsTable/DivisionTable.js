import React from "react";
import Grid from "@material-ui/core/Grid";
import Container from "@material-ui/core/Container";
import API from "../../utils/API";
import { makeStyles } from "@material-ui/core/styles";
import { useState, useEffect } from "react";
import { Typography, Card, CardContent } from "@material-ui/core";
import { Link } from "react-router-dom";
import teamInfo from "../../utils/teamInfo";
import "./Standings.css"
import { ParamsContext } from "../../utils/ParamsContext";


const useStyles = makeStyles(theme => ({

    cardGrid: {
      paddingTop: theme.spacing(2),
      paddingBottom: theme.spacing(4),
      minHeight: "60vh"
    },
    noGames: {
        textAlign: "center"
    },
    card: {
        height: '100%'
    },

}));

const DivisionTable = (props) => {
    
    const classes = useStyles();

    const [records, setRecords] = useState([]);

    const { order } = React.useContext(ParamsContext);

    useEffect(() => {
        
        API.getRecords("division")
            .then(res => {
                if (res.data === "error") {
                    console.log("there's been a db error");
                }

                setRecords(res.data);
                
            })
            .catch(error => {
                console.log(error);
                console.log("there's been an error retrieving the standings");
            })

    }, [order]);

    const renderCategoryRow = (title) => {
        return (
             <Grid 
                 item  
                 xs={12} 
                 className="pt-4 standings-page-divider-row"
             >
                 <Card className="border-bottom border-dark standings-page-category-row">
                     <CardContent className="py-0 px-1 px-sm-3">
                         <Grid container alignItems="center" >
                             <Grid item xs={3} sm={7}>
                                 <Typography variant="h6" gutterBottom={false} className="standings-category-row-mobile">
                                    <Link to={`/multiple/division/completed/${title !== "Metro" ? title : "Metropolitan"}/3/all/all/false/false/desc`} className="standings-page-division-link">
                                        {title}
                                    </Link>
                                 </Typography>
                             </Grid>
                             <Grid item xs={2} sm={1}>
                                 <Typography variant="h6" gutterBottom={false} className="standings-category-row-mobile">
                                     GP
                                 </Typography>
                             </Grid>
                             <Grid item xs={2} sm={1}>
                                 <Typography variant="h6" gutterBottom={false} className="standings-category-row-mobile">
                                     PTS
                                 </Typography>
                             </Grid>
                             <Grid item xs={2} sm={1}>
                                 <Typography variant="h6" gutterBottom={false} className="standings-category-row-mobile">
                                     W
                                 </Typography>
                             </Grid>
                             <Grid item xs={2} sm={1}>
                                 <Typography variant="h6" gutterBottom={false} className="standings-category-row-mobile">
                                     L
                                 </Typography>
                             </Grid>
                             <Grid item xs={1}>
                                 <Typography variant="h6" gutterBottom={false} className="standings-category-row-mobile">
                                     OT
                                 </Typography>
                             </Grid>
                         </Grid>
                     </CardContent>
                 </Card>   
             </Grid>
        ) 
     }

    const renderConferenceRow = (title, bool) => {
        return (
             <Grid 
                 item  
                 xs={12} 
                 className={bool ? "mt-5 py-2 py-sm-3 wildcard-page-conference-row px-1 px-sm-3" : "mt-2 py-2 py-sm-3 wildcard-page-conference-row px-1 px-sm-3"}
             >
                <Typography variant="h6" gutterBottom={false} className="mobile-conference-row-text">
                    <Link to={`/multiple/conference/completed/${title.length > 8 ? title.slice(0, 7) : title}/3/all/all/false/false/desc`} className="standings-page-conference-link">
                        {title}
                    </Link>
                </Typography> 
            </Grid> 
        ) 
     }

    const renderTeamRow = (entry, index, bool) => {
        return (
            <Grid 
                item 
                key={index} 
                xs={12} 
                className="standings-page-team-row"
            >
                <Card className={index === 1 && bool ? "standings-page-team-row wildcard-end-row" : "border-bottom border-dark standings-page-team-row"}>
                    <CardContent className="py-0 px-1 px-sm-3">
                        <Grid container alignItems="center">
                            <Grid item xs={3} sm={7}>
                                <Typography variant="h6" gutterBottom={false} className="standings-team-row-mobile">
                                    {index + 1}
                                    {`  `}
                                    <img 
                                        className="standings-page-logo"
                                        src={`${process.env.PUBLIC_URL}/images/${teamInfo.teamNameConverter(entry.team)}.png`}
                                        alt={teamInfo.teamFullName(entry.team)}  
                                    />
                                    {`  `}
                                    <Link to={`/multiple/team/completed/${teamInfo.teamNameConverter(entry.team)}/7/all/all/false/false/desc`} className="standings-page-team-link"> 
                                        {window.innerWidth < 600 ? teamInfo.teamName3Letters(entry.team) : teamInfo.teamFullNameCaptilized(entry.team)}
                                    </Link>
                                </Typography>
                            </Grid>
                            <Grid item xs={2} sm={1}>
                                <Typography variant="h6" gutterBottom={false} className="standings-team-row-mobile">
                                    {entry.gamesPlayed}
                                </Typography>
                            </Grid>
                            <Grid item xs={2} sm={1}>
                                <Typography variant="h6" gutterBottom={false} className="standings-team-row-mobile">
                                    {entry.points}
                                </Typography>
                            </Grid>
                            <Grid item xs={2} sm={1}>
                                <Typography variant="h6" gutterBottom={false} className="standings-team-row-mobile">
                                    {entry.wins}
                                </Typography>
                            </Grid>
                            <Grid item xs={2} sm={1}>
                                <Typography variant="h6" gutterBottom={false} className="standings-team-row-mobile">
                                    {entry.losses}
                                </Typography>
                            </Grid>
                            <Grid item xs={1}>
                                <Typography variant="h6" gutterBottom={false} className="standings-team-row-mobile">
                                    {entry.ot}
                                </Typography>
                            </Grid>
                        </Grid>
                    </CardContent>
                </Card>   
            </Grid>
        ) 
     }

    return (
        <Container className={classes.cardGrid + " px-1 px-sm-3"} maxWidth="md">
            <Grid container spacing={0} direction="column">
                {records.length > 0 && renderConferenceRow("Eastern Conference", false)}
                {records.length > 0 && renderCategoryRow("Atlantic")}
                {records.slice(0, 8).map((entry, index) => (
                    renderTeamRow(entry, index, false)
                ))}
                {window.innerWidth < 600 && records.length > 0 && renderCategoryRow("Metro")}
                {window.innerWidth > 600 && records.length > 0 && renderCategoryRow("Metropolitan")}
                {records.slice(8, 16).map((entry, index) => (
                    renderTeamRow(entry, index, false)
                ))}
                {records.length > 0 && renderConferenceRow("Western Conference", true)}
                {records.length > 0 && renderCategoryRow("Central")} 
                {records.slice(16, 24).map((entry, index) => (
                    renderTeamRow(entry, index, false)
                ))}
                {records.length > 0 && renderCategoryRow("Pacific")}
                {records.slice(24).map((entry, index) => (
                    renderTeamRow(entry, index, false)
                ))}
            </Grid>
        </Container>
    );
}

export default DivisionTable;