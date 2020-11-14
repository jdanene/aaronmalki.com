import multiPartTextArrayToDict from "../Utility/multiPartTextArrayToDict";
import {DB_FORMATS} from "../../constants/contants";
import isObjectEmpty from "../Utility/isObjectEmpty";
import arrayToDict from "../Utility/arrayToDict";
import uploadImgToDbEasy from "../Database/uploadImgToDbEasy";
import uploadPageToDb from "../Database/uploadPageToDb";

/**
 *
 * @param state: the state
 * @param initialSavedState: a ref to the saved state
 * @param uploading: {open: bool, finished: bool} lets know upload progress
 * @param setUploading: function to modify uploading
 * @param setEdits: function that lets us know if changes have been made
 * @param PAGE_SPECIFIC_FORMATS: formats specifc to the page e.g DB_BUYERS_FORMATS
 * @param picturesFiles: a ref to the picture files blog
 * @param PAGE: the name of page making request
 * @param PAGE_ATTRIBUTES: e.g DB_KEYS_LEASE_PAGE
 * @param errorPrefix: e.g "[Upload HomePage]"
 * @return {Function}
 */
const confirmPageEdits = async (state, initialSavedState, uploading, setUploading, setEdits, PAGE_SPECIFIC_FORMATS, picturesFiles, PAGE, PAGE_ATTRIBUTES, errorPrefix) =>{
    //open upload dialog
    setUploading({finished:false, open: true});

    // copy state so we don't fuck things up
    let _state = {...state};

    // convert multiparttext from array to dict for upload to firebase
    Object.keys(PAGE_SPECIFIC_FORMATS).forEach((key) => {
        if (PAGE_SPECIFIC_FORMATS[key] === DB_FORMATS.multiPartText) {
            _state[key] = multiPartTextArrayToDict(_state[key]);
        }
    });


    // upload files to db and get urls back so we can save in firebase real time
    const pictureFileKeys = Object.keys(picturesFiles.current);

    for (const key of pictureFileKeys) {
        const files = picturesFiles.current[key];
        //DB_NODES_PAGES.buyersPage

        // skip entries that are missing file objects
        if (!isObjectEmpty(files)) {
            // if we actually have an array of files do something special
            if (Array.isArray(files)) {
                const urls = await uploadImgToDbEasy(PAGE, ...picturesFiles.current[key]);
                _state[key] = arrayToDict(urls)
            } else {
                const urls = await uploadImgToDbEasy(PAGE, picturesFiles.current[key]);
                _state[key] = urls[0];
            }
        }
    }

    //upload state to db now
    // PAGE_ATTRIBUTES -> DB_KEYS_HOME_PAGE, errorPrefix->"[UploadHomeToDb]"
    await uploadPageToDb(_state, PAGE_ATTRIBUTES, errorPrefix, PAGE);


    // set the saved state to new homePageState & notify that edits are over
    initialSavedState.current = {...state};
    setEdits(false);
    setUploading({open:true,finished:true})
};

export default confirmPageEdits;