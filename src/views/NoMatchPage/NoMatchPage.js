import React from "react";
import {
    useLocation
} from "react-router-dom";
import BorderGuard from "../../components/BorderGuard/BorderGuard";
import {makeStyles} from '@material-ui/core/styles';
import BackgroundGif from "resources/images/90s_kid.gif";
import BackgroundCrazy from "resources/images/backgroundCrazy.png";
import Typography from "@material-ui/core/Typography";

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
        backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.45), rgba(0, 0, 0, 0.45)), url(${BackgroundCrazy})`,

        //mixBlendMode: 'overlay',
        //background: '#121212'
    },
    title: {
        fontFamily: "'airbnb-bold', cursive",
        fontSize: '144px',
        display: 'flex',
        alignItems: 'center',
        backgroundSize: 'cover',
        justifyContent: 'center',
        color:'white'
    },
    message:{
        color:'white',
        fontFamily: "'airbnb-bold', cursive",
    }
}));


const styles = theme => ({
    footerInner: {}
});


const NoMatch = () => {
    const location = useLocation();
    const classes = useStyles();

    return (
        <div className={classes.root} >

            <div className={ classes.title}>
               404
            </div>
            <Typography component={'h4'} variant={'h4'} className={classes.message}>
                Page Not Found
            </Typography>
        </div>
    );
};

export default NoMatch;