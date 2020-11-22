import React, {useState} from 'react'
import {DropzoneDialog} from 'material-ui-dropzone'
import PropTypes from 'prop-types';

import Button from '@material-ui/core/Button';
import Slide from '@material-ui/core/Slide';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});


const FileDrop = ({fileCallback,acceptedFiles,label})=> {


    const [open, setOpen] = useState(false);

    const handleClose = () => {
        setOpen(false);
    };

    const handleSave = (files) => {
        //Saving files to state for further use and closing Modal.
        //console.log(URL.createObjectURL(files[0]))
        console.log('Files:', files, Object.keys(files));
        fileCallback(files);
        setOpen(false);
    };

    const handleOpen = () => {
        setOpen(true);
    };


        return (
            <div>
                <Button variant="contained" color="primary" onClick={handleOpen}>
                    {label}
                </Button>
                <DropzoneDialog
                    TransitionComponent={Transition}
                    color="secondary"
                    open={open}
                    onSave={handleSave}
                    acceptedFiles={acceptedFiles}
                    showPreviews={true}
                    maxFileSize={5000000}
                    onClose={handleClose}
                    filesLimit={1}
                />
            </div>
        );

};

FileDrop.propTypes = {
  fileCallback: PropTypes.func.isRequired
};

FileDrop.defaultProps = {
    acceptedFiles: ['text/x-markdown','text/markdown']
};


export default FileDrop;