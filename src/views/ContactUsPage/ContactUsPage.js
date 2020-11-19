import React, {useContext, useEffect, useState} from "react"
import {firebaseConfig} from "../../App";
import GoogleMapReact from 'google-map-react';
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
import PhoneIcon from "@material-ui/icons/Phone";
import MailIcon from "@material-ui/icons/Mail";
import transitions from "@material-ui/core/styles/transitions";
import {VscLocation} from "react-icons/vsc";
import {BiPhone} from "react-icons/bi";
import {useMediaQuery} from "@material-ui/core";
import ColoredButton from "../../components/Button/ColoredButton";
import {FittedText, StyledText} from "../../components/Text";
import LocationMap from "./LocationMap";
import SendMessage from "./SendMessage";
import ShowGoogleMap from "./GoogleMaps/ShowGoogleMap";
import {colorScheme} from "../../constants";
import {AppContext} from "../../context";
import Paper from '@material-ui/core/Paper';

import BorderGuard from "../../components/BorderGuard/BorderGuard";
import {DB_NODES_PAGES, PUBLIC_PAGE_KEYS} from "../../constants/contants";
import SeoTags from "../../components/SeoTags/SeoTags";

const styles = theme => ({
    footerInner: {
        backgroundColor: theme.palette.common.darkBlack,
        paddingTop: theme.spacing(8),
        paddingLeft: theme.spacing(2),
        paddingRight: theme.spacing(2),
        paddingBottom: theme.spacing(6),
        [theme.breakpoints.up("sm")]: {
            paddingTop: theme.spacing(10),
            paddingLeft: theme.spacing(16),
            paddingRight: theme.spacing(16),
            paddingBottom: theme.spacing(10)
        },
        [theme.breakpoints.up("md")]: {
            paddingTop: theme.spacing(10),
            paddingLeft: theme.spacing(10),
            paddingRight: theme.spacing(10),
            paddingBottom: theme.spacing(10)
        }
    },
    brandText: {
        fontFamily: "'Baloo Bhaijaan', cursive",
        fontWeight: 400,
        color: theme.palette.common.white
    },
    footerLinks: {
        marginTop: theme.spacing(2.5),
        marginBot: theme.spacing(1.5),
        color: theme.palette.common.white
    },
    infoIcon: {
        color: `${theme.palette.common.white} !important`,
        backgroundColor: "#33383b !important"
    },
    socialIcon: {
        fill: theme.palette.common.white,
        backgroundColor: "#33383b",
        borderRadius: theme.shape.borderRadius,
        "&:hover": {
            backgroundColor: theme.palette.primary.light
        }
    },
    credential_container: {
        display: 'flex',
        height: '40%',
        fontSize: '20px',
        flexDirection: 'row'

    },
    socialIcon_container: {
        marginBottom: '10px',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
    },
    link: {
        cursor: "Pointer",
        color: theme.palette.common.white,
        transition: transitions.create(["color"], {
            duration: theme.transitions.duration.shortest,
            easing: theme.transitions.easing.easeIn
        }),
        "&:hover": {
            color: theme.palette.primary.light
        }
    },
    whiteBg: {
        backgroundColor: theme.palette.common.white
    },
    credentialsTitle_container: {
        display: "flex",
        flexDirection: "column"
    },
    mapAndForm_container: {
        justifyContent: 'center',
        width: '100%',
        // marginBottom: '45px',
        //border: `2px solid red`,
        flexGrow: 1
    },

    map_container: {
        //                 border: `2px solid pink`,
        width: '100%',


        [theme.breakpoints.up("xs")]: {
            height: '500px'
        },
        [theme.breakpoints.up("sm")]: {
            height: '450px'
        },
        [theme.breakpoints.up("md")]: {
            height: '600px'
        },
        [theme.breakpoints.up("lg")]: {
            height: '600px'
        },
        [theme.breakpoints.up("xl")]: {
            height: '600px'
        }
    },
    map_footer: {},
    map_map: {
        height: '75%'
    },
    main_container: {
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        paddingBottom: theme.spacing(10),
        paddingTop: theme.spacing(8),
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: colorScheme.other.backgroundComplementary,
        [theme.breakpoints.down("md")]: {
            paddingLeft: 0,
            paddingRight: 0,
        },
    },
    contact_container: {
        display: 'flex',
        width: '100%',
        height: '100%',


    },
    credentialname: {
        textAlign: 'left',
        color: theme.palette.common.white,
        fontFamily: 'scope-one-regular',
        fontWeight: 'bold',
        fontSize: '25px'

    },
    address: {
        color: theme.palette.common.white,
        textAlign: 'left',
        width: '100%',
        height: '100%',
        margin: 0,
        fontFamily: 'scope-one-regular',
        //border: `2px solid pink`,


    },
    address_container: {
        backgroundColor: colorScheme.secondary.dark,
        height: '30%',
        minHeight: '150px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column',
        borderBottomRightRadius: 5,
        borderBottomLeftRadius: 5
        // border: `2px solid pink`,
    },
    email: {
        color: theme.palette.common.white
    },
    phone: {
        textDecoration: 'none',
        color: theme.palette.common.white
    }
});


