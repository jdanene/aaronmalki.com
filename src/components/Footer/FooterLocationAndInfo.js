import React from "react";
import {
    Grid,

} from "@material-ui/core";

import PhoneIcon from "@material-ui/icons/Phone";
import MailIcon from "@material-ui/icons/Mail";
import {FittedText, StyledText} from "../Text";

import makeStyles from "@material-ui/core/styles/makeStyles";
import {useTheme} from "@material-ui/core";

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
const FooterLocationAndInfo = ({phoneNumber,email,address,license}) => {



    const classes = useStyles();
    const theme = useTheme();

    return (
        <Grid item xs={12} sm={12} md={4} lg={6}  style={{ flexShrink: 1}} component={'div'}>

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
                <FittedText className={classes.credential}>CalBRE LICENSE# {license}</FittedText>
            </div>

            <div style={{height:'20px'}}/>
            <div>
                <FittedText className={classes.address_container}>
                    {address.line1} <br/>
                     {address.line2} <br/>
                    <a  className={classes.address_container} href={`tel:${phoneNumber.tel}`}>{phoneNumber.dot}</a>  <br/>
                    <a href={`mailto:${email}`} className={classes.email}> {email} </a>
                </FittedText>
            </div>
            <div style={{height:'20px'}}/>

            <StyledText className={classes.bio}>
                Aaron is a licensed real estate agent in the state of California and abides by Equal Housing Opportunity laws. License #{license}.
            </StyledText>
        </Grid>
    )
};

export default FooterLocationAndInfo;