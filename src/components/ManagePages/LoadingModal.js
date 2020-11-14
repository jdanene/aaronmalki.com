import React, {useContext, useEffect, useRef, useState} from "react"
import Modal from '@material-ui/core/Modal';
import CircularProgress from '@material-ui/core/CircularProgress';
import Dialog from '@material-ui/core/Dialog';
import Alert from '@material-ui/lab/Alert';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Button from '@material-ui/core/Button';
import {colorScheme} from "../../constants";
import DialogActions from '@material-ui/core/DialogActions';
import LinearProgress from '@material-ui/core/LinearProgress';
import PropTypes from 'prop-types';

const LoadingModal = ({state, page,setState}) => {



    return (
        <Dialog onClose={()=>setState({...state,open:false})}
                open={state.open } disableBackdropClick={!state.finished}
                disableEscapeKeyDown={!state.finished}>
            <DialogTitle style={{minWidth: 600}}
                         id="form-dialog-title">{state.finished ? '🔥🔥🔥 Edits Confirmed! 🔥🔥🔥' : 'Uploading Edits'}</DialogTitle>

            <DialogContent>

                {state.finished ? <DialogContentText> Navigate to {page} to see effects. (reload page if its
                        still the same)</DialogContentText> :
                    <LinearProgress color="secondary" style={{width:'100%'}}/>}
            </DialogContent>

            <DialogActions>

                {state.finished &&
                <Button onClick={() => setState({...state,open:false})} variant={'contained'} style={{backgroundColor: colorScheme.general.light_blue, color:'white'}}>
                    Exit
                </Button>}
            </DialogActions>

        </Dialog>

    )
};


LoadingModal.propTypes = {
    state: PropTypes.shape({
        open: PropTypes.bool,
        finished: PropTypes.bool
    }).isRequired,
    page:PropTypes.string,
    setState:PropTypes.func
};


export default LoadingModal;