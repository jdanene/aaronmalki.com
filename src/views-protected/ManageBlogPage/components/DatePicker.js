import React, {useEffect} from 'react';
import {makeStyles} from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import PropTypes from 'prop-types';
import MomentUtils from '@date-io/moment';
import {
    MuiPickersUtilsProvider,
    KeyboardTimePicker,
    KeyboardDatePicker,
} from '@material-ui/pickers';

const useStyles = makeStyles((theme) => ({
    container: {
        display: 'flex',
        flexWrap: 'wrap',
    },
    dateField: {
        marginLeft: theme.spacing(1),
        marginRight: theme.spacing(1),
        width: 200,
    },
}));

export default function DatePicker({label, dateCallback}) {
    const classes = useStyles();
    const [selectedDate, setSelectedDate] = React.useState(new Date());
    
    const handleDateChange = (date) => {
        setSelectedDate(date)
    };

    useEffect(() => {
        dateCallback(new Date().toDateString())
    }, []);


    return (
        <MuiPickersUtilsProvider utils={MomentUtils}>
            <KeyboardDatePicker
                disableToolbar
                variant="inline"
                format="MM/DD/yyyy"
                margin="normal"
                id="date-picker-inline"
                label={label}
                value={selectedDate}
                onChange={handleDateChange}
                KeyboardButtonProps={{
                    'aria-label': 'change date',
                }}
            />
        </MuiPickersUtilsProvider>
    );
}


DatePicker.propTypes = {
    dateCallback: PropTypes.func.isRequired,
    label: PropTypes.string.isRequired
};

// Specifies the default values for props:
DatePicker.defaultProps = {
    dateCallback: (date) => console.log(date),
    label: "Set publish date for blog post "
};


