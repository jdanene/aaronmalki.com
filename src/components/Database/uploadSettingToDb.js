//https://stackoverflow.com/questions/52720954/send-email-when-firebase-database-gets-new-data
import {FIREBASE_DB} from "../../App";
import firebase from "firebase";
import {DB_NODES} from "../../constants/contants";

const uploadSettingToDb = async ({phoneNumber, companyName, email, license, address, socialMedia}) => {

    if (!phoneNumber) {
        alert(`[uploadSettingToDb] tried to upload blog w/o required attribute: phoneNumber `)
        return
    }
    if (!companyName) {
        alert(`[uploadSettingToDb] tried to upload blog w/o required attribute: companyName `)
        return
    }
    if (!email) {
        alert(`[uploadSettingToDb] tried to upload blog w/o required attribute: email `)
        return
    }
    if (!license) {
        alert(`[uploadSettingToDb] tried to upload blog w/o required attribute: license `)
        return

    }
    if (!address) {
        alert(`[uploadSettingToDb] tried to upload blog w/o required attribute: address `)
        return
    }
    if (!socialMedia) {
        alert(`[uploadSettingToDb] tried to upload blog w/o required attribute: socialMedia `)
        return
    }


    let inquiryRef = FIREBASE_DB.ref(`${DB_NODES.settings}`);

    await inquiryRef.update({
        phoneNumber, companyName, email, license, address, socialMedia,
        timeChanged: firebase.database.ServerValue.TIMESTAMP
    })

};

export default uploadSettingToDb;