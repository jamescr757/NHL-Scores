import React from "react";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(theme => ({
   
    footer: {
      backgroundColor: theme.palette.background.paper,
      padding: theme.spacing(3),
    }

}));

const Footer = () => {
    const classes = useStyles();

    return (
        <footer className={classes.footer}>
            <Typography variant="h6" align="center" gutterBottom>
                NHL Scores
            </Typography>
            <Typography variant="subtitle1" align="center" color="textSecondary" component="p">
                Built with React
            </Typography>
            <Typography variant="body2" color="textSecondary" align="center">
                {'Copyright © '}{2022}
            </Typography>
        </footer>
    );
}

export default Footer;