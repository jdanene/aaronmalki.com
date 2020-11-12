import React, {useState} from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import TextInput from "../ManageBlogPage/components/TextInput";
import PropTypes from 'prop-types';
import Link from '@material-ui/core/Link';
import { AiOutlineWarning } from "react-icons/ai";
import {colorScheme} from "../../constants";


const ModalEditBusinessLocation = ({open, openCallback, address, createCallback})=> {

    const [address_, setAddress_] = useState(address);


    const handleAddressChange = (type)=>(value)=>{
        setAddress_({...address_,[type]:value})
    };

    const handlePositionChange = (type)=>(value)=>{
        let position;
        if (type === 'lng' || type === 'lat'){
            position = {...address_.position,[type]:parseFloat(value.trim())};
        }else{
            position = {...address_.position,[type]:value.trim()};

        }
        setAddress_({...address_,position})
    };


    const handleClose = () => {
        openCallback(false);
    };

    const handleCreate = () => {
        createCallback(address_);
        handleClose();

    };

    return (

            <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
                <DialogTitle id="customized-dialog-title">Edit Business Location</DialogTitle>
                <DialogContent dividers>
                    <DialogContentText>
                        To update location you have to (1) Update the address (2) Update the longitude and latitude (See: <Link rel="noopener noreferrer" target="_blank" href={"https://support.google.com/maps/answer/18539?co=GENIE.Platform%3DDesktop&hl=en"}> how to get coordinates on google maps</Link>)
                        (3) Update the google place id (Use the google maps place_id finder located <Link rel="noopener noreferrer" target="_blank" href={"https://developers.google.com/maps/documentation/javascript/examples/places-placeid-finder"}>here</Link>).
                        Make sure everything is correct because this website will not verify input, and google map plugin
                        will have the wrong location if incorrect <AiOutlineWarning size={25} color={'red'}/>.
                    </DialogContentText>

                    <TextInput label={'Address: Line1'} initial={address_.line1}  textCallback={handleAddressChange('line1')}/>
                    <TextInput label={'Address: Line2'} initial={address_.line2}  textCallback={ handleAddressChange('line2')}/>
                    <TextInput label={'latitude'} type={"number"}  initial={address_.position.lat} textCallback={handlePositionChange('lat')}/>
                    <TextInput label={'longitude'} type={"number"}  initial={address_.position.lng} textCallback={handlePositionChange('lng')}/>
                    <TextInput label={'place_id'}  initial={address_.position.place_id} textCallback={handlePositionChange('place_id')}/>


                </DialogContent>
                <DialogActions>

                    <Button onClick={handleClose} color="secondary">
                        Cancel
                    </Button>
                    <Button onClick={handleCreate} color="secondary">
                        Submit
                    </Button>

                </DialogActions>
            </Dialog>
    );
};


// Specifies the default values for props:
ModalEditBusinessLocation.propTypes = {
    open: PropTypes.bool.isRequired,
    openCallback: PropTypes.func.isRequired,
    address: PropTypes.shape({
        line1:PropTypes.string,
        line2:PropTypes.string,
        position:{
            lat: PropTypes.number,
            lng: PropTypes.number,
            place_id: PropTypes.string
        }
    }).isRequired,
    createCallback:PropTypes.func.isRequired
};

export default ModalEditBusinessLocation