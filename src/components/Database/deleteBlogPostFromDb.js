//https://stackoverflow.com/questions/52720954/send-email-when-firebase-database-gets-new-data
import {FIREBASE_DB} from "../../App";
import {DB_NODES} from "../../constants/contants";

const deleteBlogPostFromDb = async (key) => {
    let inquiryRef = FIREBASE_DB.ref(`${DB_NODES.blogPosts}/${key}`);

    await inquiryRef.remove();

};

export default deleteBlogPostFromDb;