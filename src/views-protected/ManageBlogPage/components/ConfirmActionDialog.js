import React, {useState, useEffect, useContext} from "react";
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import PropTypes from 'prop-types';
import {colorScheme} from "../../../constants";

const ConfFirmActionDiaglog = ({open, setOpen, message, confirmCallBack}) => {

    const handleClose = () => {
        setOpen(false);
    };

    const handleConfirm = () => {
        confirmCallBack();
        setOpen(false);
    };

    return (
        <div>
            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">{"Confirm Action"}</DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        {message}
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                                      <Button variant={'text'}  onClick={handleConfirm} >
                        Confirm
                    </Button>

                                      <Button variant={'contained'} onClick={handleClose} color={'secondary'}>
                        Cancel
                    </Button>


                </DialogActions>
            </Dialog>
        </div>
    );
}

// Specifies the default values for props:
ConfFirmActionDiaglog.defaultProps = {
    message: "Are you sure?",
    confirmCallBack: () => {
    }
};

ConfFirmActionDiaglog.propTypes = {
    open: PropTypes.bool.isRequired,
    setOpen: PropTypes.func.isRequired,
    message: PropTypes.string,
    confirmCallBack: PropTypes.func.isRequired
};

export default ConfFirmActionDiaglog;