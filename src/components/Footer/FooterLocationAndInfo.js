import React, {useContext} from "react";
import PropTypes from "prop-types";
import {
    Grid,
    Typography,
    Box,
    IconButton,
    Hidden,
    withStyles,
    withWidth,
    isWidthUp,
    TextField
} from "@material-ui/core";
import {ColoredButton} from "../Button"
import {WaveBorder} from "../WaveBorder"
import PhoneIcon from "@material-ui/icons/Phone";
import MailIcon from "@material-ui/icons/Mail";
import transitions from "@material-ui/core/styles/transitions";
import {FittedText, StyledText} from "../Text";
import {VscLocation} from "react-icons/vsc";
import {BiPhone} from "react-icons/bi";
import {colorScheme} from "../../constants";
import Link from "@material-ui/core/Link";
import FooterListItem from "./FooterListItem";
import makeStyles from "@material-ui/core/styles/makeStyles";
import {VerticalDivider} from "../VerticalDivider";
import {useTheme} from "@material-ui/core";
import {AppContext} from "../../context";

const useStyles = makeStyles((theme) => ({
    credentialsTitle_container: {
        display: "flex",
        flexDirection: "row",
    },
    name_container:{
        display: "flex",
        flexDirection: "row",
        color:  theme.palette.primary.dark,
        fontSize: "16px"
    },
    ownername:{
        fontFamily: "raleway-regular, serif",
        fontWeight: "bold",
        letterSpacing:"1.5px",
        color:  theme.palette.primary.dark,
        fontSize: "15.5px"
    },
    companyname:{
        fontFamily: "raleway-thin, serif",
        fontSize: "16.5px",
        letterSpacing:"0.5px",

    },
    credential_container:{
        display:'flex',
        flexDirection:"column",
        maxWidth: "200px",
        marginTop: "-20px"
    },
    credential:{
        textAlign:'left',
        color: theme.palette.text.secondary,
        fontSize:"8px"
    },
    credentialname:{
        textAlign:'left',
        color: theme.palette.primary.dark,
        fontSize:"10px"
    },
    address_container:{
        color:  theme.palette.text.secondary,
        textAlign:'left',
        maxWidth: '180px',
        textDecoration:'none'
    },
    email:{
        color:  theme.palette.text.secondary
    },
    bio:{
        color: "#F5F5F5",
        textAlign:'left',
        fontSize:"12px",
        fontFamily:"raleway-thin, serif",
        fontWeight: "bold"
    }
}));


const infos = [
    {
        icon: <PhoneIcon/>,
        description: "+1 555 123456"
    },
    {
        icon: <MailIcon/>,
        description: "support@company.com"
    }
];

// {theme.palette.common.white}
const FooterLocationAndInfo = () => {
    const {phoneNumber} = useContext(AppContext);
    const classes = useStyles();
    const theme = useTheme();

    return (
        <Grid item xs={12} sm={12} md={4} lg={6}  style={{ flexShrink: 1}}>

            {/*
            <div className={classes.name_container} style={{border: "1px solid black"}}>
                <FittedText className={classes.ownername} style={{border: "1px solid black"}}>
                    AARON MALKI
                </FittedText>
                <VerticalDivider margin={"6px"} size={'100%'} color={theme.palette.primary.main}/>
                <FittedText  className={classes.companyname} > Compass </FittedText>
            </div>
            */}

            <div className={classes.credential_container}>
                <FittedText className={classes.credentialname}>Aaron Malki</FittedText>
                <FittedText className={classes.credential}>CalBRE LICENSE# 01704234</FittedText>
            </div>

            <div style={{height:'20px'}}/>
            <div>
                <FittedText className={classes.address_container}>
                    891 Beach Steet <br/>
                    San Francisco CA 94109 <br/>
                    <a  className={classes.address_container} href={`tel:${phoneNumber.tel}`}>{phoneNumber.dot}</a>  <br/>
                    <a href={"mailto:aaronmalki@malki.com"} className={classes.email}> aaronmalki@malki.com </a>
                </FittedText>
            </div>
            <div style={{height:'20px'}}/>

            <StyledText className={classes.bio}>
                Compass is a licensed real estate brokerage firm in California and abides by Equal Housing Opportunity laws. License #01991628.
            </StyledText>
        </Grid>
    )
};

export default FooterLocationAndInfo;