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
import {StyledText} from "../StyledText";
import Grid from '@material-ui/core/Grid';
import DrawerNavOptions from "./routes/DrawerNavOptions";
import useScrollTrigger from '@material-ui/core/useScrollTrigger';
import Slide from '@material-ui/core/Slide';
import PropTypes from 'prop-types';
import CssBaseline from "@material-ui/core/CssBaseline";


function ElevationScroll(props) {
  const { children, window } = props;
  // Note that you normally won't need to set the window ref as useScrollTrigger
  // will default to window.
  // This is only being set here because the demo is in an iframe.
  const trigger = useScrollTrigger({
    disableHysteresis: true,
    threshold: 0,
    target: window ? window() : undefined,
  });

  useEffect(()=>{
      console.log(trigger)
  },[trigger])
  return React.cloneElement(children, {
    elevation: trigger ? 4 : 0,
      style : {backgroundColor: trigger? "purple": "red"}
  });
}

ElevationScroll.propTypes = {
  children: PropTypes.element.isRequired,
  /**
   * Injected by the documentation to work in an iframe.
   * You won't need it on your project.
   */
  window: PropTypes.func,
};



const navBarRouter = () => {
    console.log("Pressed!")
};

const TopNavBar = (props) => {
    const [isDrawerOpen, setDrawerOpen] = useState(false);
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
            <ElevationScroll {...props}>
                <AppBar>
                    <Toolbar style={{border: '1px solid black'}}>

                        <div style={{
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "space-between",
                            width: "100%",
                            height: "100%",
                            backgroundColor: "green"
                        }}>

                            <Grid container alignItems="center"
                                  style={{height: "75%", border: '1px solid black', maxWidth: "50%"}}>
                                <Button color="inherit">
                                    <StyledText className={"topNavBar__logo"}>
                                        Aaron Malki
                                    </StyledText>
                                </Button>
                                <div className={"topNavBar__logo_divider"}/>
                                <StyledText className={"topNavBar__logo_logo"}>
                                    Compass
                                </StyledText>
                            </Grid>

                            {/*Menu hamburger*/}
                            <div style={{display: "flex", alignItems: "center", justifyContent: "space-between"}}>
                                <div style={{
                                    border: '1px solid white',
                                    justifySelf: "flex-end",
                                    marginRight: "10px",
                                    padding: "10px"
                                }}>
                                    <StyledText className={"topNavBar__phoneNumber"}>
                                        909-528-5364
                                    </StyledText>
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