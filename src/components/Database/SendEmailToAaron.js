//https://stackoverflow.com/questions/52720954/send-email-when-firebase-database-gets-new-data
import {FIREBASE_DB} from "../../App";
import firebase from "firebase";
import {normalEmailToFirebaseEmail} from "../Utility";
//More abotu firebase list: https://courses.cs.northwestern.edu/394/firebase-notes.php#push

const SendEmailToAaron = async ({email, message,name}) =>{
    let inquiryRef= FIREBASE_DB.ref(`inquiries/${normalEmailToFirebaseEmail(email)}`);

    await inquiryRef.push().set(
        {
            email,
            message,
            name,
            timeCreated: firebase.database.ServerValue.TIMESTAMP
        });

    await inquiryRef.update({lastChanged:firebase.database.ServerValue.TIMESTAMP})

};

export default SendEmailToAaron;