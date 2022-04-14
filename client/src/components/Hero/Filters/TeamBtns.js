import React, { useContext } from "react";
import Grid from "@material-ui/core/Grid";
import { makeStyles } from '@material-ui/core/styles';
import teamInfo from "../../../utils/teamInfo";
import { DropdownItem } from "reactstrap";
import { Link } from "react-router-dom";
import { ParamsContext } from "../../../utils/ParamsContext";
import "./Button.css"

const useStyles = makeStyles(theme => ({

    teamLogo: {
      height: 24,
      width: "auto",
      marginBottom: 4,
      marginRight: 4
    }

}));

const TeamBtns = (props) => {
    const classes = useStyles();

    const params = useContext(ParamsContext);

    const atlanticTeams = teamInfo.teamsArray.slice(0, 8);
    const metroTeams = teamInfo.teamsArray.slice(8, 16);
    const centralTeams = teamInfo.teamsArray.slice(16, 24);
    const pacificTeams = teamInfo.teamsArray.slice(24);

    const toLogic = (team) => {
        
        if (props.category && params.table === "completed") {
            return `/multiple/team/completed/${teamInfo.teamNameConverter(team)}/${params.days}/${params.location}/${params.outcome}/${params.rival}/${params.ot}/desc`;
        } else if (props.category && params.table === "future") {
            return `/multiple/team/future/${teamInfo.teamNameConverter(team)}/${params.days}/${params.location}/${params.outcome}/${params.rival}/${params.ot}/asc`;
        } else {
            return `/multiple/team/completed/${teamInfo.teamNameConverter(team)}/7/all/all/false/false/desc`;
        }
    }

    return (
        <Grid container spacing={1} justify="space-evenly">
            <Grid item container md={3} xs={12} sm={6} direction="column" justify="flex-start" spacing={1} className="mb-3">

                {atlanticTeams.map((team, index) => {
                    return (
                        <Grid item key={index}>
                            <Link
                                to={toLogic(team)}
                                className="btn-link"
                            >
                                <DropdownItem 
                                    className="team-dropdown-item"
                                >
                                    <img 
                                        className={classes.teamLogo}
                                        src={`${process.env.PUBLIC_URL}/images/${teamInfo.teamNameConverter(team)}.png`}
                                        alt={team}  
                                    />
                                    {teamInfo.teamFullName(team)}
                                </DropdownItem>
                            </Link>
                        </Grid>
                    );
                })}

            </Grid>
            <Grid item container xs={12} sm={6} md={3} direction="column" justify="flex-start" spacing={2}>
                
                {metroTeams.map((team, index) => {
                    return (
                        <Grid item key={index} container spacing={1} className={index === metroTeams.length - 1 ? "mb-3" : ""}>
                            <Link
                                to={toLogic(team)} 
                                className="btn-link"
                            >
                                <DropdownItem 
                                    className="team-dropdown-item"
                                >
                                    <img 
                                        className={classes.teamLogo}
                                        src={`${process.env.PUBLIC_URL}/images/${teamInfo.teamNameConverter(team)}.png`}
                                        alt={team}  
                                    />
                                    {teamInfo.teamFullName(team)}
                                </DropdownItem>
                            </Link>
                        </Grid>
                    );
                })}

            </Grid>
            <Grid item container xs={12} sm={6} md={3} direction="column" justify="flex-start" spacing={2}>

                {centralTeams.map((team, index) => {
                    return (
                        <Grid item key={index} container spacing={1} className={index === centralTeams.length - 1 ? "mb-3" : ""}>
                            <Link
                                to={toLogic(team)} 
                                className="btn-link"
                            >
                                <DropdownItem 
                                    className="team-dropdown-item"
                                >
                                    <img 
                                        className={classes.teamLogo}
                                        src={`${process.env.PUBLIC_URL}/images/${teamInfo.teamNameConverter(team)}.png`}
                                        alt={team}  
                                    />
                                    {teamInfo.teamFullName(team)}
                                </DropdownItem>
                            </Link>
                        </Grid>
                    );
                })}

            </Grid>
            <Grid item container xs={12} sm={6} md={3} direction="column" justify="flex-start" spacing={2}>
            
                {pacificTeams.map((team, index) => {
                    return (
                        <Grid item key={index} container spacing={1}>
                            <Link
                                to={toLogic(team)} 
                                className="btn-link"
                            >
                                <DropdownItem 
                                    className="team-dropdown-item"
                                >
                                    <img 
                                        className={classes.teamLogo}
                                        src={`${process.env.PUBLIC_URL}/images/${teamInfo.teamNameConverter(team)}.png`}
                                        alt={team}  
                                    />
                                    {teamInfo.teamFullName(team)}
                                </DropdownItem>
                            </Link>
                        </Grid>
                    );
                })}

            </Grid>
        </Grid>
    );
}

export default TeamBtns;