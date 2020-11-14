//https://stackoverflow.com/questions/52720954/send-email-when-firebase-database-gets-new-data
import {FIREBASE_DB} from "../../App";
import firebase from "firebase";
import {DB_NODES, DB_NODES_PAGES} from "../../constants/contants";

const validateKeys = (props, truth, errorMsg) => {
    let keys = Object.keys(truth);
    for (const key of keys) {
        if (!(key in props)) {
            alert(`${errorMsg} tried to upload but missing required key: ${key}, so failed`)
            return false;
        }
    }
    return true;
};


const uploadPageToDb = async (props,truth,errorMsg, path) => {

    if (!validateKeys(props,truth,errorMsg)){
        return
    }

    let inquiryRef = FIREBASE_DB.ref(`${DB_NODES.pages}/${path}`);

    await inquiryRef.update({
        ...props,
        timeChanged: firebase.database.ServerValue.TIMESTAMP
    })

};

export default uploadPageToDb;