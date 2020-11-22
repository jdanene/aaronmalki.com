//https://stackoverflow.com/questions/52720954/send-email-when-firebase-database-gets-new-data
import {FIREBASE_DB} from "../../App";
import {DB_NODES} from "../../constants/contants";

const downloadSettingsFromDb = async () => {
    let settingsRef = FIREBASE_DB.ref(`${DB_NODES.settings}`);
    const snapshot = await settingsRef.once('value');
    return snapshot.val();
};

export default downloadSettingsFromDb;