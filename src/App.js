import React, {useEffect} from 'react';
import logo from './logo.svg';
import './App.css';
import {
    BrowserRouter as Router,
    Switch,
    Route
} from "react-router-dom";
import {TopNavBar} from "./components/NavBar";
import {pageToPathName} from "./constants";
import {HomePage, SellersPage, CurrentListingsPage, ContactUsPage, BuyersPage} from "./views";
import {AppContextProvider} from "./context";
import {createMuiTheme, makeStyles, ThemeProvider} from '@material-ui/core/styles';
import {colorScheme} from "./constants";
// Firebase App (the core Firebase SDK) is always required and
// must be listed before other Firebase SDKs
import * as firebase from "firebase/app";
// Add the Firebase services that you want to use
import "firebase/auth";
import "firebase/firestore";
import {SocialMediaButtons} from "./components/SocialMediaButtons";
import {Footer} from "./components/Footer";
import {TransitionGroup, CSSTransition} from "react-transition-group";
import {useLocation} from 'react-router-dom'


// For Firebase JS SDK v7.20.0 and later, measurementId is optional
export const firebaseConfig = {
    apiKey: "AIzaSyDb3T9-Cd7yQynA_W-mCldk29o7ALEcf2A",
    authDomain: "the-malki-site.firebaseapp.com",
    databaseURL: "https://the-malki-site.firebaseio.com",
    projectId: "the-malki-site",
    storageBucket: "the-malki-site.appspot.com",
    messagingSenderId: "391631262205",
    appId: "1:391631262205:web:a0ef5ae7d90c3d4aaf8994",
    measurementId: "G-T7SZTH3QFR"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

// Get a reference to the database service
export const FIREBASE_DB = firebase.database();


function App({location}) {


    // const location = useLocation();

    const theme = createMuiTheme({
        palette: {
            primary: {
                main: colorScheme.primary.primary,
                light: colorScheme.primary.light,
                dark: colorScheme.primary.dark
            },
            secondary: {
                main: colorScheme.secondary.primary,
                light:colorScheme.secondary.light ,
                dark: colorScheme.secondary.dark
            }
        }
    });

    useEffect(() => {


    }, []);

    return (


        <Router>
            <ThemeProvider theme={theme}>
                <AppContextProvider>
                    <div className="app_container">

                        <TopNavBar/>

                        <div className={"app_container_main_body"}>
                            {/* A <Switch> looks through its children <Route>s and renders the first one that matches the current URL. */}

                                    <Switch>
                                        <Route path={pageToPathName["HomePage"]} exact component={HomePage}/>
                                        <Route path={pageToPathName["SellersPage"]} exact component={SellersPage}/>
                                        <Route path={pageToPathName["CurrentListingsPage"]} exact
                                               component={CurrentListingsPage}/>
                                        <Route path={pageToPathName["ContactUsPage"]} exact component={ContactUsPage}/>
                                        <Route path={pageToPathName["BuyersPage"]} exact component={BuyersPage}/>
                                    </Switch>

                        </div>

                        <Footer/>
                    </div>

                </AppContextProvider>
            </ThemeProvider>
        </Router>

    );
}

export default App;
