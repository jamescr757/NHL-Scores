import React from "react";
import Title from "./Title";
import { Grid } from "@material-ui/core";
import { HeroTeamLogo } from "./HeroTeamLogo";
import "./TeamTitle.css";


export const TeamTitle = ({ identifier, fullTeamName }) => {

    return (
        <Grid container justify="center" spacing={3}>
            <Grid item className="id-logo-container">
                <HeroTeamLogo 
                    identifier={identifier}
                    fullTeamName={fullTeamName}
                />
            </Grid>

            <Grid item className="hero-title-container">
                <Title responsive={true}>{fullTeamName}</Title>
            </Grid>

            <Grid item className="id-logo-container">
                <HeroTeamLogo 
                    identifier={identifier}
                    fullTeamName={fullTeamName}
                />
            </Grid>
        </Grid>
    );
}
