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
import {StyledText, PopText, FittedText} from "../Text";
import Grid from '@material-ui/core/Grid';
import DrawerNavOptions from "./Drawer/DrawerNavOptions";
import useScrollTrigger from '@material-ui/core/useScrollTrigger';
import Slide from '@material-ui/core/Slide';
import PropTypes from 'prop-types';
import CssBaseline from "@material-ui/core/CssBaseline";
import Zoom from '@material-ui/core/Zoom';
import Fade from "./NavBarTransition";
import {makeStyles} from '@material-ui/core/styles';
import {Container} from "@material-ui/core";
import GTranslateIcon from '@material-ui/icons/GTranslate';
import {colorScheme, pageToPathName} from "../../constants";
import {useTheme} from '@material-ui/core/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import {FaPhoneAlt} from "react-icons/fa";
import Fab from '@material-ui/core/Fab';
import {useLocation} from 'react-router-dom'
import {VerticalDivider} from "../VerticalDivider";
import {DB_NODES_PAGES, pathToPageName} from "../../constants/contants";
import {AppContext} from "../../context";
import {
    pageToPageName as adminPageToPageName,
    pageToPathName as adminPageToPathName
} from "views-protected/protected-views"

function ElevationScroll({window, children, setTrigger, triggerActive}) {
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
        elevation: !triggerActive || trigger ? 4 : 0,
        style: (!triggerActive || trigger) ? {backgroundColor: colorScheme.primary.dark} : {background: 'transparent'}
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
    },
    drawerItem: {
        background: '#FAFBFC'
    }
});

const shouldNavBarTrigger = (pathname) => {
    return (pathname === pageToPathName["HomePage"]) || (pathname === pageToPathName["BuyersPage"]) || (pathname === pageToPathName["LeasePage"])
};

const AdminLogOut = ({auth}) => {

    const onClick = () => {
        auth.signout()
    };

    return <Button
        href={pageToPathName['AdminPage']}
        size={"small"}
        variant="contained"
        onClick={onClick}
        className={"topNavBar__phoneNumber"}
        style={
            {

                backgroundColor: colorScheme.other.backgroundComplementary,
                border: `2px solid ${colorScheme.general.red}`,
                borderRadius: 0,
                justifySelf: "flex-end",
                marginRight: "10px",
                padding: "5px",
                color: colorScheme.general.red
            }}>
        <FittedText> Sign Out</FittedText>

    </Button>
};

