import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import {blog_states,blog_categories} from "../../../constants/contants";

const useStyles = makeStyles((theme) => ({
  formControl: {
   // margin: theme.spacing(1),
        marginTop: theme.spacing(2),
    marginBottom: theme.spacing(2),

      minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));

export default function OptionsSelect({helperText,label,choices, onChoiceCallback}) {
  const classes = useStyles();
  const [value, setValue] = React.useState('');

  const handleChange = ({target: {value}}) => {
     setValue(value);
     onChoiceCallback(value);
  };

  return (
    <div>
      <FormControl className={classes.formControl}>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={value}
          onChange={handleChange}
        >
            {
                Object.keys(choices).map((key,index)=>{
                    return <MenuItem key={key} value={choices[key]}>{choices[key]}</MenuItem>
                })
            }
        </Select>
          <FormHelperText>{label}</FormHelperText>
      </FormControl>
    </div>
  );
}

// Specifies the default values for props:
OptionsSelect.defaultProps = {
    helperText: "Category",
    label: "Select blog category",
    choices:blog_categories
};
