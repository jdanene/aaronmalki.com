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
import {FittedText} from "../../components/Text";

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
        border: '1px solid red',
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
        border: '1px solid blue',
        flexGrow: 1,
        flexShrink: 1,
        marginTop: '90px',
        marginBottom: '45px'
    },

    map_container: {
        border: '1px solid pink',
        flexShrink: 1,
        flexGrow: 1,
        [theme.breakpoints.up("xs")]: {
            height: '500px'
        },
        [theme.breakpoints.up("sm")]: {
            height: '400px'
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
        flexGrow: 1,
        flexShrink: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: theme.palette.secondary.dark,

    },
    contact_container: {
        display: 'flex',
        width: '100%',
        marginTop: '200px',
        height: '100%',


    },
    credentialname: {
        textAlign: 'left',
        color: theme.palette.common.white,
        border: '1px solid purple',

    },
    address: {
        color: theme.palette.common.white,
        textAlign: 'left',
        border: '1px solid orange',
        width: '100%',
        height: '100%',
        margin: 0,


    },
    address_container: {
        backgroundColor: theme.palette.primary.main,
        border: '1px solid purple',
        height: '30%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column',
    },
    email: {
        color: theme.palette.common.white
    },
});

const SendMessage = ({classes, theme, width, center, zoom, md=4, lg=4, xl=4, sm=5, xs=12}) => {

    return (
        <Grid item md={md} lg={lg} xl={xl} sm={sm} xs={xs}
              style={{
                  border: '1px solid pink', height: '100%'
              }}>
            <Box mb={1}>
                <TextField
                    variant="outlined"
                    multiline
                    placeholder="Get in touch with Aaron!"
                    inputProps={{"aria-label": "Get in Touch"}}
                    InputProps={{
                        className: classes.whiteBg
                    }}
                    rows={4}
                    fullWidth
                    required
                />
            </Box>
            <ColoredButton
                color={theme.palette.common.white}
                variant="outlined"
                type="submit"
            >
                Send Message
            </ColoredButton>
        </Grid>
    )
};

export default withWidth()(withStyles(styles, {withTheme: true})(SendMessage));