import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import "./resources/fonts/SourceSansPro-Regular.ttf";
import "./resources/fonts/SourceSansPro-Bold.ttf";
import "./resources/fonts/SourceSansPro-SemiBold.ttf";
import "./resources/fonts/AirbnbCereal-Light.ttf"
import "./resources/fonts/AirbnbCereal-Black.ttf"
import "./resources/fonts/AirbnbCereal-Book.ttf"
import "./resources/fonts/Raleway-Light.ttf"
import "./resources/fonts/Raleway-Regular.ttf"
import "./resources/fonts/Raleway-Italic.ttf"
import "./resources/fonts/Raleway-BoldItalic.ttf"
import "./resources/fonts/ScopeOne-Regular.ttf"
import "./resources/fonts/AirbnbCereal-Bold.ttf"
import "./resources/fonts/AirbnbCereal-Medium.ttf"
import {AppContextProvider} from "./context";
import {
    BrowserRouter as Router,
} from "react-router-dom";

import {hydrate, render} from "react-dom";

if (global) {
    global.fetch = require("node-fetch");

}

const rootElement = document.getElementById("root");
if (rootElement.hasChildNodes()) {
    hydrate(<Router>
        <AppContextProvider>
            <App/>
        </AppContextProvider>
    </Router>, rootElement);
} else {
    render(<Router>
        <AppContextProvider>
            <App/>
        </AppContextProvider>
    </Router>, rootElement);
}


// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
