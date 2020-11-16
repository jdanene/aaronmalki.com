//https://stackoverflow.com/questions/52720954/send-email-when-firebase-database-gets-new-data
import {FIREBASE_DB} from "../../App";
import firebase from "firebase";
import {normalEmailToFirebaseEmail} from "../Utility";
//More abotu firebase list: https://courses.cs.northwestern.edu/394/firebase-notes.php#push

const SendEmailToAaron = async (props) =>{

    const {email} = props;
    if (!(email)){
        alert('[SendEmailToAaron] missing required attr "email"')
    }

    let inquiryRef= FIREBASE_DB.ref(`inquiries/${normalEmailToFirebaseEmail(email)}`);

    await inquiryRef.push().set(
        {
            ...props,
            timeCreated: firebase.database.ServerValue.TIMESTAMP
        });

    //await inquiryRef.update({lastChanged:firebase.database.ServerValue.TIMESTAMP})

};

export default SendEmailToAaron;