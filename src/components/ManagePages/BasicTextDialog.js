import React, {useState} from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import PropTypes from 'prop-types';

const BasicTextDialog = ({dialogTitle, open, setOpen, label, confirmCallback, initial}) => {

    const [value, setValue] = useState(initial);


    const handleClose = () => {
        setOpen(false);
    };

    const handleConfirm = () => {
        confirmCallback(value);
        handleClose();
    };

    return (
        <div style={{display:'flex',flexGrow:1}}>
            <Dialog  open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
                <DialogTitle style={{minWidth:600}} id="form-dialog-title">{dialogTitle}</DialogTitle>
                <DialogContent>
                    <TextField
                        autoFocus
                        margin="dense"
                        id={label}
                        label={label}
                        type="text"
                        fullWidth
                        value={value}
                        onChange={(e) => setValue(e.target.value)}
                    />
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

BasicTextDialog.propTypes = {
    open: PropTypes.bool.isRequired,
    dialogTitle: PropTypes.string,
    label: PropTypes.string,
    setOpen: PropTypes.func.isRequired,
    confirmCallback: PropTypes.func.isRequired,
    initial: PropTypes.string,
};


BasicTextDialog.defaultProps = {
    confirmCallback: () => {
        alert('Clicked!')
    }
};


export default BasicTextDialog;