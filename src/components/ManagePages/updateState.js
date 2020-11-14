import {DB_FORMATS} from "../../constants/contants";
import multiPartTextDictToArray from "../Utility/multiPartTextDictToArray";

//
/**
 * Sets state for a managed page. all functions call this dispatch function
 * @param setState: Function to change state
 * @param state: state we are updating
 * @param fileHolderRef: holds files
 * @param PAGE_SPECIFIC_FORMATS: formats for specific page
 * @return {function(*): Function}
 */
const updateState = (setState, state, fileHolderRef, PAGE_SPECIFIC_FORMATS) => (key) => (value) => {


    let newState;
    if (PAGE_SPECIFIC_FORMATS[key] === DB_FORMATS.multiPartText) {
        // multipart text
        newState = {...state, [key]: multiPartTextDictToArray(value)};
    } else if (PAGE_SPECIFIC_FORMATS[key] === DB_FORMATS.file) {
        newState = {...state, [key]: URL.createObjectURL(value[0])};
        // files -- save them in case need to upload
        fileHolderRef.current[key] = value[0];
    } else if (PAGE_SPECIFIC_FORMATS[key] === DB_FORMATS.fileArray) {
        newState = {...state, [key]: value.map((blob) => URL.createObjectURL(blob))}
    } else {
        // in this case one line text
        newState = {...state, [key]: value}

    }
    // let state know about changes
    setState(newState);
};
export default updateState
