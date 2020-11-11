import React, { useState} from "react"
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
        smallTitle:{

        fontFamily:'airbnb-black',
        fontSize: 30,
        color: 'theme.palette.text.primary',
        letterSpacing:1.5,
        paddingBottom: theme.spacing(3),
        textAlign: 'left',
        [theme.breakpoints.down("sm")]: {
            fontSize: 25,
        },

    },
     blurb:{
        fontFamily:'airbnb-book',
        color: theme.palette.text.secondary,
     },
     blurb2:{
        fontFamily:'airbnb-book',
        color: theme.palette.text.secondary,
        paddingTop: theme.spacing(3),

     }
}));


const TextBlurbWithTitle = ({title,blurb, blurb2, smallTitle, alignLeft}) =>{
    const classes = useStyles();

    const styles={textAlign:alignLeft?'left':null};

    return(
        <div className={classes.root}>
            <StyledText className={smallTitle?classes.smallTitle: classes.title}>{title}</StyledText>
            <Typography style={styles} gutterBottom variant={'body1'} className={classes.blurb}>{blurb}</Typography>

            {blurb2&&<Typography style={styles} gutterBottom variant={'body1'} className={classes.blurb2}>{blurb}</Typography>}
        </div>
    )
};

TextBlurbWithTitle.propTypes = {
    title: PropTypes.string.isRequired,
    blurb: PropTypes.string.isRequired

};


export default TextBlurbWithTitle;