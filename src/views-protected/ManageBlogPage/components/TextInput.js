import React, {useState} from 'react';
import TextField from '@material-ui/core/TextField';
import PropTypes from 'prop-types';
import MaterialUiPhoneNumber from 'material-ui-phone-number';

const MAX_DESC_CHARS = 140;
const MAX_TITLE_CHARS = 40;

const TextInput = ({label, textCallback, max_char, initial, hasSecondaryColor, multiline, onPress,fullWidth,type="text"}) => {
    const [textFieldChars, setTextFieldChars] = useState(0);

    const handleChange = (e) => {
        setTextFieldChars(e.target.value.length);
        textCallback(e.target.value)
    };

    return (


            <div onClick={onPress} style={{display:'flex', width:'100%'}}>
            <TextField
                multiline={multiline}
                color={hasSecondaryColor ? 'secondary' : 'primary'}
                required
                margin="dense"
                label={label}
                type={type}
                fullWidth={true}
                value={initial}
                onChange={handleChange}
                inputProps={max_char ? {maxLength: max_char} : {}}
                helperText={max_char ? `${max_char - textFieldChars}/${max_char} characters left` : ''}
            />
            </div>


    )
};

export const PhoneInput = ({label, textCallback, max_char, initial, hasSecondaryColor}) => {
    const [textFieldChars, setTextFieldChars] = useState(0);

    const handleChange = (e) => {
        setTextFieldChars(e.length);
        textCallback(e.replace(/[()\s-]*/g,''))
    };

    return (
        <MaterialUiPhoneNumber
            color={hasSecondaryColor ? 'secondary' : 'primary'}
            required
            disableAreaCodes
            onlyCountries={['us']}
            defaultCountry={'us'}
            countryCodeEditable={false}
            margin="dense"
            label={label}
            type="text"
            fullWidth
            value={initial}
            onChange={handleChange}
            inputProps={max_char ? {maxLength: max_char} : {}}
            helperText={max_char ? `${max_char - textFieldChars}/${max_char} characters left` : ''}
        />
    )
};


TextInput.propTypes = {
    textCallback: PropTypes.func.isRequired,
    label: PropTypes.string.isRequired
};

// Specifies the default values for props:
TextInput.defaultProps = {
    textCallback: (text) => console.log(text),
    label: "Add Blog Title"
};

export default TextInput;