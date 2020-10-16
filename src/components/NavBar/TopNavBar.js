import MenuIcon from '@material-ui/icons/Menu';
import "./TopNavBar.scss";
import React, {useContext, useEffect, useRef, useState} from "react"
import "./TopNavBar.scss"
import IconButton from '@material-ui/core/IconButton';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import SwipeableDrawer from '@material-ui/core/SwipeableDrawer';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import MailIcon from '@material-ui/icons/Mail';
import {StyledText, PopText} from "../Text";
import Grid from '@material-ui/core/Grid';
import DrawerNavOptions from "./routes/DrawerNavOptions";
import useScrollTrigger from '@material-ui/core/useScrollTrigger';
import Slide from '@material-ui/core/Slide';
import PropTypes from 'prop-types';
import CssBaseline from "@material-ui/core/CssBaseline";
import Zoom from '@material-ui/core/Zoom';
import Fade from "./NavBarTransition";
import {makeStyles} from '@material-ui/core/styles';
import {Container} from "@material-ui/core";
import GTranslateIcon from '@material-ui/icons/GTranslate';
import {colorScheme} from "../../constants";

function ElevationScroll({window, children, setTrigger}) {
    //const {children, window, setTrigger} = props;
    // Note that you normally won't need to set the window ref as useScrollTrigger
    // will default to window.
    // This is only being set here because the demo is in an iframe.
    const trigger = useScrollTrigger({
        disableHysteresis: true,
        threshold: 0,
        target: window ? window() : undefined,
    });


    useEffect(() => {
        setTrigger(trigger);
    }, [trigger]);

    return React.cloneElement(children, {
        elevation: trigger ? 4 : 0,
        style: trigger? {backgroundColor:colorScheme.primary.dark} : {background: 'transparent'}
    });
}

ElevationScroll.propTypes = {
    children: PropTypes.element.isRequired,
    /**
     * Injected by the documentation to work in an iframe.
     * You won't need it on your project.
     */
    window: PropTypes.func,
    setTrigger: PropTypes.func.isRequired
};


const useStyles = makeStyles({
    name: {
        fontFamily: "raleway-thin, serif"
    },
    logo: {
        fontFamily: "raleway-thin, serif",
        fontWeight: "lighter",
        marginLeft: "5px",
        letterSpacing: "2px"
    },
    phoneNumber: {
        fontFamily: "raleway-thin, serif"
    }
});


const TopNavBar = (props) => {
    const styles = useStyles();

    const {children, window} = props;
    const [isDrawerOpen, setDrawerOpen] = useState(false);
    const [trigger, setTrigger] = useState(false);
    const ref = useRef();

    const toggleDrawer = (open) => (event) => {
        if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
            return;
        }
        setDrawerOpen(open);
    };


    return (
        <div className={"topNavBar__container"}>
            <CssBaseline/>
            <ElevationScroll children={children} window={window} setTrigger={setTrigger}>
                <AppBar>
                    <Toolbar style={{/*border: '1px solid yellow'*/}}>

                        <div style={{
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "space-between",
                            width: "100%",
                            height: "100%",
                            background: 'transparent'
                        }}>

                            <div style={{height: "100%", border: `1px solid ${colorScheme.secondary.light}`, maxWidth: "50%", display:"flex",alignItems: "center", justifyContent: "center"}}>

                                <Button color="inherit" style={{/*border: "1px solid black",*/ height:"100%"}}>
                                    <PopText endFontSize={"16px"} startFontSize={"18px"} trigger={trigger} style={{ fontFamily: "raleway-thin, serif", fontWeight:"bold"}}>
                                        Aaron Malki
                                    </PopText>
                                </Button>

                                <div style={{height:"100%", minHeight:"30px",borderLeft: "1px solid white", backgroundColor:"white"}}/>

                                   <div style={{height:"100%", display:"flex", minHeight:"45px", alignItems:'center', alignContent:'center', margin:"0px 0px 0px 5px"}}>
                                    <PopText  endFontSize={"16px"} startFontSize={"18px"} trigger={trigger} style={{fontFamily: "raleway-thin, serif"}}>
                                        Compass
                                    </PopText>
                                   </div>

                                <div style={{width:"45px", height:"45px", padding:"0px 5px 0px 5px"}}>
                                    <GTranslateIcon style={{width:"100%", height:"100%"}}/>
                                </div>

                            </div>

                            {/*Menu hamburger*/}
                            <div style={{display: "flex", alignItems: "center", justifyContent: "space-between"}}>
                                <div style={{
                                    border: '1px solid white',
                                    justifySelf: "flex-end",
                                    marginRight: "10px",
                                    padding: "10px"
                                }}>

                                    <PopText  endFontSize={"15px"} startFontSize={"15.5px"} trigger={trigger} className={"topNavBar__phoneNumber"}>
                                        909-528-5364
                                    </PopText>
                                </div>

                                <div key={"right"} style={{justifySelf: "flex-end", marginLeft: "10px"}}>
                                    <IconButton onClick={toggleDrawer(true)} edge="start" style={{}}
                                                color="inherit" aria-label="menu">
                                        <MenuIcon/>
                                    </IconButton>

                                    <Drawer

                                        anchor={"right"}
                                        open={isDrawerOpen}
                                        onClose={toggleDrawer(false)}
                                    >
                                        {DrawerNavOptions({toggleDrawerCallback: toggleDrawer})}
                                    </Drawer>
                                </div>
                            </div>


                        </div>

                    </Toolbar>
                </AppBar>
            </ElevationScroll>
        </div>
    )
};

export default TopNavBar;