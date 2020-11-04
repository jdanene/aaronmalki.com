import React,{useState} from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import PropTypes from 'prop-types';

const MAX_DESC_CHARS = 140;
const MAX_TITLE_CHARS = 40;

const TextInput = ({label, textCallback, max_char}) =>{
    const [textFieldChars, setTextFieldChars] = useState(0);

    const handleChange = (e)=>{
        setTextFieldChars(e.target.value.length);
        textCallback(e.target.value)
    };

    return (
        <TextField
            required
            margin="dense"
            label={label}
            type="text"
            fullWidth
            onChange={handleChange}
            inputProps={max_char? {maxLength: max_char}:{}}
            helperText={max_char?`${max_char-textFieldChars}/${max_char} characters left`:''}
          />
    )
};

TextInput.propTypes = {
  textCallback:PropTypes.func.isRequired,
    label:PropTypes.string.isRequired
};

// Specifies the default values for props:
TextInput.defaultProps = {
    textCallback: (text)=>console.log(text),
    label: "Add Blog Title"
};

export default TextInput;