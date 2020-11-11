import React from "react"
import {StyledText} from "../Text";
import {makeStyles} from '@material-ui/core/styles';
import PropTypes from 'prop-types';

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-start',
        flexGrow: 1,
        flexShrink: 1,
        marginBottom: theme.spacing(2),
        marginTop: theme.spacing(4),
        padding:0,
        borderBottom: `1px solid rgba(27, 48, 57, .25)`,
        width: '100%'
    },
    text:{
        fontFamily: 'raleway-regular',
        letterSpacing: 1,
        fontWeight:'bold',
        color: theme.palette.text.primary,
        [theme.breakpoints.only("xs")]: {
            fontSize: '20px'
        },
        [theme.breakpoints.only("sm")]: {
            fontSize: '20px'
        },
        [theme.breakpoints.only("md")]: {
            fontSize: '20px'
        },
        [theme.breakpoints.only("lg")]: {
            fontSize: '20px'
        },
        [theme.breakpoints.only("xl")]: {
            fontSize: '20px'
        }
    },
}));

const FormDivider = ({title})=>{
    const classes = useStyles();

    return <div className={classes.root}>
       <StyledText className={classes.text}>
           {title}
       </StyledText>
    </div>

};

FormDivider.propTypes = {
    title: PropTypes.string.isRequired
};

export default FormDivider;