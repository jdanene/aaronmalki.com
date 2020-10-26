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
import SendEmailToAaron from "../../components/Database/SendEmailToAaron";
import {colorScheme} from "../../constants";
import PhoneIcon from "@material-ui/icons/Phone";
import MailIcon from "@material-ui/icons/Mail";
import transitions from "@material-ui/core/styles/transitions";
import {VscLocation} from "react-icons/vsc";
import {BiPhone} from "react-icons/bi";
import {useMediaQuery} from "@material-ui/core";
import ColoredButton from "../../components/Button/ColoredButton";
import {FittedText, StyledText} from "../../components/Text";
import {Button} from "@material-ui/core";
import * as EmailValidator from 'email-validator';
import {Alert} from '@material-ui/lab';
import Collapse from '@material-ui/core/Collapse';
import Fade from '@material-ui/core/Fade';
import CloseIcon from '@material-ui/icons/Close';


const CssTextField = withStyles({
    root: {
        fontFamily: "scope-one-regular",
        '& label.Mui-focused': {
            color: 'green',
            fontFamily: "scope-one-regular"
        },
        '& .MuiInput-underline:after': {
            borderBottomColor: 'green',
            fontFamily: "scope-one-regular"
        },
        '& .MuiOutlinedInput-root': {
            '& fieldset': {
                borderColor: 'red',
            },
            '&:hover fieldset': {
                borderColor: 'yellow',
            },
            '&.Mui-focused fieldset': {
                borderColor: 'green',
            },
            fontFamily: "scope-one-regular"
        },
    },
})(TextField);


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
    root0: {
        '& label.Mui-focused': {
            color: colorScheme.other.analogous0Dark,
        },
        '& .MuiInput-underline:after': {
            borderBottomColor: colorScheme.other.analogous0Dark,
        },
        '& .MuiOutlinedInput-root': {
            '& fieldset': {
                borderColor: colorScheme.other.analogous0,
            },
            '&:hover fieldset': {
                borderColor: colorScheme.other.analogous0Medium,
            },
            '&.Mui-focused fieldset': {
                borderColor: colorScheme.other.analogous0Dark,
            },
        },
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
    cssLabel: {
        '&$cssFocused': {
            color: 'red',
        },
    },
    cssOutlinedInput: {
        '&$cssFocused $notchedOutline': {
            borderColor: 'orange',
        },
    },
    root: {
        "&:hover:not($disabled):not($focused):not($error) $notchedOutline": {
            borderColor: 'pink'
        }
    },
    cssFocused: {},
    notchedOutline: {},
    disabled: {},
    focused: {},
    error: {},
    credentialsTitle_container: {
        display: "flex",
        flexDirection: "column"
    },
    mapAndForm_container: {
        justifyContent: 'center',
        flexGrow: 1,
        flexShrink: 1,
        marginTop: '90px',
        marginBottom: '45px'
    },

    map_container: {
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
        height: '100%',
        [theme.breakpoints.down("sm")]: {
            marginTop:-25,
            borderBottom: `1px solid rgba(27, 48, 57, .25)`,

        }
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

    },
    address: {
        color: theme.palette.common.white,
        textAlign: 'left',
        width: '100%',
        height: '100%',
        margin: 0,


    },
    address_container: {
        backgroundColor: theme.palette.primary.main,
        height: '30%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column',
    },
    email: {
        color: theme.palette.common.white
    },

    getInTouchText: {

        marginBottom: 10,
        fontFamily: 'airbnb-light',
        fontWeight: 'bold',
        letterSpacing: 1,
        color: theme.palette.primary.dark,
        [theme.breakpoints.up("xs")]: {
            marginTop: 10,
            fontSize: '40px'
        },
        [theme.breakpoints.up("sm")]: {
            fontSize: '40px'
        },
        [theme.breakpoints.up("md")]: {
            fontSize: '40px'
        },
        [theme.breakpoints.up("lg")]: {
            fontSize: '40px'
        },
        [theme.breakpoints.up("xl")]: {
            fontSize: '40px'
        }
    },
});

