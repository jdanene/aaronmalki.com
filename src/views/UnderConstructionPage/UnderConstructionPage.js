import React from "react";
import BorderGuard from "../../components/BorderGuard/BorderGuard";
import {makeStyles} from '@material-ui/core/styles';
import BackgroundGif3 from "resources/images/underConstruction.gif";
import Typography from "@material-ui/core/Typography";

const imgs = [BackgroundGif3];
const useStyles = makeStyles((theme) => ({
    root: {

        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        width: '100vw',
        height: '100vh',
        backgroundSize: '100% 100%',
        backgroundRepeat: "no-repeat",
        // backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.45), rgba(0, 0, 0, 0.45)), url(${BackgroundGif})`,

        //mixBlendMode: 'overlay',
        //background: '#121212'
    },
    message: {
        color: 'white',
        fontFamily: "'airbnb-bold', cursive",
    }
}));


const UnderConstructionPage = () => {
    const classes = useStyles();

    return (
        <div className={classes.root}
             style={{backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.45), rgba(0, 0, 0, 0.45)), url(${imgs[Math.floor(Math.random() * imgs.length)]})`}}>
            <BorderGuard/>
            <Typography component={'h4'} variant={'h4'} className={classes.message}>
                Under Construction
            </Typography>

        </div>
    );
};

export default UnderConstructionPage;