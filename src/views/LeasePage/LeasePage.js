import React, {useContext, useEffect, useState} from "react"
import ImageCarousel from "./components/ImageCarousel/ImageCarousel";
import BorderGuard from "../../components/BorderGuard/BorderGuard";
import Grid from "@material-ui/core/Grid";
import {useMediaQuery} from "@material-ui/core";
import {makeStyles} from '@material-ui/core/styles';
import LeaseTopImg from "resources/images/leasePage/leasingpagepic1.png"
import {colorScheme} from "../../constants";
import PageViewTopHalf from "../../components/PageViewTopHalf/PageViewTopHalf";

const useStyles = makeStyles((theme) => ({
    formPlug: {
        fontFamily: 'airbnb-bold',
        fontSize: 23,
        marginTop: theme.spacing(6),
        marginBottom: theme.spacing(2)
    },
    topHalfImg: {
       // background: `linear-gradient( rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5) ), url(${LeaseTopImg})`,
        width: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: 'white',
        flexDirection: 'column',
        backgroundPosition: "top center",
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
    },
    root: {
        width: '100%',
        height: '100%',

        display: "flex",
        alignContent: "center",
        alignItems: "center",
        flexDirection: 'column',
        backgroundColor: colorScheme.other.backgroundComplementary

    },
    body: {
        display: 'flex',
        alignContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
        padding: theme.spacing(5),
    }
}));


const LeasePage = () => {
    const mobileBreak = useMediaQuery("only screen and (max-width: 600px)");
    const classes = useStyles();

    return <div className={classes.root}>
        <PageViewTopHalf middleText={'Stress free leasing.'} className={classes.topHalfImg} img={LeaseTopImg}/>
        <div className={classes.body}>
            <Grid container spacing={mobileBreak ? 3 : 7}>
                <Grid sm={12} md={6} item>
                    <ImageCarousel/>
                </Grid>
            </Grid>
        </div>
    </div>

};

export default LeasePage;