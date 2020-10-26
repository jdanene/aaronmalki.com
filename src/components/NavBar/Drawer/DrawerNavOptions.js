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
import {pageToPathName, pageToPageName, colorScheme} from "../../../constants";
import "./DrawerNavOptions.scss"
import { SiMicroDotBlog } from "react-icons/si";

const TopItem = ({page, isSelected}) => {
    console.log(`TopItem(page=${page}, selected=${isSelected}`);

    return (
        <Link  key={page} to={pageToPathName[page]} className={"drawer_link_container"}>
            <ListItem
                style={{display: "flex"}}
                key={page}

            >
                {isSelected ?
                    <ListItemText primary={pageToPageName[page]} className={"drawer_link"}
                                  style={{color: colorScheme.primary.dark}}/>

                    :

                    <ListItemText primary={pageToPageName[page]} className={"drawer_link"}/>}
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
        <Link key={page} to={pageToPathName[page]} className={"drawer_link_container"}>
            <ListItem key={page}>
                <ListItemIcon>
                    {page==="BlogPage"? <SiMicroDotBlog size={25}/> :<MailIcon /> }
                </ListItemIcon>

                {isSelected ?
                    <ListItemText primary={pageToPageName[page]} className={"drawer_link"}
                                  style={{color: colorScheme.primary.dark, marginLeft: "-15px"}}/>

                    :
                    <ListItemText primary={pageToPageName[page]} className={"drawer_link"}
                                  style={{marginLeft: "-15px"}}/>}
            </ListItem>
        </Link>
    )
};

BottomItem.propTypes = {
    page: PropTypes.string.isRequired,
    isSelected: PropTypes.bool
};

const DrawerNavOptions = ({toggleDrawerCallback, pageSelected}) => {

    const topRouteTitles = ['HomePage', 'BuyersPage', 'SellersPage','LeasePage'];
    const bottomRouteTitles = ['ContactUsPage','BlogPage'];

    return (
        <div
            style={{width: 'auto'}}
            role="presentation"
            onClick={toggleDrawerCallback(false)}
            onKeyDown={toggleDrawerCallback(false)}
        >
            <List>
                {topRouteTitles.map((page) => (<TopItem  page={page} isSelected={page === pageSelected}/>))}
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