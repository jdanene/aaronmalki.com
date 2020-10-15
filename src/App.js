import React from 'react';
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


function App() {
    return (

        <div className="app_container">

            <Router>
                <AppContextProvider>
                    <TopNavBar/>

                    <div className={"app_container_main_body"}>
                        {/* A <Switch> looks through its children <Route>s and renders the first one that matches the current URL. */}
                        <Switch>
                            <Route path={pageToPathName["HomePage"]} exact component={HomePage}/>
                            <Route path={pageToPathName["SellersPage"]} exact component={SellersPage} />
                            <Route path={pageToPathName["CurrentListingsPage"]} exact component={CurrentListingsPage}/>
                            <Route path={pageToPathName["ContactUsPage"]} exact component={ContactUsPage}/>
                            <Route path={pageToPathName["BuyersPage"]} exact component={BuyersPage}/>
                        </Switch>
                    </div>
                </AppContextProvider>
            </Router>
        </div>
    );
}

export default App;
