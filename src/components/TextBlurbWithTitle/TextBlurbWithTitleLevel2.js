import React, {useState} from "react"
import {makeStyles} from '@material-ui/core/styles';
import {StyledText} from "../Text";
import PropTypes from 'prop-types';
import Typography from "@material-ui/core/Typography";
import textArrayToParagraph from "../Utility/textArrayToParagraph";
import {colorScheme} from "../../constants";
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
        color: colorScheme.text.primary,
        letterSpacing: 1.5,
        paddingBottom: theme.spacing(3),
        textAlign: 'left',
        [theme.breakpoints.down("sm")]: {
            fontSize: 35,
        },

    },
    blurb: {
        fontFamily: 'airbnb-book',
        color: colorScheme.text.secondary,
        textAlign: 'left',
    },
    secondaryTitle: {
        fontFamily: 'airbnb-black',
        fontSize: 25,
        color: colorScheme.text.primary,
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
        color: colorScheme.text.secondary,
        textAlign: 'left',
    },
    secondaryBlurbP2: {
        fontFamily: 'airbnb-book',
        color: colorScheme.text.secondary,
        textAlign: 'left',
        marginTop: theme.spacing(3),
    }
}));


const TextBlurbWithTitleLevel2 = ({mainBlurbArray, mainTitle,secondaryBlurbArray, secondaryTitle}) => {
    const classes = useStyles();

    return (
        <div className={classes.root}>
            <StyledText className={classes.title}>{mainTitle}</StyledText>
            {textArrayToParagraph({paragraphArray:mainBlurbArray, alignLeft:true, className:classes.blurb}) }
            <StyledText className={classes.secondaryTitle}>{secondaryTitle}</StyledText>
            {textArrayToParagraph({paragraphArray:secondaryBlurbArray, alignLeft:true, className:classes.blurb}) }

        </div>
    )
};



TextBlurbWithTitleLevel2.propTypes = {
    mainTitle: PropTypes.string.isRequired,
    mainBlurbArray: PropTypes.array.isRequired,
    secondaryTitle: PropTypes.string.isRequired,
    secondaryBlurbArray: PropTypes.array.isRequired
};


export default TextBlurbWithTitleLevel2;