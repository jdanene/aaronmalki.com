// Import FirebaseAuth and firebase.
import React, {useState, useContext, useEffect} from 'react';
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';
import firebase from 'firebase';
import {AppContext} from "../../context/AppContext";
import PropTypes from 'prop-types';
import {pageToPathName} from "../protected-views";
import {
    Redirect,
} from "react-router-dom";
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import {makeStyles} from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import CssBaseline from '@material-ui/core/CssBaseline';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';




const useStyles = makeStyles((theme) => ({
    root:{
        backgroundColor: theme.palette.background.default
    },
    paper: {
        marginTop: theme.spacing(10),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.secondary.main,
    },
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(1),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
}));

// Configure FirebaseUI.
const uiConfig = {
    // Popup signin flow rather than redirect flow.
    signInFlow: 'popup',
    // We will display Google as auth providers.
    signInOptions: [
        firebase.auth.GoogleAuthProvider.PROVIDER_ID,
    ],
    callbacks: {
        // Avoid redirects after sign-in.
        signInSuccessWithAuthResult: () => false
    }
};


const AdminLoginPage = () => {
    const classes = useStyles();

    return (
        <div style={{display:'flex',height:'100vh',width:'100vw', justifyContent:'center', alignItems:'center'}}>
        <Container component="main" maxWidth="xs" style={{
            display: "flex",
            flexDirection: 'column',
            justifyContent: "center",
            alignItems: "center",

        }}>
            <CssBaseline/>
            <Paper className={classes.paper}>
                <Avatar className={classes.avatar}>
                    <LockOutlinedIcon/>
                </Avatar>
                <Typography component="h1" variant="h5">
                    Sign in
                </Typography>
                <StyledFirebaseAuth uiCallback={ui => ui.disableAutoSignIn()} uiConfig={uiConfig}
                                firebaseAuth={firebase.auth()}/>
            </Paper>

        </Container>
        </div>
            )


};


export default AdminLoginPage;