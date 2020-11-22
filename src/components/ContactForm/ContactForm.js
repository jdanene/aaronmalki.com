import React, {useState} from "react"
import {Box, Button, IconButton, TextField, withStyles, withWidth} from "@material-ui/core";
import {colorScheme} from "../../constants";
import PropTypes from 'prop-types';
import MaterialUiPhoneNumber from 'material-ui-phone-number';
import validator from 'validator'
import Fade from '@material-ui/core/Fade';
import CloseIcon from '@material-ui/icons/Close';
import {Alert} from '@material-ui/lab';

//https://stackoverflow.com/questions/58963242/change-border-color-on-material-ui-textfield
const styles = theme => ({

    main_container: {
        height: '100%',
        width: '100%',
        flexShrink: 1,
        display: 'flex',
        flexDirection: 'column'
    },
    root: {
        display: 'flex'
    },
    textField: {
        zIndex:0,
        "& .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline": {
            borderColor: "rgba(27, 48, 57, .30)",
            zIndex:0
        }, "&:hover .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline": {
            borderColor: colorScheme.primary.primary,
             zIndex:0
        },
        "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline": {
            borderColor: colorScheme.other.analogous0,
             zIndex:0
        },
        "& .MuiInputLabel-outlined.Mui-focused": {
            color: colorScheme.other.analogous0,
            fontWeight: 'bold',
             zIndex:0
        }

    }

});

const ContactForm = ({confirmCallback, showPhone, classes, selectionCallback, isMessageSent, theme, width, center, zoom, md = 4, lg = 4, xl = 4, sm = 5, xs = 12}) => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [error, setError] = useState({name: false, email: false, message: false, phoneNumber: false});
    const [isFormSubmit, setFormSubmit] = useState(false);

    const handleSuccessClose = () => {
        setName('');
        setEmail('');
        setMessage('');
        setPhoneNumber('');
        setFormSubmit(false);
    };


    const handleText = (type) => (e) => {
        setError({...error, [type]: false});

        if (type === "name") {
            setName(e.target.value);
            selectionCallback({email, message, name: e.target.value})
        } else if (type === "email") {
            setEmail(e.target.value);
            selectionCallback({email: e.target.value, message, name})
        } else if (type === "message") {
            setMessage(e.target.value);
            selectionCallback({email, message: e.target.value, name})
        } else if (type === "phoneNumber") {
            setPhoneNumber(e);
            selectionCallback({email, phoneNumber: e, name, message})
        }
    };

    const hasPhone = () => {
        return phoneNumber !== '' && !(/\+1$|\+52$/g.test(phoneNumber))
    };

    const submitForm = () => {
        if (name === '') {
            setError({...error, name: true, helperTxt: 'Please include your name.'});
        } else if (email === '') {
            setError({...error, email: true, helperTxt: 'Please include your email.'});
        } else if (message === '') {
            setError({...error, message: true, helperTxt: 'Please include a message.'});

        } else if (!(validator.isEmail(email.trim()))) {
            setError({...error, email: true, helperTxt: 'Please include a valid email.'});
        } else if ((hasPhone()) && (!(validator.isMobilePhone(phoneNumber)))) {
            setError({...error, phoneNumber: true, helperTxt: 'Please enter a valid phone number.'});
        } else {
            confirmCallback({name,email:email.trim(),message,phoneNumber});
            setFormSubmit(true);
            //alert(`Message good: ${name}, ${email}, ${message}, ${phoneNumber}`)
        }
    };

    return (
        <div className={classes.main_container}>

            <Box mb={3}>
                <TextField
                    variant="outlined"
                    id={"name"}
                    error={error.name}
                    rows={1}
                    fullWidth
                    required
                    className={classes.textField}
                    disabled={isMessageSent}
                    label={"Name"}
                    InputLabelProps={{
                        shrink: true,
                    }}
                    autoComplete={"name"}
                    color={'primary'}
                    value={name}
                    onChange={handleText('name')}
                    helperText={error.name ? error.helperTxt : ''}
                />
            </Box>

            <Box mb={3}>
                <TextField
                    error={error.email}
                    InputLabelProps={{
                        shrink: true,
                    }}
                    variant="outlined"
                    id={"email"}
                    rows={1}
                    fullWidth
                    required
                    className={classes.textField}
                    disabled={isMessageSent}
                    label={"Email Address"}
                    autoComplete={"email"}
                    color={'primary'}
                    value={email}
                    onChange={handleText('email')}
                    helperText={error.email ? error.helperTxt : ''}
                />
            </Box>


            <Box mb={3}>
                <TextField
                    error={error.message}
                    variant="outlined"
                    multiline
                    id={"message"}
                    className={classes.textField}
                    rows={3}
                    InputLabelProps={{
                        shrink: true,
                    }}
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

            <Box mb={0} style={{maxWidth: 250}}>
                <MaterialUiPhoneNumber
                    error={error.phoneNumber}
                    variant="outlined"
                    id={"phoneNumber"}
                    rows={1}
                    disableAreaCodes
                    onlyCountries={['us', 'mx']}
                    fullWidth
                    className={classes.textField}
                    disabled={isMessageSent}
                    label={"Phone Number"}
                    autoComplete={"phoneNumber"}
                    color={'primary'}
                    value={phoneNumber}
                    helperText={error.phoneNumber ? error.helperTxt : ''}
                    defaultCountry={'us'}
                    countryCodeEditable={false}
                    onChange={handleText('phoneNumber')}/>
            </Box>
            <Box mt={2} style={{display: 'flex', width: '100%'}}>
                <Button
                    color={"secondary"}
                    variant="contained"
                    onClick={submitForm}
                    disabled={isFormSubmit}
                    size={"large"}
                >
                    SUBMIT
                </Button>
            </Box>

            {isFormSubmit && <Fade in={isFormSubmit}>
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

        </div>
    )
};

// Specifies the default values for props:
ContactForm.defaultProps = {
    isMessageSent: false,
    error: {phoneNumber: false, name: false, email: false, message: false, helperTxt: ''},
    selectionCallback: () => {
    },
    confirmCallback: (v)=>alert(JSON.stringify(v))
};

ContactForm.propTypes = {
    isMessageSent: PropTypes.bool.isRequired,
    error: PropTypes.shape({
        phoneNumber: PropTypes.bool,
        name: PropTypes.bool,
        email: PropTypes.bool,
        message: PropTypes.bool,
        helperTxt: PropTypes.string,
    }).isRequired,
    selectionCallback: PropTypes.func.isRequired,
    confirmCallback: PropTypes.func.isRequired
};


export default withWidth()(withStyles(styles, {withTheme: true})(ContactForm));