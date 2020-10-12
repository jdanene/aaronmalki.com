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

const navBarRouter = () => {
    console.log("Pressed!")
};

const TopNavBar = () => {
    const [isDrawerOpen, setDrawerOpen] = useState(false);
    const ref = useRef();

    const toggleDrawer = (open) => (event) => {
        if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
            return;
        }
        setDrawerOpen(open);
    };

    const list = () => (
        <div
            style={{width: 'auto'}}
            role="presentation"
            onClick={toggleDrawer(false)}
            onKeyDown={toggleDrawer(false)}
        >
            <List>
                {['Inbox', 'Starred', 'Send email', 'Drafts'].map((text, index) => (
                    <ListItem button key={text}>
                        <ListItemIcon>{index % 2 === 0 ? <InboxIcon/> : <MailIcon/>}</ListItemIcon>
                        <ListItemText primary={text}/>
                    </ListItem>
                ))}
            </List>
            <Divider/>
            <List>
                {['All mail', 'Trash', 'Spam'].map((text, index) => (
                    <ListItem button key={text}>
                        <ListItemIcon>{index % 2 === 0 ? <InboxIcon/> : <MailIcon/>}</ListItemIcon>
                        <ListItemText primary={text}/>
                    </ListItem>
                ))}
            </List>
        </div>
    );


    return (
        <header onClick={navBarRouter} className={"topNavBar__container"}>
            <AppBar position="static">
                <Toolbar>

                    <React.Fragment key={"right"}>
                        <IconButton onClick={toggleDrawer(true)} edge="start" style={{border: '1px solid black'}}
                                    color="inherit" aria-label="menu">
                            <MenuIcon/>
                        </IconButton>

                        <Drawer

                            anchor={"right"}
                            open={isDrawerOpen}
                            onClose={toggleDrawer(false)}
                        >
                            {list()}
                        </Drawer>
                    </React.Fragment>

                    <Typography variant="h6" style={{flexGrow: 1, borderWidth: '50px', borderColor: 'black'}}>
                        News
                    </Typography>
                    <Button color="inherit">Login</Button>
                </Toolbar>
            </AppBar>
        </header>
    )
};

export default TopNavBar;