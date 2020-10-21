import React from "react";
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
import {StyledText} from "../Text";
import {VscLocation} from "react-icons/vsc";
import {BiPhone} from "react-icons/bi";
import {colorScheme} from "../../constants";
import Link from "@material-ui/core/Link";
import FooterListItem from "./FooterListItem";
import FooterLocationAndInfo from "./FooterLocationAndInfo";
import {useMediaQuery} from "@material-ui/core";

function Copyright() {
    return (
        <Typography variant="body2" color="textSecondary" align="center">
            {'Copyright © '}
            <Link color="inherit" href="https://material-ui.com/">
                aaronmalki.com
            </Link>{' '}
            {new Date().getFullYear()}
            {'.'}
        </Typography>
    );
}

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
            backgroundColor: theme.palette.primary.main,
        }
    },
    socialIcon_container:{
        marginBottom:'10px',
        display:'flex',
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
    address_container: {
        display: "flex"

    }
});

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

const socialIcons = [
    {
        icon: (
            <svg
                role="img"
                width="24px"
                height="24px"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
            >
                <title>GitHub</title>
                <path
                    d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
            </svg>
        ),
        label: "Github",
        href: "https://www.instagram.com"
    },
    {
        icon: (
            <svg
                role="img"
                width="24px"
                height="24px"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
            >
                <title>Facebook</title>
                <path
                    d="M23.9981 11.9991C23.9981 5.37216 18.626 0 11.9991 0C5.37216 0 0 5.37216 0 11.9991C0 17.9882 4.38789 22.9522 10.1242 23.8524V15.4676H7.07758V11.9991H10.1242V9.35553C10.1242 6.34826 11.9156 4.68714 14.6564 4.68714C15.9692 4.68714 17.3424 4.92149 17.3424 4.92149V7.87439H15.8294C14.3388 7.87439 13.8739 8.79933 13.8739 9.74824V11.9991H17.2018L16.6698 15.4676H13.8739V23.8524C19.6103 22.9522 23.9981 17.9882 23.9981 11.9991Z"/>
            </svg>
        ),
        label: "Facebook",
        href: "https://facebook.com"
    },
    {
        icon: (
            <svg
                role="img"
                width="24px"
                height="24px"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
            >
                <title>LinkedIn</title>
                <path
                    d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
            </svg>
        ),
        label: "LinkedIn",
        href: "https://www.linkedin.com/"
    },
    {
        icon: (
            <svg
                role="img"
                width="24px"
                height="24px"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
            >
                <title>Twitter</title>
                <path
                    d="M23.954 4.569c-.885.389-1.83.654-2.825.775 1.014-.611 1.794-1.574 2.163-2.723-.951.555-2.005.959-3.127 1.184-.896-.959-2.173-1.559-3.591-1.559-2.717 0-4.92 2.203-4.92 4.917 0 .39.045.765.127 1.124C7.691 8.094 4.066 6.13 1.64 3.161c-.427.722-.666 1.561-.666 2.475 0 1.71.87 3.213 2.188 4.096-.807-.026-1.566-.248-2.228-.616v.061c0 2.385 1.693 4.374 3.946 4.827-.413.111-.849.171-1.296.171-.314 0-.615-.03-.916-.086.631 1.953 2.445 3.377 4.604 3.417-1.68 1.319-3.809 2.105-6.102 2.105-.39 0-.779-.023-1.17-.067 2.189 1.394 4.768 2.209 7.557 2.209 9.054 0 13.999-7.496 13.999-13.986 0-.209 0-.42-.015-.63.961-.689 1.8-1.56 2.46-2.548l-.047-.02z"/>
            </svg>
        ),
        label: "Twitter",
        href: "https://www.twitter.com/"
    }
];

function Footer(props) {
    const mobileBreak = useMediaQuery("only screen and (max-width: 960px)");

    const {classes, theme, width} = props;
    return (
        <footer style={{backgroundColor: theme.palette.primary.light}} >
            <div
            />
            <div className={classes.footerInner}>
                <Grid container spacing={isWidthUp("md", width) ? 10 : 5} style={{ flexShrink:1}}>
                    <Grid item xs={12} md={4} lg={3} >
                        <form>
                            <Box display="flex" flexDirection="column">
                                {/*Sociual Media*/}
                                <Box display="flex" className={classes.socialIcon_container}>
                                    {socialIcons.map((socialIcon, index) => (
                                        <Box key={index} mr={index !== socialIcons.length - 1 ? 1 : 0}>
                                            <IconButton
                                                aria-label={socialIcon.label}
                                                className={classes.socialIcon}
                                                href={socialIcon.href}
                                            >
                                                {socialIcon.icon}
                                            </IconButton>
                                        </Box>
                                    ))}
                                </Box>

                                {/*
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
                                */}
                            </Box>
                        </form>
                    </Grid>

                    {!mobileBreak?
                    <React.Fragment>
                        <FooterListItem/>
                        <FooterLocationAndInfo/>
                    </React.Fragment>:
                    <React.Fragment>
                        <FooterLocationAndInfo/>
                        <FooterListItem/>
                    </React.Fragment> }


                </Grid>
            </div>
            <Box mt={5}>
                <Copyright/>
            </Box>
        </footer>
    );
}

Footer.propTypes = {
    theme: PropTypes.object.isRequired,
    classes: PropTypes.object.isRequired,
    width: PropTypes.string.isRequired
};

export default withWidth()(withStyles(styles, {withTheme: true})(Footer));