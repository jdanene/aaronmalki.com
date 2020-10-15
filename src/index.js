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

ReactDOM.render(
    <App />,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
