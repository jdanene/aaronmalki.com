import React from 'react'
import {DropzoneDialog} from 'material-ui-dropzone'
import PropTypes from 'prop-types';

import Slide from '@material-ui/core/Slide';

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});


const FileDropDialog = ({open, setOpen, fileCallback, acceptedFiles,filesLimit,dialogTitle,initialFiles}) => {

    const handleClose = () => {
        setOpen(false);
    };

    const handleSave = (files) => {
        //Saving files to state for further use and closing Modal.
        //console.log(URL.createObjectURL(files[0]))
        fileCallback(files);
        setOpen(false);
    };

    return (
        <DropzoneDialog
            initialFiles={initialFiles}
            dialogTitle={ dialogTitle}
            TransitionComponent={Transition}
            color="secondary"
            open={open}
            onSave={handleSave}
            acceptedFiles={acceptedFiles}
            showPreviews={true}
            maxFileSize={5000000}
            onClose={handleClose}
            filesLimit={filesLimit}
        />
    );

};

FileDropDialog.propTypes = {
    open: PropTypes.bool.isRequired,
    setOpen: PropTypes.func.isRequired,
    fileCallback: PropTypes.func.isRequired
};

FileDropDialog.defaultProps = {
    acceptedFiles: ['image/*'],
    filesLimit:1,
    dialogTitle: 'File Upload'
};


export default FileDropDialog;