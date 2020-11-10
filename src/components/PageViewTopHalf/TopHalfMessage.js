import React from "react"
import Typography from "@material-ui/core/Typography";
import {makeStyles} from '@material-ui/core/styles';
const useStyles = makeStyles((theme) => ({
    formPlug: {
        fontFamily:'airbnb-bold',
        fontSize:23,
        marginTop:theme.spacing(6),
        marginBottom: theme.spacing(2)
    }
}));

const TopHalfMessage =({message})=>{
    const classes = useStyles();

    return(
        <Typography component={'h2'} className={classes.formPlug}>
            {message}
        </Typography>
    )
};

export default TopHalfMessage;