// Import FirebaseAuth and firebase.
import React, {useContext, useState} from 'react';
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';
import firebase from 'firebase';
import {AppContext} from "../../context/AppContext";
import {Redirect, useHistory,} from "react-router-dom";
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import {makeStyles} from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import CssBaseline from '@material-ui/core/CssBaseline';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import Alert from '@material-ui/lab/Alert';
import CloseIcon from '@material-ui/icons/Close';
import IconButton from '@material-ui/core/IconButton';
import {pageToPathName} from "../../constants";
import {createMuiTheme} from "@material-ui/core";
import getSHA from "../../components/Utility/getSHA";
//https://courses.cs.northwestern.edu/394/intro-react.php#authentication
const darkTheme = createMuiTheme({
    palette: {
        type: 'dark',
    },
});


let ADMIN_EMAILS = process.env.REACT_APP_ADMIN_EMAILS;
ADMIN_EMAILS = new Set(ADMIN_EMAILS.split(","));


const useStyles = makeStyles((theme) => ({
    root: {
        backgroundColor: theme.palette.background.default
    },
    paper: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent:'center',
                            minWidth:240,
                    minHeight:250,
                                    width:240,
                    height:250,
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


const AdminLoginPage = ({location}) => {
    const {auth} = useContext(AppContext);


    const classes = useStyles();
    const history = useHistory();
    const [failedLogin, setFailedLogin] = useState(false);


// Configure FirebaseUI.
    const uiConfig = {
        // Popup signin flow rather than redirect flow.
        signInFlow: 'popup',
        // We will display Google as auth providers.
        signInOptions: [
            {provider: firebase.auth.GoogleAuthProvider.PROVIDER_ID, requireDisplayName: true}
        ],
        callbacks: {
            // Avoid redirects after sign-in.
            signInFailure: (error) => alert(error),
            signInSuccessWithAuthResult: (authResult, redirectUrl) => {
                if (!(ADMIN_EMAILS.has(getSHA(authResult.user.email)))) {
                    auth.signout().then(() => setFailedLogin(authResult.user.email));
                    return false;
                }
                console.log(`The user here!!!  ${authResult.user}`);
                auth.setUser(authResult.user);
                // redirect to the admin page
                //history.replace(pageToPathName['AdminPage']);
                return false
            }
        }
    };




    if (auth.user){
        return <Redirect to={pageToPathName["AdminPage"]} />
    }


    return (
        <div style={{display: 'flex', height: '100vh', width: '100vw', justifyContent: 'center', alignItems: 'center'}}>
                                <CssBaseline/>

            {!failedLogin ?
                <Container component="main" style={{
                    display: "flex",
                    flexDirection: 'column',
                    justifyContent: "center",
                    alignItems: "center",
                }}>
                    <Paper className={classes.paper}>

                        <Avatar className={classes.avatar}>
                            <LockOutlinedIcon/>
                        </Avatar>
                        <Typography variant="h5">
                            Admin Sign in
                        </Typography>
                        <StyledFirebaseAuth uiCallback={ui => ui.disableAutoSignIn()} uiConfig={uiConfig}
                                            firebaseAuth={firebase.auth()}/>
                    </Paper>
                </Container> :

                <Alert
                    severity="error"
                    variant="filled"
                    action={
                        <IconButton
                            aria-label="close"
                            color="inherit"
                            size="small"
                            onClick={() => {
                                setFailedLogin(false);
                            }}
                        >
                            <CloseIcon fontSize="inherit"/>
                        </IconButton>
                    }
                >
                    Permission Denied: Ask owner to give admin access to email: {failedLogin}
                </Alert>
            }

        </div>
    )


};


export default AdminLoginPage;