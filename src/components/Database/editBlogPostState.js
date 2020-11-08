//https://stackoverflow.com/questions/52720954/send-email-when-firebase-database-gets-new-data
import {FIREBASE_DB} from "../../App";
import firebase from "firebase";
import {DB_NODES} from "../../constants/contants";

const editBlogPostState = async (key, {state}) => {

    if (!state) {
        alert(`[editBlogPostToDb] tried to edit blog w/o required attribute: state `)
    }


    let inquiryRef = FIREBASE_DB.ref(`${DB_NODES.blogPosts}/${key}`);

    await inquiryRef.update({
        state,
        timeCreated: firebase.database.ServerValue.TIMESTAMP
    })

};

export default editBlogPostState;