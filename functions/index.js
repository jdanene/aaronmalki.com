'use strict';
require('dotenv').config()

const sendInquiryToAaron = require("./Utils/sendInquiryToAaron");
const sendConfirmEmailToUser = require("./Utils/sendConfirmEmailToUser");
const admin = require('firebase-admin');

const functions = require('firebase-functions');
//firebase deploy --only functions
//firebase functions:config:set gmail.email=aaaronmalki@gmail.com gmail.password=missy13!
// email aaaronmalki@gmail.com
// pw: missy13!
const nodemailer = require('nodemailer');
// Configure the email transport using the default SMTP transport and a GMail account.
// For other types of transports such as Sendgrid see https://nodemailer.com/transports/
// TODO: Configure the `gmail.email` and `gmail.password` Google Cloud environment variables.
const gmailEmail = functions.config().gmail.email;
const gmailPassword = functions.config().gmail.password;
const mailTransport = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user:  gmailEmail,
        pass: gmailPassword,
    },
});

admin.initializeApp(functions.config().firebase);

// If error with deploy use: https://stackoverflow.com/questions/54451457/firebase-cloud-functions-http-error-code-403
// need node 8 for deployment
// Based on https://github.com/firebase/functions-samples/blob/Node-8/email-confirmation/functions/index.js
// Sends an email confirmation when a user changes his mailing list subscription.
exports.sendEmailConfirmation = functions.database.ref('/inquiries/{email}/{uuid}').onWrite(async (change) => {
    //Key-value pairs representing state of data after the change.
    const snapshot = change.after;
    //Use Before: Key-value pairs representing state of data before the change.
    const payload = snapshot.val();
    const {email, name} = payload;

    // get settings from db
    let settingsRef = admin.database().ref(`pages/settings`);
    const settingsSnapshot = await settingsRef.once('value');
    const settings = settingsSnapshot.val();


    try {
        // Send Confirm Email To user
        await sendConfirmEmailToUser(mailTransport,settings,{email,name});

        // Send Email to Aaron
        await sendInquiryToAaron(mailTransport,gmailEmail, payload);

        console.log(`New email sent to:`, email);
    } catch (error) {
        console.error('There was an error while sending the email:', error);
    }
    return null;
});
