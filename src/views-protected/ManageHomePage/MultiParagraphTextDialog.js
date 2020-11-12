import React, {useState} from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import PropTypes from 'prop-types';
import {colorScheme} from "../../constants";
import ButtonGroup from "../../components/Button/ButtonGroup";
import IconButton from '@material-ui/core/IconButton';
import AddIcon from '@material-ui/icons/Add';
import RemoveIcon from '@material-ui/icons/Remove';
import Typography from "@material-ui/core/Typography";
import {makeStyles} from '@material-ui/core/styles';


const useStyles = makeStyles((theme) => ({
    addRemove_container:
        {
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            border: '1px dashed white',
            padding: theme.spacing(1)
        },
    addRemove_button_container: {
        display: 'flex', justifyContent: 'space-between', alignItems: 'space-between'
    },
    secondaryText_container: {
        marginTop: theme.spacing(1),
        marginBottom: theme.spacing(1)

    }
}));

const RawTextField = ({label, value, setValue}) => {
    return (
        <TextField
            color={"secondary"}
            multiline
            autoFocus
            margin="dense"
            id={label}
            label={label}
            type="text"
            fullWidth
            value={value}
            onChange={(e) => setValue(e.target.value)}
        />
    )
};


const SecondaryTextField = ({label, value, setValue}) => {
    const classes = useStyles();

    return (
        <div className={classes.secondaryText_container}>
            <RawTextField label={label} value={value} setValue={setValue}/>
        </div>
    )
};

/**
 *
 * @param dialogTitle[str] : The title of the modal
 * @param open[bool]: Determines if dialog open
 * @param setOpen[func]: Used to open and close dialog
 * @param mainLabel[str]: Label in text field of main paragraph
 * @param secondaryLabel[str]: Label attached to all subsequent paragraphs
 * @param secondaryButtonLabel[str]: Gives interperetation to +/- button
 * @param confirmCallback[func]: Called after user presses confirm
 * @param initial: {value: str, secondaryValues:{str}}: Initial input
 * @param helperText: Helps user know what to do, can contain html elements
 * @return {*}
 * @constructor
 */
const MultiParagraphTextDialog = ({dialogTitle, open, setOpen, mainLabel, secondaryLabel, secondaryButtonLabel, confirmCallback, initial,helperText}) => {
    const classes = useStyles();
    const [value, setValue] = useState(initial.value);
    const [secondaryValues, setSecondaryValues] = useState(initial.secondaryValues);
    const [numberOfXtraFields, setNumberOfXtraFields] = useState(Object.keys(initial.secondaryValues).length);

    // Handles the storing of text of extra fields
    const getSecondaryValue = (i) => {
        return secondaryValues[i];
    };
    const handleSecondaryValue = (i) => (value) => {
        setSecondaryValues({...secondaryValues, [i]: value})
    };


    // Handles adding xtra fields
    const handleSecondaryFieldAdd = () => {
        setNumberOfXtraFields(numberOfXtraFields + 1)
    };

    const handleSecondaryFieldDelete = (i) => () => {
        setNumberOfXtraFields(numberOfXtraFields - 1 < 0 ? 0 : numberOfXtraFields - 1);
        let temp = {...secondaryValues};
        if ((i-1) in temp){
            delete temp[i-1]
        }
        setSecondaryValues(temp)
    };



    // General Actions of buttons on button Cancel, Confirm
    const handleClose = () => {
        setOpen(false);
    };

    const handleConfirm = () => {
        confirmCallback({value,secondaryValues});
        handleClose();
    };


//Array(8).fill().map((_, i) => i * i);
    return (
        <div style={{display: 'flex', flexGrow: 1}}>
            <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
                <DialogTitle style={{minWidth: 600}} id="form-dialog-title">{dialogTitle}</DialogTitle>

                <DialogContent>
                    <DialogContentText dangerouslySetInnerHTML={{__html: helperText}}/>



                                    <DialogActions>

                    <div className={classes.addRemove_container}>
                        <Typography variant="overline" display="block" gutterBottom>{secondaryButtonLabel}</Typography>
                        <div className={classes.addRemove_button_container}>
                            <IconButton variant={'text'}
                                        style={{color: colorScheme.general.teal}}
                                        onClick={handleSecondaryFieldAdd}
                            ><AddIcon/></IconButton>
                            <IconButton style={{color: colorScheme.general.punch}}
                                        variant={'text'}
                                        onClick={handleSecondaryFieldDelete(numberOfXtraFields)}
                            ><RemoveIcon/></IconButton>
                        </div>
                    </div>

                </DialogActions>

                    <RawTextField label={mainLabel} value={value} setValue={setValue}/>

                    {Array(numberOfXtraFields).fill().map((_, i) => {
                            return (
                                <SecondaryTextField key={i} setValue={handleSecondaryValue(i)} value={getSecondaryValue(i)}
                                                    label={secondaryLabel}/>
                            )
                        }
                    )}


                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="primary">
                        Cancel
                    </Button>
                    <Button onClick={handleConfirm} color="primary">
                        Confirm
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
};

MultiParagraphTextDialog.propTypes = {
    open: PropTypes.bool.isRequired,
    dialogTitle: PropTypes.string,
    label: PropTypes.string,
    setOpen: PropTypes.func.isRequired,
    confirmCallback: PropTypes.func.isRequired,
    initial: PropTypes.string,
};


MultiParagraphTextDialog.defaultProps = {
    confirmCallback: () => {
        alert('Clicked!')
    }
};


export default MultiParagraphTextDialog;