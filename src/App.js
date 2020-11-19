import React, {useEffect, useContext, useState} from 'react';
import logo from './logo.svg';
import './App.css';
import {
    BrowserRouter as Router,
    Switch,
    Route, Redirect,
} from "react-router-dom";
import {TopNavBar} from "./components/NavBar";
import {pageToPathName} from "./constants";
import {pageToPathName as protectedPageToPathName} from "./views-protected/protected-views"
import {HomePage, SellersPage, CurrentListingsPage, ContactUsPage, BuyersPage, LeasePage, BlogPage} from "./views";
import {AppContextProvider} from "./context";
import {createMuiTheme, makeStyles, ThemeProvider} from '@material-ui/core/styles';
import {colorScheme} from "./constants";
import AdminLoginPage from "./views-protected/AdminLoginPage/AdminLoginPage";
import ProtectedRoute from "./views-protected/ProtectedRoute";
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
import {AppContext} from "./context";
import {blog_categories, blog_category_to_string,blog_categories_keysOnly} from "./constants/contants";
import {AnimatedSwitch} from 'react-router-transition';
import AdminPage from "./views-protected/AdminPage/AdminPage";
import NoMatch from "./views/NoMatchPage/NoMatchPage";
import ScrollToTop from "./context/ScrollToTop";
import ManageBlogPage from "./views-protected/ManageBlogPage/ManageBlogPage";
import generateUUID from "./components/Utility/uuid";
import AdminSettingsPage from "./views-protected/AdminSettingsPage/AdminSettingsPage";
import ManageHomePage from "./views-protected/ManageHomePage/ManageHomePage";
import ManageBuyersPage from "./views-protected/ManageBuyersPage/ManageBuyersPage";
import ManageLeasePage from "./views-protected/ManageLeasePage/ManageLeasePage";
import UnderConstructionPage from "./views/UnderConstructionPage/UnderConstructionPage";
import Splash from "./components/Splash/Splash";
import Fade from '@material-ui/core/Fade';


const FIREBASE_KEY = process.env.REACT_APP_FIREBASE_KEY;

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
export const firebaseConfig = {
    apiKey: FIREBASE_KEY,
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

//Get a reference to the storage service
export const FIREBASE_STORAGE = firebase.storage();


function App({location}) {

    const {blogPaths, filteredBlogPosts,isBlogLoaded,settingsHasLoaded,pageStateHasLoaded} = useContext(AppContext);

    // const location = useLocation();

    const theme = createMuiTheme({
        palette: {
            primary: {
                main: colorScheme.primary.primary,
                light: colorScheme.primary.light,
                dark: colorScheme.primary.dark,
            },
            secondary: {
                main: colorScheme.secondary.primary,
                light: colorScheme.secondary.light,
                dark: colorScheme.secondary.primary,
            }
        }
    });

    const [splashOff, setSplashOff] = useState(false);

    useEffect(() => {

        let timeout = setTimeout(()=>{
        //do what you need here
            setSplashOff(true);
        },650 );

        return ()=>clearTimeout(timeout);
    }, []);



    Object.keys(blog_categories_keysOnly).filter((key)=>{
        return filteredBlogPosts[key] === null
    }).map((key)=><Route key={key} path={blog_category_to_string[key].path} exact
                                   component={BlogPage}/>);

    return (


        <ThemeProvider theme={theme}>
            {splashOff&&isBlogLoaded&&pageStateHasLoaded?
                <Fade in={splashOff&&isBlogLoaded&&pageStateHasLoaded} timeout={500}>
                <div className="app_container">


                <TopNavBar/>

                <div className={"app_container_main_body"}>
                    {/* A <Switch> looks through its children <Route>s and renders the first one that matches the current URL. */}
                <ScrollToTop>
                    <Switch>
                        <Route path={pageToPathName["HomePage"]} exact component={HomePage}/>
                        {/*<Route path={pageToPathName["SellersPage"]} exact component={SellersPage}/>
                        <Route path={pageToPathName["CurrentListingsPage"]} exact
                               component={CurrentListingsPage}/>*/}
                        <Route path={pageToPathName["ContactUsPage"]} exact component={ContactUsPage}/>
                        <Route path={pageToPathName["BuyersPage"]} exact component={BuyersPage}/>
                        <Route path={pageToPathName["LeasePage"]} exact component={LeasePage}/>

                        {/*Admin Login Page*/}
                        <Route path={pageToPathName["AdminLoginPage"]} exact component={AdminLoginPage}/>

                        {/*Login and Admin*/}
                        <ProtectedRoute path={protectedPageToPathName["AdminPage"]} exact component={AdminPage}/>

                        {/*Manage Blog Page*/}
                        <ProtectedRoute path={pageToPathName["ManageBlogPage"]} exact component={ManageBlogPage}/>

                        {/*Manage Admin Settings*/}
                        <ProtectedRoute path={pageToPathName["AdminSettingsPage"]} exact component={AdminSettingsPage}/>

                        {/*Manage Home Page*/}
                        <ProtectedRoute path={pageToPathName["ManageHomePage"]} exact component={ManageHomePage}/>
                        {/*Manage Buy Page*/}
                        <ProtectedRoute path={pageToPathName["ManageBuyersPage"]} exact component={ManageBuyersPage}/>                        {/*Manage Home Page*/}
                         {/*Manage Lease Page*/}
                        <ProtectedRoute path={pageToPathName["ManageLeasePage"]} exact component={ManageLeasePage}/>
                        {/*Manage sell page*/}
                        <ProtectedRoute path={pageToPathName["ManageSellersPage"]} exact component={UnderConstructionPage}/>
                        {/*Manage listings page*/}
                        <ProtectedRoute path={pageToPathName["ManageCurrentListingsPage"]} exact component={UnderConstructionPage}/>

                        {/*Blog absolute path*/}
                        <Route path={pageToPathName["BlogPage"]} exact component={BlogPage}>
                            <Redirect to={blog_category_to_string.news.path}/>
                        </Route>

                        {/*Blog tabs at the top*/}
                        {Object.keys(blog_categories_keysOnly).map((key) =>
                            <Route key={key} path={blog_category_to_string[key].path} exact
                                   render={(props) => <BlogPage {...props} category={key} key={generateUUID()}/>}/>
                        )}


                        {/*Individual Blogs*/}
                        {isBlogLoaded && Object.keys(blogPaths).map((key) =>
                            <Route key={key} path={blogPaths[key]} exact
                                   render={(props) => <BlogPage {...props} blogUUID={key}/>}/>
                        )}

                        {/*404*/}
                        <Route path="*">
                            <NoMatch/>
                        </Route>

                    </Switch>
                </ScrollToTop>

                </div>

                <Footer/>
            </div>
                </Fade>
                :
                <Splash/>}



        </ThemeProvider>

    );
}

export default App;
