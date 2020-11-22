import React, {useContext} from "react"
import {withRouter} from "react-router-dom"
import {AppContext} from "../context";
import {MuiThemeProvider} from '@material-ui/core/styles';
import {createMuiTheme} from "@material-ui/core";
import {pageToPathName} from "../constants";
import AdminLoginPage from "./AdminLoginPage/AdminLoginPage";
//https://courses.cs.northwestern.edu/394/intro-react.php#authentication
const darkTheme = createMuiTheme({
    palette: {
        type: 'dark',
        primary: {

            main: '#01a9f4',
            light: '#67daff',
            dark: '#007ac1',
        },
        secondary: {
            main: '#00F4C3',
            light: '#6bfff6',
            dark: '#00c093',
        }
    },
});

const ProtectedRoute = ({component, children, ...rest}) => {

    const {auth} = useContext(AppContext);
    const Component = component;

    const location = {
        pathname: pageToPathName["AdminLoginPage"],
        state: {fromDashboard: true}
    }


    if (auth.user) {
        return (
            <MuiThemeProvider theme={darkTheme}>
                <Component {...rest} />
            </MuiThemeProvider>

        )
    } else {
        return (
            <MuiThemeProvider theme={darkTheme}>
                <AdminLoginPage to={location}/>
            </MuiThemeProvider>
        )
    }

};

export default withRouter(ProtectedRoute)