const TopNavBar = ({children, window}) => {
    const {
        auth,
        pageState: {
            [DB_NODES_PAGES.settings]: {
                phoneNumber, companyName
            }
        },
    } = useContext(AppContext);

    const styles = useStyles();
    const location = useLocation();
    //const {children, window} = props;
    const [isDrawerOpen, setDrawerOpen] = useState(false);
    const [trigger, setTrigger] = useState(false);
    const [isTriggerActive, setTriggerActive] = useState(false);

    const mobileBreak = useMediaQuery("only screen and (max-width: 600px)");

    useEffect(() => {
            // eslint-disable-next-line eqeqeq
            //console.log(`TopNavBar(path=${location.pathname}, page=${pathToPageName[location.pathname]})`)

            // Determines if we want fancy effects on navbar
            setTriggerActive(shouldNavBarTrigger(location.pathname));


        },
        [location.pathname]);

    useEffect(() => {
    }, [mobileBreak]);

    const toggleDrawer = (open) => (event) => {
        if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
            return;
        }
        setDrawerOpen(open);
    };


    return (
        <div className={"topNavBar__container"}>
            <CssBaseline/>
            {/*triggerActive determins which page we have the fade in and fade out on scroll behavior*/}
            <ElevationScroll children={children} window={window} setTrigger={setTrigger}
                             triggerActive={isTriggerActive}>
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

                            <div style={{
                                height: "100%",
                                //border: `1px solid ${colorScheme.secondary.light}`,
                                maxWidth: "75%",
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center"
                            }}>

                                <Button href={pageToPathName["HomePage"]} color="inherit"
                                        style={{/*border: "1px solid black",*/ height: "100%"}}>


                                    <PopText endFontSize={!mobileBreak ? "16px" : "13.5px"}
                                             startFontSize={!mobileBreak ? "18px" : "14px"}
                                             trigger={!isTriggerActive || trigger}
                                             style={{
                                                 fontFamily: "raleway-thin, serif",
                                                 fontWeight: "bold",
                                                 letterSpacing: "1.5px"
                                             }}>

                                        {companyName}
                                    </PopText>
                                </Button>

                                {/*
                                <VerticalDivider/>

                                <div style={{
                                    height: "100%",
                                    display: "flex",
                                    minHeight: "45px",
                                    alignItems: 'center',
                                    alignContent: 'center',
                                    margin: "0px 0px 0px 5px"
                                }}>
                                    <PopText endFontSize={!mobileBreak ? "16px" : "14px"}
                                             startFontSize={!mobileBreak ? "18px" : "15px"}
                                             trigger={!isTriggerActive || trigger}
                                             style={{fontFamily: "raleway-thin, serif"}}>
                                        Compass
                                    </PopText>
                                </div>*

                                <div style={{width: "45px", height: "45px", padding: "0px 5px 0px 5px"}}>
                                    <GTranslateIcon
                                        style={{width: "100%", height: "100%", color: "rgba(255, 255, 255,.5)"}}/>
                                </div>*/}

                            </div>

                            {/*Menu hamburger*/}
                            <div style={{display: "flex", alignItems: "center", justifyContent: "space-between"}}>

                                {auth.user && <AdminLogOut auth={auth}/>}

                                {mobileBreak ?
                                    (location.pathname !== pageToPathName["ContactUsPage"]) && <Fab aria-label="add"
                                                                                                    style={{
                                                                                                        position: 'fixed',
                                                                                                        bottom: 15,
                                                                                                        right: 10,
                                                                                                        color: colorScheme.primary.primary
                                                                                                    }}
                                                                                                    href={pageToPathName["ContactUsPage"]}>
                                        <FaPhoneAlt size={22} color={colorScheme.other.analogous1}/>
                                    </Fab>
                                    //<IconButton style={{color:colorScheme.primary.dark, backgroundColor:"#c6c6c6", height:"35px", width:"35px", radius:"50%", padding:0,position: 'fixed',bottom:0}} aria-label="add to shopping cart">
                                    //  <FaPhoneAlt size={14}/>
                                    //</IconButton>
                                    :
                                    <Button
                                        href={(location.pathname !== pageToPathName["ContactUsPage"]) ? pageToPathName["ContactUsPage"] : `tel:${phoneNumber.tel}`}
                                        size={"small"}
                                        variant="contained"
                                        className={"topNavBar__phoneNumber"}
                                        style={
                                            {
                                                backgroundColor: "transparent",
                                                border: '1px solid white',
                                                borderRadius: 0,
                                                justifySelf: "flex-end",
                                                marginRight: "10px",
                                                padding: "5px"
                                            }}>

                                        <PopText endFontSize={"15px"} startFontSize={"15.5px"}
                                                 trigger={!isTriggerActive || trigger}
                                                 className={"topNavBar__phoneNumber"}>
                                            {phoneNumber.all_dash}
                                        </PopText>
                                    </Button>
                                }


                                <div key={"right"} style={{justifySelf: "flex-end", marginLeft: "10px"}}>
                                    <IconButton onClick={toggleDrawer(true)} edge="start" style={{}}
                                                color="inherit" aria-label="menu">
                                        <MenuIcon/>
                                    </IconButton>

                                    <Drawer
                                        classes={{paper: styles.drawerItem}}
                                        anchor={"right"}
                                        open={isDrawerOpen}
                                        onClose={toggleDrawer(false)}
                                    >
                                        <DrawerNavOptions toggleDrawerCallback={toggleDrawer}
                                                          locationPathName={location.pathname}/>
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