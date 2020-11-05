//https://stackoverflow.com/questions/52720954/send-email-when-firebase-database-gets-new-data
import {FIREBASE_DB} from "../../App";
import firebase from "firebase";
import {DB_NODES} from "../../constants/contants";

const uploadBlogPostToDb = async (key, post) => {
    let inquiryRef = FIREBASE_DB.ref(`${DB_NODES.blogPosts}/${key}`);

    await inquiryRef.update({
        ...post,
        timeCreated: firebase.database.ServerValue.TIMESTAMP
    })

};

export default uploadBlogPostToDb;