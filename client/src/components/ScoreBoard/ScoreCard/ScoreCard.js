import React, { useState } from "react";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import API from "../../../utils/API";
import GameAction from "./GameAction";
import TeamRow from "./TeamRow";
import HighlightModal from "./HighlightModal";
import "./ScoreCard.css"


const useStyles = makeStyles(theme => ({

    card: {
      height: '100%',
      display: 'flex',
      flexDirection: 'column',
    },
    cardContent: {
      flexGrow: 1,
    },

}));

const ScoreCard = (props) => {
    const classes = useStyles();

    const [open, setOpen] = useState(false);
    const [gameHighlight, setGameHighlight] = useState();

    const handleModalOpen = (teams, date) => {

        API.getHighlight(teams, date)
            .then((res) => {
                console.log("api response", res);
                setGameHighlight(res.data[0].id.videoId)
            })
            .catch(error => console.log(error));

        setOpen(true);
    }

    const handleModalClose = () => {
        setOpen(false);
    }

    const { awayTeam, homeTeam, loser, winner, homeTeamScore, awayTeamScore, homeTeamRecord, awayTeamRecord, date } = props.game;

    return (
        <React.Fragment>
            <Card className={classes.card}>
                <CardContent className={classes.cardContent}>
                    <Grid 
                        container 
                        direction="column" 
                        spacing={3}
                        >

                        <Grid 
                            item  
                            xs={12} 
                            container
                            justify="space-between"
                            >

                            <TeamRow 
                                team={awayTeam}
                                winner={winner}
                                loser={loser}
                                teamScore={awayTeamScore}
                                teamRecord={awayTeamRecord}
                                />
                            
                        </Grid>

                        <Grid 
                            item 
                            xs={12} 
                            container
                            justify="space-between"
                            >

                            <TeamRow 
                                team={homeTeam}
                                winner={winner}
                                loser={loser}
                                teamScore={homeTeamScore}
                                teamRecord={homeTeamRecord}
                                />

                        </Grid>

                    </Grid>
                </CardContent>

                <Grid 
                    container 
                    justify="center"
                    >
                    <CardActions>

                        <GameAction 
                            teamScore={homeTeamScore}
                            homeTeam={homeTeam}
                            awayTeam={awayTeam}
                            date={date}
                            handleModalOpen={handleModalOpen}
                            />

                    </CardActions>
                </Grid>
                
            </Card>

            <HighlightModal 
                open={open}
                onClose={handleModalClose}
                awayTeam={awayTeam}
                homeTeam={homeTeam}
                gameHighlight={gameHighlight}
                />
        </React.Fragment>
    );
}

export default ScoreCard;


// TODO: refactor this file into multiple components

// TODO: need full name for tickets and/or need to figure out the best query for seatgeek