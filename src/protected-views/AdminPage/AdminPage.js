import React, {useContext, useEffect, useState} from "react"
import {AppContext} from "../../context";
import Link from "react-router-dom";
import VirtualAdminPage from "./VirtualAdminPage";
import AdminLoginPage from "./AdminLoginPage";
import {
    Redirect,
} from "react-router-dom";
import {pageToPathName} from "../protected-views";
import {createMuiTheme} from "@material-ui/core";
import {MuiThemeProvider} from '@material-ui/core/styles';

//https://courses.cs.northwestern.edu/394/intro-react.php#authentication
const darkTheme = createMuiTheme({
    palette: {
        type: 'dark',
    },
});
//push(path, [state]) - (function) Pushes a new entry onto the history stack
//replace(path, [state]) - (function) Replaces the current entry on the history stack
// history.push("/home");
const AdminPage = ({location, history, match}) => {
    const {auth} = useContext(AppContext);


    if (auth.user) {
        return (
            <MuiThemeProvider theme={darkTheme}>
                <VirtualAdminPage/>
            </MuiThemeProvider>
        )
    } else {
        return (
            <MuiThemeProvider theme={darkTheme}>
                <AdminLoginPage auth={auth}/>
            </MuiThemeProvider>
        )
    }

};

export default AdminPage;