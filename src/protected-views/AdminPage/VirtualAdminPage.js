import React, {useContext, useEffect, useState} from "react"
import Container from '@material-ui/core/Container';
import {makeStyles} from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import DashboardOption from "./components/DashboardOption";
import Grid from '@material-ui/core/Grid';
import BorderGuard from "../../components/BorderGuard/BorderGuard";
import MalkiBlogImg from "resources/images/malki_blog.jpg"
import HomeImg from "resources/images/humaans_home.jpg"
import BuyImg from "resources/images/buyinghouse.jpg"
import LeaseImg from "resources/images/lease.png"
import CurrentListingImg from "resources/images/searching.jpg"
import SellImg from "resources/images/undraw_for_sale_viax.png"
import {pageToPageName} from "../../constants";
import {colorScheme} from "../../constants/styles";
import {FittedText, StyledText} from "../../components/Text";
import Typography from "@material-ui/core/Typography";
const useStyles = makeStyles((theme) => ({
    title:{
        marginTop:theme.spacing(2),
        fontFamily: 'airbnb-medium',
        color :'aliceblue',
        fontSize:40,
        textDecoration:'underline',
    },
    root: {
        backgroundColor: theme.palette.background.default,
        //border: `2px solid aliceblue`,
        width: '90%',
        margin: theme.spacing(10),
        marginTop:0
    },
    paper: {
        marginTop: theme.spacing(10),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.secondary.main,
    },
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(1),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
}));

/*
* components
* */
const VirtualAdminPage = () => {
    const classes = useStyles();

    const options = [
        {title: pageToPageName["HomePage"], img: HomeImg, color: colorScheme.general.hot_purple},
        {title: pageToPageName["BlogPage"], img: MalkiBlogImg, color: colorScheme.general.oneMore_blue},
        {title: pageToPageName["CurrentListingsPage"], img: CurrentListingImg, color: colorScheme.general.teal},
        {title: pageToPageName["BuyersPage"], img: BuyImg, color: colorScheme.general.punch},
        {title: pageToPageName["SellersPage"], img: SellImg, color: colorScheme.general.light_orange},
        {title: pageToPageName["LeasePage"], img: LeaseImg, color: colorScheme.other.triadic0},
    ]

    return (
        <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', width:'100vw'}}>
            <BorderGuard/>
            <Grid container component={'main'} className={classes.root} spacing={5} direction="row"
                  justify="space-evenly"
                  alignItems="center"
            >
                <CssBaseline/>

                <Grid item sm={12} xs={12} md={12}>
                    <div style={{width:'100%', display:'flex',alignItems:'center',justifyContent:'center'}}>
                                            <FittedText variant="h1" component="h1" gutterBottom className={classes.title}> Manage Views </FittedText>

                    </div>
                </Grid>

                {options.map((value, index) => {
                    return <DashboardOption {...value} key={index}/>
                })
                }
            </Grid>
        </div>)


};

export default VirtualAdminPage;