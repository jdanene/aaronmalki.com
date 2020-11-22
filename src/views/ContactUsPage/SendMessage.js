import React, {useState} from "react"
import {Box, Button, Grid, IconButton, TextField, withStyles, withWidth} from "@material-ui/core";
import SendEmailToAaron from "../../components/Database/SendEmailToAaron";
import {colorScheme} from "../../constants";
import transitions from "@material-ui/core/styles/transitions";
import {StyledText} from "../../components/Text";
import {Alert} from '@material-ui/lab';
import Fade from '@material-ui/core/Fade';
import CloseIcon from '@material-ui/icons/Close';
import validator from 'validator'
import Paper from '@material-ui/core/Paper';
import {MESSAGE_TYPES} from "../../constants/contants";
import clsx from "clsx";

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
        textField:{
    "& .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline": {
      borderColor: "rgba(27, 48, 57, .30)"
    },    "&:hover .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline": {
      borderColor: colorScheme.primary.primary
    },
    "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline": {
      borderColor: colorScheme.other.analogous0,
    },
            "& .MuiInputLabel-outlined.Mui-focused": {
      color: colorScheme.other.analogous0,
                fontWeight:'bold'
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
        //marginBottom: '45px'
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
    contact_container: {
        display: 'flex',
        width: '100%',
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

    getInTouchText: {

        marginBottom: theme.spacing(4),
        fontFamily: 'airbnb-light',
        fontWeight: 'bold',
        letterSpacing: 1,
        color: theme.palette.primary.dark,
        [theme.breakpoints.down("xs")]: {
            marginTop: 10,
            fontSize: '35px'
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
    paperContainer:{
        display:'flex',
        flexDirection:'column',
        alignItems:'center',
        width:'100%',
        paddingLeft:theme.spacing(4),
        paddingRight: theme.spacing(4),
        paddingBottom: theme.spacing(2),
        paddingTop: theme.spacing(2),
        borderRadius: 7,
        [theme.breakpoints.down("xs")]: {
            fontSize: '40px',
                    paddingLeft:theme.spacing(2),
        paddingRight: theme.spacing(2),
        },

    }
});

const SendMessage = ({classes, className, theme, width, center, zoom, md = 4, lg = 4, xl = 4, sm = 5, xs = 12}) => {
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

        } else if (!(validator.isEmail(email.trim()))) {

            setError({...error, email: true, helperTxt: 'Please include a valid email.'});
        } else {
            SendEmailToAaron({name,email:email.trim(),message,messageType:MESSAGE_TYPES.general})
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
              className={className}>
        <Paper elevation={3} className={classes.paperContainer} >


            <StyledText className={classes.getInTouchText}>
                Get In Touch
            </StyledText>


            <Box mb={1} style={{width:'100%'}}>
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
                    className={classes.textField}
                    value={name}
                    onChange={handleText('name')}
                    helperText={error.name ? error.helperTxt : ''}
                />
            </Box>

            <Box mb={1} style={{width:'100%'}}>
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
                    className={classes.textField}
                    value={email}
                    onChange={handleText('email')}
                    helperText={error.email ? error.helperTxt : ''}
                />
            </Box>

            <Box mb={1} style={{width:'100%'}}>
                <TextField
                    error={error.message}
                    variant="outlined"
                    multiline
                    id={"message"}
                    rows={7}
                    fullWidth
                    required
                    className={classes.textField}
                    disabled={isMessageSent}
                    label={"Message"}
                    autoComplete={"message"}
                    color={'primary'}
                    value={message}
                    onChange={handleText('message')}
                    helperText={error.message ? error.helperTxt : ''}
                />
            </Box>
            <div style={{display:'flex', width:'100%', height:'100%', flexDirection:'column', justifyContent:'center', alignItems:'center'}}>
            <Button
                style={{width: '75%'}}
                color={"secondary"}
                variant="outlined"
                onClick={handleMessage}
                disabled={isMessageSent}

            >
                Send Message
            </Button>
            </div>

            {isMessageSent&&<Fade in={isMessageSent}>
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
            </Fade>}

        </Paper>

        </Grid>
    )
};

export default withWidth()(withStyles(styles, {withTheme: true})(SendMessage));