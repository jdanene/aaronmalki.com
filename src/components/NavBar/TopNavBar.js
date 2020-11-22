import MenuIcon from '@material-ui/icons/Menu';
import "./TopNavBar.scss";
import React, {useContext, useEffect, useState} from "react"
import IconButton from '@material-ui/core/IconButton';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';
import Drawer from '@material-ui/core/Drawer';
import {FittedText, PopText} from "../Text";
import DrawerNavOptions from "./Drawer/DrawerNavOptions";
import useScrollTrigger from '@material-ui/core/useScrollTrigger';
import PropTypes from 'prop-types';
import CssBaseline from "@material-ui/core/CssBaseline";
import {makeStyles} from '@material-ui/core/styles';
import {colorScheme, pageToPathName} from "../../constants";
import useMediaQuery from '@material-ui/core/useMediaQuery';
import {FaPhoneAlt} from "react-icons/fa";
import Fab from '@material-ui/core/Fab';
import {useLocation} from 'react-router-dom'
import {DB_NODES_PAGES} from "../../constants/contants";
import {AppContext} from "../../context";
import {ReactComponent as Logo} from "resources/images/official_logo_white_bg.svg";
import {Link} from "react-router-dom";

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


const useStyles = makeStyles((theme) => ({
    name: {
        fontFamily: "raleway-thin, serif"
    },
    logoContainer: {
        position: "absolute",
        left: -1 * theme.spacing(4.5),
        marginTop: 5,
        border:'1px solid pink'
    },
    logo:{
        border:'1px solid pink'
    },
    phoneNumber: {
        fontFamily: "raleway-thin, serif"
    },
    drawerItem: {
        background: '#FAFBFC'
    }
}));

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
                                display: "flex",
                                minHeight: "45px",
                                alignItems: 'center',
                                alignContent: 'center',
                                margin: "0px 0px 0px 5px"
                            }}>

                                <IconButton href={pageToPathName["HomePage"]} color="inherit" className={styles.logoContainer}>


                                    <Logo className={styles.logo}/>

                                </IconButton>

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