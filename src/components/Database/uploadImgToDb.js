import {FIREBASE_STORAGE} from "../../App";
import * as firebase from "firebase";
import PropTypes from 'prop-types';


const  uploadImgToDb =async ({file, uploadCallback}) => {

    //const regex = /[i\s]+/gi;

    // Upload to fire storage
    let filename = file.name;
    let ref = FIREBASE_STORAGE.ref().child(filename);
    let uploadTask = ref.put(file);


    // Register three observers:
    // 1. 'state_changed' observer, called any time the state changes
    // 2. Error observer, called on failure
    // 3. Completion observer, called on successful completion
    uploadTask.on('state_changed', function (snapshot) {
        // Observe state change events such as progress, pause, and resume
        // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
        switch (snapshot.state) {
            case firebase.storage.TaskState.PAUSED:
                break;
            case firebase.storage.TaskState.RUNNING:
                break;
        }
    }, function (error) {
        // Handle unsuccessful uploads
        uploadCallback(false);
    }, function () {
        // Handle successful uploads on complete
        // For instance, get the download URL: https://firebasestorage.googleapis.com/...
        uploadTask.snapshot.ref.getDownloadURL().then((url) => {
            uploadCallback(url);
        });
    });


};

// Specifies the default values for props:
uploadImgToDb.defaultProps = {
    uploadCallback: ()=>{}
};

uploadImgToDb.propTypes = {
    file: PropTypes.instanceOf(File).isRequired,
    uploadCallback: PropTypes.func.isRequired
};

export default uploadImgToDb;