const SendMessage = ({classes, theme, width, center, zoom, md = 4, lg = 4, xl = 4, sm = 5, xs = 12}) => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');
    const [error, setError] = useState({name: false, email: false, message: false, helperTxt: ''});
    const [isMessageSent, setMessageSent] = useState(false);

    const handleText = (type) => (e) => {
        setError({...error, [type]: false});
        if (type === "name") {
            setName(e.target.value);
        } else if (type === "email") {
            setEmail(e.target.value)

        } else if (type === "message") {
            setMessage(e.target.value)

        }
    };

    const handleMessage = () => {

        if (name === '') {
            setError({...error, name: true, helperTxt: 'Please include your name.'});
        } else if (email === '') {
            setError({...error, email: true, helperTxt: 'Please include your email.'});
        } else if (message === '') {
            setError({...error, message: true, helperTxt: 'Please include a message.'});

        } else if (!(EmailValidator.validate(email.trim()))) {

            setError({...error, email: true, helperTxt: 'Please include a valid email.'});
        } else {
            // ToDo: Hook up with email sender, and maybe firebase
            SendEmailToAaron({name,email:email.trim(),message})
                .then(()=>setMessageSent(true))
                .catch(()=>console.error(`[SendMessage.js] failed to send message:${JSON.stringify({email,message,name})}`))
        }
    };

    const handleSuccessClose = () => {
        setName('');
        setEmail('');
        setMessage('');
        setMessageSent(false);
    };

    return (
        <Grid item md={md} lg={lg} xl={xl} sm={sm} xs={xs}
              className={classes.main_container}>


            <StyledText className={classes.getInTouchText}>
                Get In Touch
            </StyledText>

            <Box mb={1}>
                <TextField
                    variant="outlined"
                    id={"name"}
                    error={error.name}
                    rows={1}
                    fullWidth
                    required
                    disabled={isMessageSent}
                    label={"Name"}
                    autoComplete={"name"}
                    color={'primary'}
                    value={name}
                    onChange={handleText('name')}
                    helperText={error.name ? error.helperTxt : ''}
                />
            </Box>

            <Box mb={1}>
                <TextField
                    error={error.email}

                    variant="outlined"
                    id={"email"}
                    rows={1}
                    fullWidth
                    required
                    disabled={isMessageSent}
                    label={"Email Address"}
                    autoComplete={"email"}
                    color={'primary'}
                    value={email}
                    onChange={handleText('email')}
                    helperText={error.email ? error.helperTxt : ''}
                />
            </Box>

            <Box mb={1}>
                <TextField
                    error={error.message}
                    variant="outlined"
                    multiline
                    id={"message"}
                    rows={4}
                    fullWidth
                    required
                    disabled={isMessageSent}
                    label={"Message"}
                    autoComplete={"message"}
                    color={'primary'}
                    value={message}
                    onChange={handleText('message')}
                    helperText={error.message ? error.helperTxt : ''}
                />
            </Box>
            <Button
                style={{width: '75%', marginTop: 10}}
                color={"secondary"}
                variant="outlined"
                onClick={handleMessage}
                disabled={isMessageSent}

            >
                Send Message
            </Button>

            <Fade in={isMessageSent}>
                <Alert color={"success"} variant="filled"
                       style={{marginTop: 15, backgroundColor: "#36B37E"}}
                       action={
                           <IconButton
                               aria-label="close"
                               color="inherit"
                               size="small"
                               onClick={handleSuccessClose}
                           >
                               <CloseIcon fontSize="inherit"/>
                           </IconButton>
                       }
                >
                    Thank you! We will get in contact with you shortly.
                </Alert>
            </Fade>


        </Grid>
    )
};

export default withWidth()(withStyles(styles, {withTheme: true})(SendMessage));