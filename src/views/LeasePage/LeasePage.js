import React, {useContext, useEffect, useState} from "react"
import ImageCarousel from "./components/ImageCarousel/ImageCarousel";
import BorderGuard from "../../components/BorderGuard/BorderGuard";
import Grid from "@material-ui/core/Grid";
import {useMediaQuery} from "@material-ui/core";
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    root: {
        paddingLeft: theme.spacing(5),
        paddingRight: theme.spacing(5),
        paddingBottom: theme.spacing(5),
        display: "flex",
        alignContent: "center",
        alignItems: "center",
        flexDirection:'column'
    },
    borderGuard:{
        marginBottom: theme.spacing(5),

    }
}));

const LeasePage = () => {
    const mobileBreak = useMediaQuery("only screen and (max-width: 600px)");
    const classes = useStyles();

    return <div className={classes.root}>
        <BorderGuard className={classes.borderGuard}/>
        <Grid container spacing={mobileBreak ? 3 : 7}>
            <Grid sm={12} md={6} item>
                <ImageCarousel/>
            </Grid>

        </Grid>
    </div>

};

export default LeasePage;