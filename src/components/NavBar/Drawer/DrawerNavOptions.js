import React, {useContext, useEffect, useState} from "react";
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
import {SiMicroDotBlog} from "react-icons/si";
import isPathMatch from "../../Utility/isPathMatch";
import matchPath from "react-router/modules/matchPath";
import isObjectEmpty from "../../Utility/isObjectEmpty";
import {AppContext} from "../../../context";
import Button from "../../Button";
import { RiAdminLine } from "react-icons/ri";
import {pageToPageName as adminPageToPageName, pageToPathName as adminPageToPathName} from "views-protected/protected-views"


const TopItem = ({page, isSelected}) => {
    console.log(`TopItem(page=${page}, selected=${isSelected}`);

    return (
        <Link key={page} to={pageToPathName[page]} className={"drawer_link_container"}>
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
                    {page === "BlogPage" ? <SiMicroDotBlog size={25}/> : page==="ContactUsPage"? <MailIcon/>:<RiAdminLine size={25}/>}
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

const AdminItem = ({isSelected = false}) => {


    return (
        <Link key={adminPageToPageName["AdminPage"]} to={adminPageToPathName["AdminPage"]} className={"drawer_link_container"}>
            <ListItem key={adminPageToPageName["AdminPage"]}>
                <ListItemIcon>
                   <RiAdminLine size={25} color={colorScheme.general.hot_purple}/>
                </ListItemIcon>

                {isSelected ?
                    <ListItemText primary={adminPageToPageName["AdminPage"]} className={"drawer_link"}
                                  style={{color: colorScheme.general.hot_purple, marginLeft: "-15px"}}/>

                    :
                    <ListItemText primary={adminPageToPageName["AdminPage"]} className={"drawer_link"}
                                  style={{marginLeft: "-15px"}}/>}
            </ListItem>
        </Link>
    )
};



const DrawerNavOptions = ({toggleDrawerCallback, locationPathName}) => {
    const {auth} = useContext(AppContext);

    const pathMatcherExact= (targetPath) => {
        return !isObjectEmpty(matchPath(locationPathName,{path:targetPath,exact:true}))
    };

    const pathMatcherFuzzy= (targetPath) => {
        return !isObjectEmpty(matchPath(locationPathName,{path:targetPath}))
    };



    const topRouteTitles = ['HomePage', 'BuyersPage', 'LeasePage'];
    const bottomRouteTitles = ['ContactUsPage', 'BlogPage'];

    return (
        <div
            style={{width: 'auto'}}
            role="presentation"
            onClick={toggleDrawerCallback(false)}
            onKeyDown={toggleDrawerCallback(false)}
        >
            <List>
                {topRouteTitles.map((page) => (<TopItem key={page} page={page} isSelected={pathMatcherExact(pageToPathName[page])}/>))}
            </List>
            <Divider/>
            <List>
                {bottomRouteTitles.map((page) => (
                    <BottomItem page={page} key={page} isSelected={pathMatcherFuzzy(pageToPathName[page])}/>))}
            </List>

            {/*Admin Page*/}
            {auth.user&&
            <React.Fragment>
                <Divider/>
                <AdminItem isSelected={pathMatcherExact(adminPageToPathName["AdminPage"])}/>
            </React.Fragment>}
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