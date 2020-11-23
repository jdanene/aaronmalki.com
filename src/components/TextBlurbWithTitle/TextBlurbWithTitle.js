import React from "react"
import {makeStyles} from '@material-ui/core/styles';
import {StyledText} from "../Text";
import PropTypes from 'prop-types';
import textArrayToParagraph from "../Utility/textArrayToParagraph";
import {colorScheme} from "../../constants";

const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-start',
        justifyContent: 'center',
        textAlign:'left'
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
    smallTitle: {

        fontFamily: 'airbnb-black',
        fontSize: 30,
        color: colorScheme.text.primary,
        letterSpacing: 1.5,
        paddingBottom: theme.spacing(3),
        textAlign: 'left',
        [theme.breakpoints.down("sm")]: {
            fontSize: 25,
        },

    },
    blurb: {
        fontFamily: 'airbnb-book',
        color: colorScheme.text.secondary,
    },
    blurb2: {
        fontFamily: 'airbnb-book',
        color: colorScheme.text.secondary,
        paddingTop: theme.spacing(3),

    }
}));


const TextBlurbWithTitle = ({title, paragraphArray, smallTitle, alignLeft}) => {
    const classes = useStyles();
    return (
        <div className={classes.root}>
            <StyledText className={smallTitle ? classes.smallTitle : classes.title}>{title}</StyledText>
            {textArrayToParagraph({paragraphArray,alignLeft,className:classes.blurb})}
        </div>
    )
};

TextBlurbWithTitle.propTypes = {
    title: PropTypes.string.isRequired,
    paragraphArray: PropTypes.array.isRequired,
    smallTitle:PropTypes.bool,
    alignLeft:PropTypes.bool

};


export default TextBlurbWithTitle;