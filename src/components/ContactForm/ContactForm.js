import React, {useContext, useEffect, useState} from "react"
import {
    Grid,
    Box,
    withStyles,
    withWidth,
    TextField
} from "@material-ui/core";
import {colorScheme} from "../../constants";
import transitions from "@material-ui/core/styles/transitions";
import PropTypes from 'prop-types';

//https://stackoverflow.com/questions/58963242/change-border-color-on-material-ui-textfield
const styles = theme => ({

    main_container: {
        height: '100%',
        width:'100%',
    },
    root:{
        display:'flex'
    },
    textField:{
    "& .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline": {
      borderColor: "rgba(27, 48, 57, .55)"
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

  }

});

const ContactForm = ({classes,selectionCallback,isMessageSent, error, theme, width, center, zoom, md = 4, lg = 4, xl = 4, sm = 5, xs = 12}) => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');

    const handleText = (type) => (e) => {
        if (type === "name") {
            setName(e.target.value);
            selectionCallback({email,message,name:e.target.value})
        } else if (type === "email") {
            setEmail(e.target.value);
            selectionCallback({email:e.target.value,message,name})
        } else if (type === "message") {
            setMessage(e.target.value);
            selectionCallback({email,message:e.target.value,name})
        }
    };


    return (
        <div className={classes.main_container}>

            <Box mb={1}>
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

            <Box mb={1}>
                <TextField
                    error={error.message}
                    variant="outlined"
                    multiline
                    id={"message"}
                    className={classes.textField}
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

        </div>
    )
};

// Specifies the default values for props:
ContactForm.defaultProps = {
    isMessageSent: false,
    error:{name: false, email: false, message: false, helperTxt: ''},
    selectionCallback: ()=>{}
};

ContactForm.propTypes = {
    isMessageSent: PropTypes.bool.isRequired,
    error: PropTypes.object.isRequired,
    selectionCallback: PropTypes.func.isRequired
};


export default withWidth()(withStyles(styles, {withTheme: true})(ContactForm));