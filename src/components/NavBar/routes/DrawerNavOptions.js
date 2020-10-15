import React, {useEffect, useState} from "react";
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
} from "react-router-dom";
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';
import List from '@material-ui/core/List';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import MailIcon from '@material-ui/icons/Mail';
import PropTypes from "prop-types";
import {pageToPathName, pageToPageName} from "../../../constants";

const TopItem = ({page, isSelected = false}) => {
    return (
        <Link to={pageToPathName[page]}>
            <ListItem button key={page} selected={isSelected}>
                <ListItemText primary={pageToPageName[page]}/>
            </ListItem>
        </Link>
    )
};


TopItem.propTypes = {
    page: PropTypes.string.isRequired,
    isSelected: PropTypes.bool
};

const BottomItem = ({page, isSelected = false}) => {
    return (
        <Link to={pageToPathName[page]}>
            <ListItem button key={page} selected={isSelected}>
                <ListItemIcon> <MailIcon/> </ListItemIcon>
                <ListItemText primary={pageToPageName[page]}/>
            </ListItem>
        </Link>
    )
};

BottomItem.propTypes = {
    page: PropTypes.string.isRequired,
    isSelected: PropTypes.bool
};

const DrawerNavOptions = ({toggleDrawerCallback, pageSelected}) => {

    const topRouteTitles = ['HomePage', 'CurrentListingsPage', 'BuyersPage', 'SellersPage'];
    const bottomRouteTitles = ['ContactUsPage'];

    return (
            <div
                style={{width: 'auto'}}
                role="presentation"
                onClick={toggleDrawerCallback(false)}
                onKeyDown={toggleDrawerCallback(false)}
            >
                <List>
                    {topRouteTitles.map((page) => (<TopItem page={page} isSelected={page === pageSelected}/>))}
                </List>
                <Divider/>
                <List>
                    {bottomRouteTitles.map((page) => (<BottomItem page={page} isSelected={page === pageSelected}/>))}
                </List>
            </div>
    )
};

DrawerNavOptions.propTypes = {
    toggleDrawerCallback: PropTypes.func.isRequired,
    pageSelected: PropTypes.string //ToDo: make this required.
};

DrawerNavOptions.defaultProps = {
    pageSelected: "HomePage"
};

export default DrawerNavOptions;