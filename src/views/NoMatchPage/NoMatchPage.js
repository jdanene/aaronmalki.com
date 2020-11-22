import React, {useContext} from "react";
import BorderGuard from "../../components/BorderGuard/BorderGuard";
import {makeStyles} from '@material-ui/core/styles';

import BackgroundGif3 from "resources/images/greengoo.gif";
import BackgroundGif4 from "resources/images/vibes.dms";
import SeoTags from "../../components/SeoTags/SeoTags";
import Typography from "@material-ui/core/Typography";
import {AppContext} from "../../context";
import {DB_NODES_PAGES} from "../../constants/contants";
import {withRouter} from "react-router";

const imgs = [BackgroundGif3,BackgroundGif4,BackgroundGif4,BackgroundGif4,BackgroundGif4];



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




const NoMatch = ({location}) => {

    const classes = useStyles();
    const {
        pageState: {
            [DB_NODES_PAGES.settings]: {
                companyName
            }
        },
    } = useContext(AppContext);
    let img = imgs[Math.floor(Math.random() * imgs.length)];
    return (
        <div className={classes.root} style={{ backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.45), rgba(0, 0, 0, 0.45)), url(${img})`}}>

            <SeoTags description={"Page Not Found"}
                     companyName={companyName}
                     title={"404"}
                     path={location.pathname}
                     img={img}
            />

            <BorderGuard/>
            <div className={ classes.title}>
               404
            </div>
            <Typography component={'h4'} variant={'h4'} className={classes.message}>
                Page Not Found
            </Typography>
        </div>
    );
};

export default withRouter(NoMatch);