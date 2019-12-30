import React from "react";
import Container from "@material-ui/core/Container";
import { makeStyles } from '@material-ui/core/styles';
import Title from "./Title";
import SubHeading from "./SubHeading";
import HeroButtons from "./HeroButtons";
import ChangePage from "./ChangePage";
import Button from "@material-ui/core/Button";

const useStyles = makeStyles(theme => ({

    heroContent: {
      backgroundColor: theme.palette.background.paper,
      padding: theme.spacing(6, 0, 1),
    }

}));

export const DateHero = (props) => {
    const classes = useStyles();

    return (
        <div className={classes.heroContent}>
            <Container maxWidth="sm">
                <Title>
                    NHL Scores
                </Title>
                <SubHeading>
                    Scores and highlights from any date this season! Change the date by clicking the arrows.
                </SubHeading>
                <HeroButtons {...props}/>
            </Container>
            <ChangePage
                path="/multiple"
                justify="flex-start"
            >
                <Button>View Games Across Multiple Dates</Button>
            </ChangePage>
        </div>
    );
}