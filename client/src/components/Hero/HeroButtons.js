import React from "react";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from '@material-ui/core/styles';
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import DatePick from "./DatePicker";

const useStyles = makeStyles(theme => ({

    heroButtons: {
        marginTop: theme.spacing(4),
    },
    arrow: {
        cursor: "pointer"
    }

  }));

const HeroButtons = (props) => {
    const classes = useStyles();

    return (
        <div className={classes.heroButtons}>
            <Grid container spacing={2} justify="center">
                <Grid item style={{ padding: "8px 0px"}}>

                    <div onClick={props.onBackClick}>
                        <ArrowBackIosIcon className={classes.arrow} />
                    </div>

                </Grid>
                <Grid item container justify="center" style={{ maxWidth: 270, padding: 4 }}>
                    {/* <Typography className={classes.date} variant="h4" color="textPrimary" align="center"> */}
                        <span style={{ fontSize: 24, paddingTop: 1.5, width: 70, textAlign: "right", cursor: "default", marginRight: 4 }}>{props.dateDay}</span>
                        <DatePick {...props} />
                    {/* </Typography> */}
                </Grid>
                <Grid item style={{ padding: "8px 0px"}}>

                    <div onClick={props.onForwardClick}>
                        <ArrowForwardIosIcon className={classes.arrow} />
                    </div>

                </Grid>
            </Grid>
        </div>
    );
}

export default HeroButtons;