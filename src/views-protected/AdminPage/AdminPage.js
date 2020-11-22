import React from "react"
import VirtualAdminPage from "./VirtualAdminPage";
import {pageToPathName} from "../../constants";
import {createMuiTheme} from "@material-ui/core";
import {makeStyles} from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import BorderGuard from "../../components/BorderGuard/BorderGuard";
import SettingsIcon from '@material-ui/icons/Settings';

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
        backgroundColor: 'inherit',
        height:'100px'
    },
    menuButton: {
        marginRight: theme.spacing(2)
    }
}));
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
    const classes = useStyles();
    return (
        <div style={{display: 'flex', flexDirection: 'column'}}>
            <BorderGuard/>
            <CssBaseline/>
            <div className={classes.root}>
                <AppBar position="static" color="inherit">
                    <Toolbar variant="dense" color="inherit">
                        <IconButton href={pageToPathName["AdminSettingsPage"]} edge="end" className={classes.menuButton} color="inherit" aria-label="menu">
                            <SettingsIcon/>
                        </IconButton>
                        <Typography edge="end" variant="h6" color="inherit">
                            Settings & Personal Information
                        </Typography>
                    </Toolbar>
                </AppBar>
            </div>
            <VirtualAdminPage/>
        </div>

    )

};

export default AdminPage;