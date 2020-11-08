//https://stackoverflow.com/questions/52720954/send-email-when-firebase-database-gets-new-data
import {FIREBASE_DB} from "../../App";
import firebase from "firebase";
import {DB_NODES} from "../../constants/contants";

const uploadBlogPostToDb = async (key, {state, category, title, image, description, date, content}) => {

    if (!state) {
        alert(`[uploadBlogPostToDb] tried to upload blog w/o required attribute: state `)
    }
    if (!category) {
        alert(`[uploadBlogPostToDb] tried to upload blog w/o required attribute: category `)
    }
    if (!title) {
        alert(`[uploadBlogPostToDb] tried to upload blog w/o required attribute: title `)
    }
    if (!image) {
        alert(`[uploadBlogPostToDb] tried to upload blog w/o required attribute: image `)
    }
    if (!description) {
        alert(`[uploadBlogPostToDb] tried to upload blog w/o required attribute: description `)
    }
    if (!date) {
        alert(`[uploadBlogPostToDb] tried to upload blog w/o required attribute: date `)
    }
    if (!content) {
        alert(`[uploadBlogPostToDb] tried to upload blog w/o required attribute: content `)
    }


    let inquiryRef = FIREBASE_DB.ref(`${DB_NODES.blogPosts}/${key}`);

    await inquiryRef.update({
        state, category, title, image, description, date, content,
        timeCreated: firebase.database.ServerValue.TIMESTAMP
    })

};

export default uploadBlogPostToDb;