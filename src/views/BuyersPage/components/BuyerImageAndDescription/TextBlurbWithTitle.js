import React, { useState} from "react"
import {makeStyles} from '@material-ui/core/styles';
import {StyledText} from "../../../../components/Text";
import PropTypes from 'prop-types';
import Typography from "@material-ui/core/Typography";
const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-start',
        justifyContent:'center',
    },
    title:{

        fontFamily:'airbnb-black',
        fontSize: 40,
        color: 'theme.palette.text.primary',
        letterSpacing:1.5,
        paddingBottom: theme.spacing(3),
        textAlign: 'left',
        [theme.breakpoints.down("sm")]: {
            fontSize: 35,
        },

    },
     blurb:{
        fontFamily:'airbnb-book',
        color: theme.palette.text.secondary,

     }
}));


const TextBlurbWithTitle = ({title,blurb}) =>{
    const classes = useStyles();

    return(
        <div className={classes.root}>
            <StyledText className={classes.title}>{title}</StyledText>
            <Typography gutterBottom variant={'body1'} className={classes.blurb}>{blurb}</Typography>
        </div>
    )
};

TextBlurbWithTitle.propTypes = {
    title: PropTypes.string.isRequired,
    blurb: PropTypes.string.isRequired

};


export default TextBlurbWithTitle;