const AnyReactComponent = ({text}) => <div>{text}</div>;

const LOS_ANGELES_CENTER = [37.806279, -122.423516];
const DEFAULT_ZOOM = 13;
const ContactUsPage = ({location, classes, theme, width, center, zoom}) => {

    const {
        pageState: {
            [DB_NODES_PAGES.settings]: {
                phoneNumber, email, address, companyName,
                seo: {
                    [PUBLIC_PAGE_KEYS.ContactUsPage]: {
                        title: googleSerpTitle,
                        description: googleSerpDescription
                    }
                }
            }
        },
    } = useContext(AppContext);


    return (
        <div className={classes.main_container}>
            {/*Page content in the Google SERP Listing*/}
            <SeoTags description={googleSerpDescription}
                     companyName={companyName}
                     title={googleSerpTitle}
                     path={location.pathname}

            />

            <BorderGuard/>
            <Grid container spacing={isWidthUp("md", width) ? 10 : 5} className={classes.mapAndForm_container}>
                <SendMessage md={6} lg={6} xl={6} sm={6} xs={12}/>

                {/* The map and Location*/}
                <Grid item
                      md={6} lg={6} xl={6} sm={6} xs={12}
                      className={classes.map_container}

                >
                    <Paper style={{height: '100%', width: '100%'}}>
                        {/*The Map*/}
                        <Grid item lg={12} md={12} sm={12} xs={12} style={{height: '75%'}}>
                            <ShowGoogleMap address={address} phoneNumber={phoneNumber} email={email}/>
                        </Grid>

                        {/*The Location*/}

                        <Grid item lg={12} md={12} sm={12} className={classes.address_container}>

                            <div style={{
                                display: 'flex',
                                justifyContent: 'center',
                                flexDirection: 'column',
                                height: "100%",
                                marginTop: "5%",
                                marginBottom: "5%",

                            }}>
                                <StyledText className={classes.credentialname}>Aaron Malki</StyledText>

                                <FittedText className={classes.address}>
                                    {address.line1} <br/>
                                    {address.line2} <br/>
                                    <a className={classes.phone} href={`tel:${phoneNumber.tel}`}> {phoneNumber.dash}</a>
                                    <br/>
                                    <a href={`mailto:${email}`}
                                       className={classes.email}>{email} </a>
                                </FittedText>
                            </div>
                        </Grid>
                    </Paper>

                </Grid>


            </Grid>
        </div>)

};

ContactUsPage.defaultProps = {
    center: {
        lat: 59.95,
        lng: 30.33
    },
    zoom: 11
};


export default withWidth()(withStyles(styles, {withTheme: true})(ContactUsPage));