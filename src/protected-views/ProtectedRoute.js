import React, {useContext, useEffect, useState} from "react"
import {Redirect, withRouter} from "react-router-dom"
import {AppContext} from "../context";
import {MuiThemeProvider} from '@material-ui/core/styles';
import {createMuiTheme} from "@material-ui/core";
import {pageToPathName} from "../constants";
//https://courses.cs.northwestern.edu/394/intro-react.php#authentication
const darkTheme = createMuiTheme({
    palette: {
        type: 'dark',
    },
});

const ProtectedRoute = ({component, children, ...rest}) => {

    const {auth} = useContext(AppContext);
    const Component = component;


    if (auth.user) {
        return (
            <MuiThemeProvider theme={darkTheme}>
                <Component {...rest} />
            </MuiThemeProvider>

        )
    } else {
        return (
            <MuiThemeProvider theme={darkTheme}>
                 <Redirect to={pageToPathName["AdminLoginPage"]} />
            </MuiThemeProvider>
        )
    }

};

export default withRouter(ProtectedRoute)
