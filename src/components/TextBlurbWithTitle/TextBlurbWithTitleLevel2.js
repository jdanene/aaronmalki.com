import React, {useState} from "react"
import {makeStyles} from '@material-ui/core/styles';
import {StyledText} from "../Text";
import PropTypes from 'prop-types';
import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-start',
        justifyContent: 'center',
    },
    title: {

        fontFamily: 'airbnb-black',
        fontSize: 40,
        color: 'theme.palette.text.primary',
        letterSpacing: 1.5,
        paddingBottom: theme.spacing(3),
        textAlign: 'left',
        [theme.breakpoints.down("sm")]: {
            fontSize: 35,
        },

    },
    blurb: {
        fontFamily: 'airbnb-book',
        color: theme.palette.text.secondary,
        textAlign: 'left',
    },
    secondaryTitle: {
        fontFamily: 'airbnb-black',
        fontSize: 25,
        color: 'theme.palette.text.primary',
        letterSpacing: 1.5,
        paddingTop: theme.spacing(3),
        paddingBottom: theme.spacing(3),
        textAlign: 'left',
        [theme.breakpoints.down("sm")]: {
            fontSize: 20,
        },
    },
    secondaryBlurb: {
        fontFamily: 'airbnb-book',
        color: theme.palette.text.secondary,
        textAlign: 'left',
    },
    secondaryBlurbP2: {
        fontFamily: 'airbnb-book',
        color: theme.palette.text.secondary,
        textAlign: 'left',
        marginTop: theme.spacing(3),
    }
}));


const TextBlurbWithTitleLevel2 = ({mainTitle, mainBlurb, secondaryTitle, secondaryBlurb, secondaryBlurb_p2 }) => {
    const classes = useStyles();

    return (
        <div className={classes.root}>
            <StyledText className={classes.title}>{mainTitle}</StyledText>
            <Typography gutterBottom variant={'body1'} className={classes.blurb}>{mainBlurb}</Typography>
            <StyledText className={classes.secondaryTitle}>{secondaryTitle}</StyledText>
            <Typography gutterBottom variant={'body1'} className={classes.secondaryBlurb}>{secondaryBlurb}</Typography>
            {secondaryBlurb_p2&&<Typography gutterBottom variant={'body1'} className={classes.secondaryBlurbP2}>{secondaryBlurb_p2}</Typography>}

        </div>
    )
};

TextBlurbWithTitleLevel2.propTypes = {
    mainTitle: PropTypes.string.isRequired,
    mainBlurb: PropTypes.string.isRequired,
    secondaryTitle: PropTypes.string.isRequired,
    secondaryBlurb: PropTypes.string.isRequired
};


export default TextBlurbWithTitleLevel2;