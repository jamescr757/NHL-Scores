import React from "react";
import Grid from "@material-ui/core/Grid";
import ScoreCard from "./ScoreCard";
import Container from "@material-ui/core/Container";
import API from "../../utils/API";
import { makeStyles } from "@material-ui/core/styles";
import { useState, useEffect } from "react";
import { Typography } from "@material-ui/core";
import Box from '@material-ui/core/Box';

const useStyles = makeStyles(theme => ({

    cardGrid: {
      paddingTop: theme.spacing(4),
      paddingBottom: theme.spacing(4),
      minHeight: 500
    },
    noGames: {
        textAlign: "center"
    }

}));

const DivisionScoreBoard = (props) => {
    
    const classes = useStyles();

    const [gameInfo, setGameInfo] = useState([]);

    const { division, table, days, rival, ot } = props.match.params

    useEffect(() => {

        if (table === "completed") {
            API.getScoresByDivision(division, days, rival, ot)
            .then(response => {
                setGameInfo(response.data);
            })
            .catch(error => {
                console.log("error getting scores");
                console.log(error.message);
            })
        }
        else {
            API.getFutureGamesByDivision(division, days, rival)
            .then(response => {
                setGameInfo(response.data);
            })
            .catch(error => {
                console.log("error getting scores");
                console.log(error.message);
            })
        }
        
    }, [division, table, days, rival, ot])  

    const renderNoGames = () => {
        if (gameInfo.length === 0) {
            return (
                <Box width="100%">
                    <Typography
                        component="h2"
                        color="textPrimary"
                        className={classes.noGames}
                    >
                        There are no games that match the specified filters.
                    </Typography>
                </Box>
            );
        }
    }

    return (
        <Container className={classes.cardGrid} maxWidth="lg">
            <Grid container spacing={4}>
                {gameInfo.map((game, index) => (
                <Grid 
                    item 
                    key={index} 
                    xs={12} 
                    sm={6} 
                    md={4}
                    lg={4}
                >
                    <ScoreCard 
                        date={true}
                        game={{...game}}
                    />
                </Grid>
                ))}
                {renderNoGames()}
            </Grid>
        </Container>
    );
}

export default DivisionScoreBoard;