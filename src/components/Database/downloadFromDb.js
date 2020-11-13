//https://stackoverflow.com/questions/52720954/send-email-when-firebase-database-gets-new-data
import {FIREBASE_DB} from "../../App";


const downloadFromDb = async (path) => {
    let settingsRef = FIREBASE_DB.ref(`${path}`);
    const snapshot = await settingsRef.once('value');
    return snapshot.val();
};

export default downloadFromDb;