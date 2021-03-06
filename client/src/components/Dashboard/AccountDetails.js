import React, { useState } from "react";
import API from "../../utils/API";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core/styles";
import { Card, CardContent, List, ListItem, ListItemText, ListItemIcon } from "@material-ui/core";
import { Button } from "reactstrap";
import "./Dashboard.css";
import { AccountHero } from "../Hero/AccountHero";
import SettingsIcon from '@material-ui/icons/Settings';
import { EmailUpdate } from "../Form/EmailUpdate";
import { Link } from "react-router-dom";
import { PasswordUpdate } from "../Form/PasswordUpdate";
import { Modal, ModalHeader, ModalFooter } from 'reactstrap';
import { ParamsContext } from "../../utils/ParamsContext";

const useStyles = makeStyles(theme => ({

    cardGrid: {
      paddingTop: theme.spacing(4),
      paddingBottom: theme.spacing(4),
      minHeight: "60vh"
    },
    noGames: {
        textAlign: "center"
    },
    card: {
        height: '100%'
    },
    cardContent: {
        flexGrow: 1,
        paddingTop: 12,
        paddingBottom: 0
    },

}));

export const AccountDetails = (props) => {
    const classes = useStyles();

    const { type, email } = React.useContext(ParamsContext);

    const userEmail = email || props.userEmail;
    sessionStorage.setItem("userEmail", userEmail);

    const [modal, setModal] = useState(false);

    const toggle = () => setModal(!modal);

    const handleDelete = () => {

        API.deleteAccount(userEmail)
        .then((res) => {
            if (res.data === "error") {
                console.log("error deleting account");
            } else {
                window.location.href = "/";
                sessionStorage.clear();

                API.deleteEmailData(userEmail)
                    .then(res => {
                        if (res.data === "error") {
                            console.log("error deleting all emailData from user");
                        }
                    })
                    .catch(err => {
                        console.log(err);
                    });
            }
        })
        .catch(err => {
            console.log(err);
        });
        
    }

    return (
        <React.Fragment>
        <AccountHero userEmail={userEmail} />
        <Container className={classes.cardGrid} maxWidth="sm">
            <Grid container spacing={4}>
                <Grid 
                    item 
                    xs={12}
                >
                    { type === "my-account" &&
                    <Card className={classes.card}>
                        <Grid container direction="column">
                        <CardContent className={classes.cardContent + " pb-0 px-2"}>
                            <Grid item xs={12} >
                                <List className="pb-0">
                                    <ListItem>
                                        <ListItemIcon style={{ minWidth: 36 }}>
                                            <Link to={`/member/update-email/${userEmail}`}>
                                                <SettingsIcon style={{ cursor: "pointer", color: "gray" }} />
                                            </Link>
                                        </ListItemIcon>
                                        <ListItemText
                                            primary={"Email: " + userEmail}
                                        />
                                    </ListItem>
                                    <ListItem>
                                        <ListItemIcon style={{ minWidth: 36 }}>
                                            <Link to={`/member/update-password/${userEmail}`}>
                                                <SettingsIcon style={{ cursor: "pointer", color: "gray" }} />
                                            </Link>
                                        </ListItemIcon>
                                        <ListItemText 
                                            primary={`Password: *********`}
                                        />
                                    </ListItem>
                                </List>
                            </Grid>
                        </CardContent>
                        </Grid>
                        <Grid container justify="flex-end">
                            {/* <Grid item> */}
                                <Button color="danger" className="m-3" onClick={toggle}>
                                    Delete Account
                                </Button>
                            {/* </Grid> */}
                        </Grid>
                    </Card>
                    }
                    { type === "update-email" &&   
                    <Card className={classes.card}>
                        <Grid container direction="column">
                        <CardContent className={classes.cardContent + " pb-0 px-2"}>
                            <Grid item xs={12} >
                                <EmailUpdate {...props} userEmail={userEmail} />
                            </Grid>
                        </CardContent>
                        </Grid>
                    </Card>
                    }
                    { type === "update-password" &&   
                    <Card className={classes.card}>
                        <Grid container direction="column">
                        <CardContent className={classes.cardContent + " pb-0 px-2"}>
                            <Grid item xs={12} >
                                <PasswordUpdate {...props} userEmail={userEmail} />
                            </Grid>
                        </CardContent>
                        </Grid>
                    </Card>
                    }
                </Grid>
            </Grid>
            <div>
                {/* <Button color="danger" onClick={toggle}>{buttonLabel}</Button> */}
                <Modal isOpen={modal} toggle={toggle}>
                    <ModalHeader toggle={toggle}>Delete Account</ModalHeader>
                    {/* <ModalBody>
                        Are you sure you want to delete your account?
                    </ModalBody> */}
                    <ModalFooter>
                        <Button color="danger" onClick={()=>handleDelete()}>Delete</Button>{' '}
                        <Button color="secondary" onClick={toggle}>Cancel</Button>
                    </ModalFooter>
                </Modal>
            </div>
        </Container>
        </React.Fragment>
    );
}