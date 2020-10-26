import React, {useContext, useEffect, useState} from "react"
import BuyerForm from "./components/BuyerForm/BuyerForm";
import {colorScheme} from "../../constants";
import BuyerImageAndDescription from "./components/BuyerImageAndDescription/BuyerImageAndDescription";
import Typography from "@material-ui/core/Typography";
import {makeStyles} from '@material-ui/core/styles';
import BuyerTopImg from "resources/images/buyerpage_top.png"
import PageViewTopHalf from "../../components/PageViewTopHalf/PageViewTopHalf";
const useStyles = makeStyles((theme) => ({
    formPlug: {
        fontFamily:'airbnb-bold',
        fontSize:23,
        marginTop:theme.spacing(6),
        marginBottom: theme.spacing(2)
    },
    topHalfImg:{
        background: `linear-gradient( rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5) ), url(${BuyerTopImg})`,
                width: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: 'white',
        flexDirection: 'column',
        backgroundPosition: "top center",
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
    }
}));

const FormPlug =()=>{
    const classes = useStyles();

    return(
        <Typography component={'h2'} className={classes.formPlug}>
            Let us know what you are looking for.
        </Typography>
    )
};

const BuyersPage = () => {
    const classes = useStyles();

    return <div style={{
        display: "flex",
        flexDirection: "column",
        width: '100%',
        height: '100%',
        alignContent: "center",
        alignItems: "center",
        backgroundColor: colorScheme.other.backgroundComplementary
    }}>

        <PageViewTopHalf middleText={'Buying a home, the easy way.'} className={classes.topHalfImg}/>


        <div style={{
            marginTop: '45px',
            marginBottom: '45px',
            display: 'flex',
            width: "90%",
            justifyContent: 'center',
            alignItems: 'center',
            flexDirection: 'column'
        }}>
            <BuyerImageAndDescription/>
            <FormPlug/>
            <BuyerForm/>
        </div>
    </div>

};

export default BuyersPage;